import React from 'react'
import PageTemplate from './PageTemplate'
import img from './assets/NatureQ/NatureQ19.avif'
import { posts as roadPosts } from './data/roadTripsData'

export default function ForestGetaways(){
  const recent = roadPosts.map(p => ({ title: p.title, to: p.path, img: p.img, slug: p.path.split('/').pop() }))

  return (
    <PageTemplate title="Forest Getaways" subtitle="Campsites Among the Pines" recent={recent}>
      <div style={{ padding: 24 }}>
        <h1>Forest Getaways: Campsites Among the Pines</h1>
        <img src={img} alt="Forest" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
        <p style={{ marginTop: 16 }}>Forested campsites and nature walks... (placeholder)</p>
      </div>
    </PageTemplate>
  )
}
