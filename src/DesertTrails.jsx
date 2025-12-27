import React from 'react'
import PageTemplate from './PageTemplate'
import img from './assets/NatureQ/NatureQ18.avif'
import { posts as roadPosts } from './data/roadTripsData'

export default function DesertTrails(){
  const recent = roadPosts.map(p => ({ title: p.title, to: p.path, img: p.img, slug: p.path.split('/').pop() }))

  return (
    <PageTemplate title="Desert Trails" subtitle="Minimalist RV Adventures" recent={recent}>
      <div style={{ padding: 24 }}>
        <h1>Desert Trails: Minimalist RV Adventures</h1>
        <img src={img} alt="Desert" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
        <p style={{ marginTop: 16 }}>Minimalist adventures in the desert... (placeholder)</p>
      </div>
    </PageTemplate>
  )
}
