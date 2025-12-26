import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom' 

const LOCATIONS = [
  'Eti-Osa, Lagos',
  'Lekki, Lagos',
  'Epe, Lagos',
  'Abuja',
  'Calabar',
  'Enugu',
  'Port Harcourt',
  'Kano',
  'Jos',
  'Kaduna',
  'Benin City',
  'Ibadan',
  'Abeokuta',
  'Uyo',
  'Warri',
  'Sokoto',
  'Maiduguri',
  'Ilorin'
]

const RV_TYPES = [
  'Euro Camper',
  'Venagon',
  'Ranger Van',
  'Travel Trailer',
  'Flying Cloud',
  'MotorHome'
]


export default function Check() {
  const [form, setForm] = useState({
    pickup: LOCATIONS[0],
    dropoff: LOCATIONS[0],
    startDate: '',
    endDate: '',
    number: 1,
    rvsType: RV_TYPES[0],
    name: '',
    phone: '',
    email: ''
  })

  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState(null) // null | 'available' | 'unavailable'
  const [message, setMessage] = useState('')
  const [serverStatus, setServerStatus] = useState('unknown') // 'unknown' | 'up' | 'down'
  const navigate = useNavigate()
  const API_BASE = import.meta.env.VITE_API_BASE || ''

  async function safeJson(res) {
    // parse JSON safely, return null on empty/invalid responses
    const text = await res.text()
    if (!text) return null
    try {
      return JSON.parse(text)
    } catch {
      console.warn('Invalid JSON from server:', text)
      return null
    }
  }

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/bookings`)
      if (res.ok) {
        const data = await safeJson(res)
        setBookings(Array.isArray(data) ? data : [])
      } else {
        console.error('Failed to fetch bookings: server returned', res.status)
        const data = await safeJson(res)
        setMessage(data && data.error ? data.error : 'Failed to fetch bookings')
      }
    } catch (error) {
      console.error('Failed to fetch bookings', error)
      setServerStatus('down')
      setMessage(`Unable to reach booking server: ${error.message}`)
    }
  }, [API_BASE])

  const checkServer = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ping`)
      if (!res.ok) {
        setServerStatus('down')
        setMessage('Booking server returned an error')
        return false
      }
      const json = await safeJson(res)
      if (!json) {
        setServerStatus('down')
        setMessage('Booking server returned invalid response')
        return false
      }
      setServerStatus('up')
      setMessage('')
      return true
    } catch (error) {
      console.error('Ping failed', error)
      setServerStatus('down')
      setMessage(`Unable to reach booking server: ${error.message}`)
      return false
    }
  }, [API_BASE])

  useEffect(() => {
    (async () => {
      await checkServer()
      await fetchBookings()
    })()
  }, [checkServer, fetchBookings])

  useEffect(() => {
    // Check availability with server when required fields change
    const { startDate, endDate, rvsType } = form
    if (!startDate || !endDate || !rvsType) {
      setStatus(null)
      setMessage('')
      return
    }
    const s = new Date(startDate)
    const e = new Date(endDate)
    if (s > e) {
      setStatus('unavailable')
      setMessage('Start date must be before end date')
      return
    }

    let cancelled = false
    ;(async () => {
      try {
          const res = await fetch(`${API_BASE}/api/availability?rvsType=${encodeURIComponent(rvsType)}&startDate=${startDate}&endDate=${endDate}`)
        if (!res.ok) {
          setStatus(null)
          const data = await safeJson(res)
          setMessage(data && data.error ? data.error : 'Unable to check availability (server error)')
          return
        }
        const json = await safeJson(res)
        if (cancelled) return
        if (json && json.available) {
          setStatus('available')
          setMessage('Available for your selected dates')
        } else {
          setStatus('unavailable')
          setMessage(json && json.conflict ? `Selected RV is already booked for ${json.conflict.startDate} — ${json.conflict.endDate}` : 'Unavailable for your dates')
        }
      } catch (err) {
        console.error('Availability check failed', err)
        setServerStatus('down')
        setStatus(null)
        setMessage(`Unable to reach booking server: ${err.message}`)
      }
    })()

    return () => { cancelled = true }
  }, [form, API_BASE])

  useEffect(() => {
    // Close on Escape key
    const onKey = (ev) => {
      if (ev.key === 'Escape') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function validEmail(e) {
    return /\S+@\S+\.\S+/.test(e)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    // basic validation
    const { name, phone, email, startDate, endDate, rvsType } = form
    if (!name || !phone || !email || !startDate || !endDate || !rvsType) {
      setStatus('unavailable')
      setMessage('Please fill all required fields')
      return
    }
    if (!validEmail(email)) {
      setStatus('unavailable')
      setMessage('Please enter a valid email address')
      return
    }
    const s = new Date(startDate)
    const end = new Date(endDate)
    if (s > end) {
      setStatus('unavailable')
      setMessage('Start date must be before end date')
      return
    }

    // Send booking to server
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.status === 201) {
        const created = await safeJson(res)
        setStatus('available')
        if (created) {
          setMessage(`Success! Your booking is confirmed for ${created.startDate} — ${created.endDate}. Reference: #${created.id}`)
        } else {
          setMessage('Success! Your booking is confirmed. (server returned no details)')
        }
        // clear personal details but keep selection
        setForm(prev => ({ ...prev, name: '', phone: '', email: '' }))
        fetchBookings()
        return
      }

      const json = await safeJson(res)
      if (res.status === 409) {
        setStatus('unavailable')
        setMessage(json && json.conflict ? `Sorry — the ${form.rvsType} is booked ${json.conflict.startDate} to ${json.conflict.endDate}` : 'Conflict')
      } else {
        setStatus('unavailable')
        setMessage(json && json.error ? json.error : `Booking failed (status ${res.status})`)
      }
    } catch (err) {
      console.error('Booking failed', err)
      setServerStatus('down')
      setStatus('unavailable')
      setMessage(`Unable to reach booking server: ${err.message}`)
    }
  }

  const isFormFilled = form.startDate && form.endDate && form.rvsType && form.name && form.phone && form.email

  return (
    <div className="check-wrapper" style={{ maxWidth: 980, margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ margin: 0 }}>Check Availability</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: serverStatus === 'up' ? '#00cc66' : serverStatus === 'down' ? 'red' : '#666' }}>
            Server: {serverStatus === 'up' ? 'Up' : serverStatus === 'down' ? 'Down' : 'Checking...'}
          </div>
          <button type="button" className="btn-close" onClick={async () => { await checkServer(); }} aria-label="Retry server check">↻</button>
          <button type="button" className="btn-close" onClick={() => navigate(-1)} aria-label="Close check availability">×</button>
        </div>
      </div>
      <p style={{ marginTop: 8, marginBottom: 18, color: '#666' }}>Select pickup/dropoff, dates and RV type to see availability. Bookings are stored on the server to provide global availability.</p>

      <form className="check-form fade-in" onSubmit={handleSubmit}>
        <div className="row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label className="field" style={{ flex: '1 1 220px' }}>
            <div className="label">Pick-up location</div>
            <select value={form.pickup} onChange={e => update('pickup', e.target.value)} aria-label="Pick-up location">
              {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </label>

          <label className="field" style={{ flex: '1 1 220px' }}>
            <div className="label">Drop-off location</div>
            <select value={form.dropoff} onChange={e => update('dropoff', e.target.value)} aria-label="Drop-off location">
              {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </label>

          <label className="field" style={{ flex: '1 1 160px' }}>
            <div className="label">Start date</div>
            <input type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)} />
          </label>

          <label className="field" style={{ flex: '1 1 160px' }}>
            <div className="label">End date</div>
            <input type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)} />
          </label>

          <label className="field" style={{ flex: '1 1 120px' }}>
            <div className="label">Number</div>
            <input type="number" min={1} value={form.number} onChange={e => update('number', Number(e.target.value))} />
          </label>

          <label className="field" style={{ flex: '1 1 220px' }}>
            <div className="label">RV type</div>
            <select value={form.rvsType} onChange={e => update('rvsType', e.target.value)}>
              {RV_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
        </div>

        <hr style={{ margin: '18px 0' }} />

        <div className="row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label className="field" style={{ flex: '1 1 300px' }}>
            <div className="label">Full name</div>
            <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
          </label>

          <label className="field" style={{ flex: '1 1 200px' }}>
            <div className="label">Phone</div>
            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="e.g. +2348010000000" />
          </label>

          <label className="field" style={{ flex: '1 1 260px' }}>
            <div className="label">Email</div>
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
          <button
            type="submit"
            className="btn-primary"
            disabled={!isFormFilled || status === 'unavailable'}
            aria-disabled={!isFormFilled || status === 'unavailable'}
          >
            Check & Book
          </button>

          {status && (
            <div className={`status ${status} fade-in`} role="status" aria-live="polite" style={{ padding: '8px 12px', borderRadius: 6 }}>
              {message}
            </div>
          )}
        </div>

        {/* show recent bookings for reference */}
        <div style={{ marginTop: 18 }}>
          <h4 style={{ marginBottom: 8 }}>Recent bookings (local demo)</h4>
          <ul style={{ marginTop: 0, paddingLeft: 18 }}>
            {bookings.slice(0, 6).map(b => (
              <li key={b.id} style={{ marginBottom: 6 }}><strong>{b.rvsType}</strong> — {b.startDate} to {b.endDate} ({b.name || 'private'})</li>
            ))}
            {!bookings.length && <li style={{ color: '#666' }}>No bookings yet (this browser)</li>}
          </ul>
          <p style={{ marginTop: 12, color: '#666', fontSize: 13 }}>
            Note: This demo stores bookings locally in your browser to simulate availability and conflicts. For multi-user, server-side storage and locking is required.
          </p>
        </div>
      </form>
    </div>
  )
}
