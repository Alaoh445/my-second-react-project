/* eslint-disable no-undef */
import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import cors from 'cors'

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

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Booking API listening at http://localhost:${port}`))
