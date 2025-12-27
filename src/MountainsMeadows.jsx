import React from 'react'
import PageTemplate from './PageTemplate'
import img from './assets/NatureQ/NatureQ17.avif'
import { posts as roadPosts } from './data/roadTripsData'

export default function MountainsMeadows(){
  const recent = roadPosts.map(p => ({ title: p.title, to: p.path, img: p.img, slug: p.path.split('/').pop() }))

  return (
    <PageTemplate title="Mountains & Meadows" subtitle="High Altitude Road Trips" recent={recent}>
      <div style={{ padding: 24 }}>
        <h1>Mountains & Meadows: High Altitude Road Trips</h1>
        <img src={img} alt="Mountains" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
        <p style={{ marginTop: 16 }}>High altitude road trips and scenic campsites... (placeholder)</p>
      </div>
    </PageTemplate>
  )
}
