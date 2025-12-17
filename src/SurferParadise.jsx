import React from 'react'
import img from './assets/NatureQ/NatureQ14.avif'

export default function SurferParadise(){
  return (
    <div style={{ padding: 24 }}>
      <h1>Surfer’s Paradise: Where to Stop for Best Waves</h1>
      <img src={img} alt="Surfer" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
      <p style={{ marginTop: 16 }}>Surfer paradise is an adventurous spot... (placeholder)</p>
    </div>
  )
}
