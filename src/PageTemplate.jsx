import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageTemplate({ title, subtitle, hero, children, recent = [], heroNote, heroClass }) {
  const heroClasses = hero ? `pt-hero ${heroClass || ''}` : `pt-hero pt-hero--plain ${heroClass || ''}`
  return (
    <div className="page-template">
      {/* Hero: use image if provided, otherwise render a clean header */}
      <section className={heroClasses} style={hero ? { backgroundImage: `url(${hero})` } : undefined}>
        <div className="pt-hero-inner">
          <h1 className="pt-title">{title}</h1>
          {subtitle && <p className="pt-subtitle">{subtitle}</p>}
          {heroNote && <p className="pt-note">{heroNote}</p>}
        </div>
      </section> 

      <div className="pt-content">
        <main className="pt-main">{children}</main>
        <aside className="pt-aside">
          <div className="pt-cta">
            <h4>Ready to book?</h4>
            <NavLink to="/Check" className="btn-primary">Check Availability</NavLink>
          </div>

          <div className="pt-recent">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5 style={{margin:0}}>Recent Posts</h5>
              <NavLink to="/RoadTrips" className="all-posts-link small">All posts</NavLink>
            </div>
            <div className="pt-recent-grid">
              {recent.map(r => (
                <NavLink to={r.to} key={r.title} className="pt-recent-item">
                  <img src={r.img} alt={r.title} />
                  <div className="pt-recent-title">{r.title}</div>
                </NavLink>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
