import React from 'react'
import img from './assets/NatureQ/NatureQ19.avif'

export default function ForestGetaways(){
  return (
    <div style={{ padding: 24 }}>
      <h1>Forest Getaways: Campsites Among the Pines</h1>
      <img src={img} alt="Forest" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
      <p style={{ marginTop: 16 }}>Forested campsites and nature walks... (placeholder)</p>
    </div>
  )
}
