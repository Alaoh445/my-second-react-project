import React from 'react'
import img from './assets/NatureQ/NatureQ18.avif'

export default function DesertTrails(){
  return (
    <div style={{ padding: 24 }}>
      <h1>Desert Trails: Minimalist RV Adventures</h1>
      <img src={img} alt="Desert" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
      <p style={{ marginTop: 16 }}>Minimalist adventures in the desert... (placeholder)</p>
    </div>
  )
}
