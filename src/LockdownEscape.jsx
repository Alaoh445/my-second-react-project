import React from 'react'
import img from './assets/NatureQ/NatureQ15.avif'

export default function LockdownEscape(){
  return (
    <div style={{ padding: 24 }}>
      <h1>Lockdown Escape: Work & Travel From Your RV</h1>
      <img src={img} alt="Lockdown Escape" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
      <p style={{ marginTop: 16 }}>Lockdown escape is an adventure... (placeholder)</p>
    </div>
  )
}
