import React from 'react'
import PageTemplate from './PageTemplate'
import img from './assets/NatureQ/NatureQ15.avif'
import { posts as roadPosts } from './data/roadTripsData'

export default function LockdownEscape(){
  const recent = roadPosts.map(p => ({ title: p.title, to: p.path, img: p.img, slug: p.path.split('/').pop() }))

  return (
    <PageTemplate title="Lockdown Escape" subtitle="Work & Travel From Your RV" recent={recent}>
      <div style={{ padding: 24 }}>
        <h1>Lockdown Escape: Work & Travel From Your RV</h1>
        <img src={img} alt="Lockdown Escape" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
        <p style={{ marginTop: 16 }}>Lockdown escape is an adventure... (placeholder)</p>
      </div>
    </PageTemplate>
  )
}
