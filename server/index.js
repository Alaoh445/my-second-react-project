/* eslint-disable no-undef */
import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
app.use(cors())
app.use(express.json())

const DATA_FILE = path.join(process.cwd(), 'server', 'bookings.json')

const datesOverlap = (aStart, aEnd, bStart, bEnd) => new Date(aStart) <= new Date(bEnd) && new Date(aEnd) >= new Date(bStart)

async function readBookings() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeBookings(bookings) {
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8')
}

// Simple promise queue to serialize write operations and avoid race conditions
let queue = Promise.resolve()
function enqueue(op) {
  queue = queue.then(() => op()).catch(err => { console.error('queue error', err) })
  return queue
}

app.get('/api/bookings', async (req, res) => {
  const bookings = await readBookings()
  res.json(bookings)
})

// Simple health/ping endpoint for the client to check server availability
app.get('/api/ping', async (req, res) => {
  res.json({ ok: true, now: new Date().toISOString() })
})

app.get('/api/availability', async (req, res) => {
  const { rvsType, startDate, endDate } = req.query
  if (!rvsType || !startDate || !endDate) return res.status(400).json({ error: 'missing_params' })

  const bookings = await readBookings()
  const conflict = bookings.find(b => b.rvsType === rvsType && datesOverlap(startDate, endDate, b.startDate, b.endDate))
  if (conflict) return res.json({ available: false, conflict })

  res.json({ available: true })
})

app.post('/api/bookings', async (req, res) => {
  try {
    console.info('POST /api/bookings payload received')
    await enqueue(async () => {
      const payload = req.body || {}
      const required = ['pickup', 'dropoff', 'startDate', 'endDate', 'rvsType', 'name', 'phone', 'email']
      for (const r of required) {
        if (!payload[r]) {
          console.info('Missing field', r)
          return res.status(400).json({ error: 'missing_field', field: r })
        }
      }
      if (!/\S+@\S+\.\S+/.test(payload.email)) {
        console.info('Invalid email')
        return res.status(400).json({ error: 'invalid_email' })
      }

      const bookings = await readBookings()
      const conflict = bookings.find(b => b.rvsType === payload.rvsType && datesOverlap(payload.startDate, payload.endDate, b.startDate, b.endDate))
      if (conflict) {
        console.info('Conflict detected for', payload.rvsType, payload.startDate, payload.endDate)
        return res.status(409).json({ error: 'conflict', conflict })
      }

      const booking = { id: Date.now().toString(), ...payload, createdAt: new Date().toISOString() }
      bookings.unshift(booking)
      await writeBookings(bookings)
      console.info('Booking created', booking.id)
      return res.status(201).json(booking)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

// --- Newsletter subscription endpoints --------------------------------------------------
const NEWS_FILE = path.join(process.cwd(), 'server', 'newsletters.json')

async function readNewsletters() {
  try {
    const raw = await fs.readFile(NEWS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeNewsletters(list) {
  await fs.writeFile(NEWS_FILE, JSON.stringify(list, null, 2), 'utf-8')
}

app.post('/api/subscribe', async (req, res) => {
  try {
    await enqueue(async () => {
      const { email } = req.body || {}
      if (!email || !/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: 'invalid_email' })

      const list = await readNewsletters()
      let existing = list.find(s => s.email.toLowerCase() === email.toLowerCase())
      const token = (Math.random().toString(36).slice(2, 10) + Date.now().toString(36))
      const confirmationUrl = `${req.protocol}://${req.get('host')}/subscribe/confirmed?token=${token}`

      if (!existing) {
        existing = { id: Date.now().toString(), email, token, confirmed: false, createdAt: new Date().toISOString() }
        list.unshift(existing)
      } else {
        existing.token = token
        existing.confirmed = false
        existing.updatedAt = new Date().toISOString()
      }

      await writeNewsletters(list)

      // If SMTP env vars are present, try to send email; otherwise attempt to use Ethereal for dev preview
      const smtpHost = process.env.SMTP_HOST
      const smtpPort = process.env.SMTP_PORT
      const smtpUser = process.env.SMTP_USER
      const smtpPass = process.env.SMTP_PASS

      if (smtpHost && smtpPort && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({ host: smtpHost, port: Number(smtpPort), secure: Number(smtpPort) === 465, auth: { user: smtpUser, pass: smtpPass } })
          await transporter.sendMail({ from: smtpUser, to: email, subject: 'Confirm your subscription', text: `Confirm at: ${confirmationUrl}`, html: `<p>Confirm your subscription by clicking <a href="${confirmationUrl}">this link</a>.</p>` })
          return res.json({ ok: true, message: 'confirmation_sent' })
        } catch (err) {
          console.error('Email send failed', err)
          return res.status(500).json({ error: 'email_failed', confirmationUrl })
        }
      }

      // No SMTP configured — attempt to use nodemailer's Ethereal test account so we can send a preview email
      try {
        const testAccount = await nodemailer.createTestAccount()
        const transporter = nodemailer.createTransport({ host: testAccount.smtp.host, port: testAccount.smtp.port, secure: testAccount.smtp.secure, auth: { user: testAccount.user, pass: testAccount.pass } })
        const info = await transporter.sendMail({ from: 'no-reply@example.com', to: email, subject: 'Confirm your subscription', text: `Confirm at: ${confirmationUrl}`, html: `<p>Confirm your subscription by clicking <a href="${confirmationUrl}">this link</a>.</p>` })
        const previewUrl = nodemailer.getTestMessageUrl(info)
        console.info('Ethereal preview URL:', previewUrl)
        return res.json({ ok: true, message: 'preview_sent', confirmationUrl, previewUrl })
      } catch (err) {
        console.error('Ethereal send failed', err)
        // fallback to returning confirmation URL only
        return res.json({ ok: true, message: 'no_smtp', confirmationUrl })
      }
    })
  } catch (err) {
    console.error('subscribe error', err)
    return res.status(500).json({ error: 'server_error' })
  }
})

app.get('/api/subscribe/confirm', async (req, res) => {
  try {
    const { token } = req.query
    if (!token) return res.status(400).json({ error: 'missing_token' })

    await enqueue(async () => {
      const list = await readNewsletters()
      const item = list.find(x => x.token === token)
      if (!item) return res.status(404).json({ error: 'not_found' })
      item.confirmed = true
      item.confirmedAt = new Date().toISOString()
      await writeNewsletters(list)
      // If the browser requested it (text/html) return a simple HTML page
      if (req.headers.accept && req.headers.accept.includes('text/html')) {
        return res.send(`<html><body><h1>Subscription confirmed</h1><p>Thanks — ${item.email} is now subscribed.</p></body></html>`)
      }
      return res.json({ ok: true, email: item.email })
    })
  } catch (err) {
    console.error('confirm error', err)
    return res.status(500).json({ error: 'server_error' })
  }
})

// --------------------------------------------------------------------------------------

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Booking API listening at http://localhost:${port}`))
