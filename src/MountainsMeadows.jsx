import React from 'react'
import img from './assets/NatureQ/NatureQ17.avif'

export default function MountainsMeadows(){
  return (
    <div style={{ padding: 24 }}>
      <h1>Mountains & Meadows: High Altitude Road Trips</h1>
      <img src={img} alt="Mountains" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
      <p style={{ marginTop: 16 }}>High altitude road trips and scenic campsites... (placeholder)</p>
    </div>
  )
}
