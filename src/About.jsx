import { useState, useEffect } from 'react'
import imgHero from './assets/NatureQ/NatureQ21.avif'
import imgStory from './assets/NatureQ/NatureQ2.avif'
import imgStory1 from './assets/NatureQ/NatureQ17.avif'
import imgMission from './assets/NatureQ/NatureQ3.avif'
import imgOffer from './assets/NatureQ/NatureQ4.avif'

export default function About() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const heroStyle = {
    width: '100%',
    height: '50vh',
    backgroundImage: `url(${imgHero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    position: 'relative'
  }

  const overlay = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55))'
  }

  const container = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '32px'
  }

  const section = {
    marginBottom: 28,
    background: '#fff',
    padding: 20,
    borderRadius: 6,
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
  }

  return (
    <main style={{ width: '100%' }}>
      <header style={heroStyle}>
        <div style={overlay} />
        <div className="about-hero fade-in" style={{ position: 'relative', textAlign: 'center', padding: '0 20px' }}>
          <h1 style={{ fontSize: 40, margin: 0, letterSpacing: 1 }}>NatureQuest by Alaoh</h1>
          <p style={{ marginTop: 14, fontSize: 20, maxWidth: 920, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
            Adventure travel, curated escapes, and mindful outdoor experiences — rooted in conservation and designed for modern explorers.
          </p>
          <div style={{ marginTop: 20 }}>
            <a className="btn-cta" href="/Contact">Plan a trip</a>
          </div>
        </div>
      </header>
      <section style={{ ...container, marginTop: 28 }}>
        {/* Story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          <div className="about-section slide-up" style={{ ...section, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 18, alignItems: 'center' }}>
            <img className="about-img" src={imgStory} alt="Our story" style={{ width: isMobile ? '100%' : 420, height: isMobile ? 220 : 260, objectFit: 'cover', borderRadius: 0 }} />
            <div>
              <h2 style={{ fontSize: 28 }}>Our Story</h2>
              <p style={{ fontSize: 19 }}>
                NatureQuest by Alaoh began as a simple passion for connecting people with wild places.
                We design small-group and private adventures that celebrate local cultures, minimize impact, and leave a positive legacy for the communities we visit.
              </p>
              <p style={{ fontSize: 18 }}>
                From coastal camps to mountain meadows, our itineraries are hand-crafted by guides who know the terrain intimately and care about responsible travel.
              </p>
            </div>
          </div>
        </div>

        {/* Vision (before Mission and What We Offer) */}
        <div className="about-section slide-up" style={{ ...section, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 18, alignItems: 'center', marginTop: 18 }}>
          <img className="about-img" src={imgStory1} alt="Our vision" style={{ width: isMobile ? '100%' : 420, height: isMobile ? 220 : 260, objectFit: 'cover', borderRadius: 0 }} />
          <div>
            <h2 style={{ fontSize: 28 }}>Our Vision</h2>
            <p style={{ fontSize: 19 }}>
              To build a future where travel inspires stewardship — where every journey contributes to conservation, supports local livelihoods, and deepens people's connection to wild places.
            </p>
            <p style={{ fontSize: 19 }}>
              We envision adventures that are restorative for travelers and regenerative for the landscapes and communities we visit.
            </p>
          </div>
        </div>

        {/* Mission and What We Offer in two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, marginTop: 24 }}>
          <div className="about-section slide-up" style={{ ...section, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 18, alignItems: 'center' }}>
            <img className="about-img" src={imgMission} alt="Our mission" style={{ width: isMobile ? '100%' : 380, height: isMobile ? 220 : 240, objectFit: 'cover', borderRadius: 0 }} />
            <div>
              <h2 style={{ fontSize: 28 }}>Our Mission</h2>
              <p style={{ fontSize: 19 }}>
                We bring together conservation, education and thoughtful adventure to create journeys that inspire stewardship. Our goals are simple: protect nature, support local partners, and create meaningful experiences.
              </p>
              <ul style={{ fontSize: 18 }}>
                <li>Small groups and expert guides</li>
                <li>Locally-sourced experiences and accommodations</li>
                <li>Carbon mindful travel options</li>
              </ul>
            </div>
          </div>

          <div className="about-section slide-up" style={{ ...section, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 18, alignItems: 'center' }}>
            <img className="about-img" src={imgOffer} alt="What we offer" style={{ width: isMobile ? '100%' : 380, height: isMobile ? 220 : 240, objectFit: 'cover', borderRadius: 0 }} />
            <div>
              <h2 style={{ fontSize: 28 }}>What We Offer</h2>
              <p style={{ fontSize: 19 }}>
                Multi-day road trips, coastal camps, RV and trailer experiences, and guided hikes across diverse landscapes. Each trip includes detailed planning, safety-first operations, and optional add-ons like photography coaching and cookery sessions.
              </p>
              <p style={{ fontSize: 19 }}>
                Learn more on our Trips page or contact us for a custom itinerary.
              </p>
            </div>
          </div>
        </div>

        {/* Team & Values (before the map) */}
        <div style={{ marginTop: 28, ...section }}>
          <h2 style={{fontSize: 28}}>Team & Values</h2>
          <p style={{fontSize: 19}}>
            Our team of guides, conservationists, and local partners work together to ensure each trip is safe, sustainable, and unforgettable. We prioritize community partnerships and transparent operations in everything we do.
          </p>
        </div>
      </section>

      {/* Full-width map — last section, spans full width with heading */}
      <div style={{ width: '100%', marginTop: 28, marginBottom: 48, backgroundColor: '#f3fbf6', padding: isMobile ? '20px 0' : '36px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <h3 style={{ textAlign: 'center', marginTop: 20, paddingBottom: 12, fontSize: isMobile ? 25 : 40, paddingTop: 20 }}>Our company headquarter</h3>
          <div style={{ width: '100%', height: isMobile ? 460 : 620, borderRadius: 8, overflow: 'hidden' }}>
            <iframe
              title="NatureQuest location"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={`https://www.google.com/maps?q=${encodeURIComponent('Groveville synergy estate, Eti-Osa, Lagos 101222, Lagos')}&output=embed`}
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  )
}
