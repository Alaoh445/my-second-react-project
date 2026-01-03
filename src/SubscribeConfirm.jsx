import React, { useEffect, useState } from 'react'
import { useSearchParams, NavLink } from 'react-router-dom'

export default function SubscribeConfirm(){
  const [params] = useSearchParams()
  const token = params.get('token')
  const [status, setStatus] = useState('checking')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!token) { setStatus('error'); setMsg('Missing token'); return }
    (async () => {
      try {
        const res = await fetch(`/api/subscribe/confirm?token=${encodeURIComponent(token)}`)
        const j = await res.json()
        if (!res.ok) { setStatus('error'); setMsg(j.error || 'Unable to confirm') } else { setStatus('ok'); setMsg(`Thanks — ${j.email} is now subscribed.`) }
      } catch (err) { setStatus('error'); setMsg('Network error') }
    })()
  }, [token])

  return (
    <div style={{ padding: 40, maxWidth: 760, margin: '40px auto' }}>
      {status === 'checking' && <p>Confirming subscription…</p>}
      {status === 'ok' && (
        <>
          <h2>Subscription confirmed</h2>
          <p>{msg}</p>
          <p><NavLink to="/">Return home</NavLink></p>
        </>
      )}
      {status === 'error' && (
        <>
          <h2>Unable to confirm</h2>
          <p>{msg}</p>
          <p><NavLink to="/">Return home</NavLink></p>
        </>
      )}
    </div>
  )
}