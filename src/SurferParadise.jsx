import React from 'react'
import PageTemplate from './PageTemplate'
import img from './assets/NatureQ/NatureQ14.avif'
import { posts as roadPosts } from './data/roadTripsData'

export default function SurferParadise(){
  const recent = roadPosts.map(p => ({ title: p.title, to: p.path, img: p.img, slug: p.path.split('/').pop() }))

  return (
    <PageTemplate title="Surfer’s Paradise" subtitle="Where to Stop for Best Waves" recent={recent}>
      <div style={{ padding: 24 }}>
        <h1>Surfer’s Paradise: Where to Stop for Best Waves</h1>
        <img src={img} alt="Surfer" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
        <p style={{ marginTop: 16 }}>Surfer paradise is an adventurous spot... (placeholder)</p>
      </div>
    </PageTemplate>
  )
}
