import React from 'react'
import img from './assets/NatureQ/NatureQ16.avif'

export default function CoastalCamps(){
  return (
    <div style={{ padding: 24 }}>
      <h1>Coastal Camps: Beachfront RV Spots Worth Visiting</h1>
      <img src={img} alt="Coastal Camps" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
      <p style={{ marginTop: 16 }}>Coastal camps with sunsets and salty air... (placeholder)</p>
    </div>
  )
}
