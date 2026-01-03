import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.css'
import { FaInstagram, FaFacebook } from 'react-icons/fa'

const styles = {
  footer: {
    background: 'white',
    color: 'black',
    padding: '40px 20px 20px',
    marginTop: 'auto', /* ensure footer stays at bottom inside flex column */
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '20px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  brand: {
    fontSize: '25px',
    fontWeight: 'normal',
    margin: '0 0 10px',
    textDecoration: 'none',
    color: 'black',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    color: 'black',
  },
  address: {
    fontStyle: 'normal',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px' // Creates space between address and contact info
  },
  addressText: {
    lineHeight: '1.5'
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  rvsWrapper: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer'
  },
  rvsNested: {
    position: 'absolute',
    left: '50%',
    top: '-50px',
    background: 'white',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'none',  // This will be overridden by CSS hover
    flexDirection: 'column',
    gap: '15px',
    minWidth: '120px',
    zIndex: 1
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  active: {
    color: '#00cc66', // active text color (no background)
  },
  form: {
    display: 'flex',
    flexDirection: 'column', // Stack elements vertically
    gap: '10px',
    borderRadius: '4px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    width: '100%', // Take full width
    boxSizing: 'border-box', // Include padding in width calculation
    fontSize: 16,
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    background: '#00cc66',
    color: 'white',
    cursor: 'pointer',
    width: '100%', // Take full width
  },
  social: {
    display: 'flex',
    gap: '15px',
    fontSize: '24px',
  },
  copyright: {
    textAlign: 'center',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    paddingTop: '20px',
    fontSize: '14px',
  },
  circle: {
    borderRadius: '20%',
    padding: '5px 10px',
    border: '1px solid black',
    width: 'fit-content',
  },
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [devLink, setDevLink] = React.useState('')

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand & Address */}
        <div style={styles.section}>
          <NavLink to="/" style={styles.brand}>NatureQuest by Alaoh</NavLink>
          <address style={styles.address}>
            <div style={styles.addressText}>
              Groveville Synergy Estate<br />
              Ateleworan street, Eti-osa<br />
              Lagos, Nigeria.
            </div>
            <div style={styles.contactInfo}>
              <a className="footer-link" href="tel:+2347057396560">+234 705-739-6560</a>
              <a className="footer-link" href="mailto:alaosodiq54@gmail.com">
                alaosodiq54@gmail.com
              </a>
            </div>
          </address>
        </div>

        {/* Navigation Links with hoverable RVs submenu */}
        <nav style={styles.nav}>
           <NavLink to="/Check" style={styles.circle} className="footer-link">Check Availability</NavLink>
          <div className="rvs-menu" style={styles.rvsWrapper}>
            <NavLink
              to="/RVs"
              className="footer-link"
            >
              RVs
            </NavLink>
            <div className="rvs-submenu" style={styles.rvsNested}>
              <NavLink to="/RVs/euro-camper" className="footer-link">EuroCamper</NavLink>
              <NavLink to="/RVs/venagon" className="footer-link">Venagon</NavLink>
              <NavLink to="/RVs/ranger-van" className="footer-link">Ranger Van</NavLink>
              <NavLink to="/RVs/travel-trailer" className="footer-link">Travel Trailer</NavLink>
              <NavLink to="/RVs/flying-cloud" className="footer-link">Flying Cloud</NavLink>
              <NavLink to="/RVs/motorhome" className="footer-link">MotorHome</NavLink>
            </div>
          </div>

          <NavLink to="/RoadTrips" className="footer-link">Road Trips</NavLink>
          <NavLink to="/FAQ" className="footer-link">FAQ</NavLink>
          <NavLink to="/About" className="footer-link">About</NavLink>

        </nav>

        {/* Newsletter Form */}
        <div style={styles.section}>
          <h3 style={{ margin: 0 }}>Subscribe to Our Newsletter</h3>
          <form style={styles.form} onSubmit={async (e) => {
              e.preventDefault()
              if (!/\S+@\S+\.\S+/.test(email)) { setMessage('Please enter a valid email'); return }
              setLoading(true); setMessage('')
              try {
                const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }) })
                const json = await res.json()
                if (!res.ok) { setMessage(json.error || 'Subscription failed'); setLoading(false); return }
                if (json.previewUrl) {
                  // Open Ethereal preview automatically so the user can see the confirmation message
                  try { window.open(json.previewUrl, '_blank') } catch (e) { console.debug('open preview failed', e) }
                  setMessage('Preview opened — check the preview and click the confirmation link.')
                  setDevLink(json.previewUrl)
                  setEmail('')
                } else if (json.confirmationUrl) {
                  // Open confirmation link automatically so the user gets immediate confirmation
                  try { window.open(json.confirmationUrl, '_blank') } catch (e) { console.debug('open confirmation failed', e) }
                  setMessage('Confirmation opened in a new tab — you are now subscribed.')
                  setDevLink(json.confirmationUrl)
                  setEmail('')
                } else {
                  setMessage('Check your email to confirm subscription.')
                  setDevLink('')
                  setEmail('')
                }
              } catch {
                setMessage('Network error — try again later')
              }
              setLoading(false)
            }}>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              aria-label="Email for newsletter"
              title='Newsletter'
              aria-placeholder='Newsletter'
            />
            <button type="submit" style={{ ...styles.button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
          {message && <div style={{ marginTop: 8, color: '#006b37' }}>{message} {devLink && <a href={devLink} target="_blank" rel="noreferrer">Confirm link</a>}</div>}

          {/* Social Icons */}
          <div style={styles.social}>
            <a
              href="https://instagram.com/naturequestbyalaoh"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
              aria-label="Follow us on Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/naturequestbyalaoh"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
              aria-label="Follow us on Facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright (auto-updating year) */}
      <div style={styles.copyright}>
        © {currentYear} NatureQuest by Alaoh. All rights reserved. Powered and secure by Aloah
      </div>
    </footer>
  )
}

