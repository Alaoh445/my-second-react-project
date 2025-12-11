import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import './Header.css'

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    borderBottom: '1px solid #e6e6e608',
    background: 'black',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    justifyContent: 'flex-start',
  },
  brand: {
    paddingTop: 10,
    fontSize: 25,
    fontWeight: 'normal',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
    textDecoration: 'none',
    marginLeft: 40,
  },
  nav: {
    display: 'flex',
    gap: 25,
    alignItems: 'center',
    paddingRight: 50,
  },
  mobileNav: {
    position: 'fixed',
    top: 0,
    left: 0,
    paddingTop: 100,
    width: '100vw',
    height: '100vh',
    background: '#002e20',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // keep items centered by default
    paddingLeft: 0,
    gap: 25,
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(0)',
    zIndex: 999,
    overflowY: 'auto',               // enable vertical scrolling for large submenu
    WebkitOverflowScrolling: 'touch',
    boxSizing: 'border-box',
  },
  mobileNavHidden: {
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
  },
  link: {
    fontSize: 18,
    padding: '8px 20px', // give the same horizontal padding as the RVs row
    textDecoration: 'none',
    color: 'white',
    borderRadius: 6,
    transition: 'color 0.2s ease',
    display: 'inline-block',
    textAlign: 'center',
  },
  active: {
    color: '#00cc66',
  },
  toggleButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: 30,
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingRight: 25,
    zIndex: 1001,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    paddingTop: 25,
    right: 25,
    fontSize: 30,
    fontWeight: 'normal',
    fontStyle: 'normal',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
  },
  circle: {
    borderRadius: '20%',
    padding: '10px 15px',
    border: '1px solid white',
    width: 'fit-content',
  },

  // new submenu styles
  submenuWrap: {
    position: 'relative',
  },
  submenu: {
    position: 'absolute',
    top: '120%',
    left: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    padding: '10px',
    borderRadius: 6,
    boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    minWidth: 120,
    zIndex: 1000,
  },
  // remove color from submenuItem so CSS controls it
  submenuItem: {
    textDecoration: 'none',
    padding: '6px 10px',
    borderRadius: 4,
  },
  submenuItemActive: {
    color: '#00cc66' // kept for inline fallback, but background removed
  },
  // MOBILE RVS ROW: center the label and icon together to match other mobile links
  mobileRVsRow: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 20px',
    display: 'flex',
    justifyContent: 'center', // center label + icon like other links
    alignItems: 'center',
    gap: 20,
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',
  },
  mobileSubmenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,                   // keep your chosen gap
    paddingLeft: 60,
    paddingRight: 20,
    marginBottom: 10,
    width: '100%',
    boxSizing: 'border-box',
  }
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showSubmenu, setShowSubmenu] = useState(false) // desktop hover
  const [mobileRVsOpen, setMobileRVsOpen] = useState(false) // mobile submenu

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const linkStyle = ({ isActive }) =>
    isActive ? { ...styles.link, ...styles.active } : styles.link

  const headerStyle = {
    ...styles.header,
    position: isMobile ? 'fixed' : 'relative',
    top: isMobile ? 0 : 'auto',
  }

  return (
    <header style={headerStyle}>
      <div style={styles.logoContainer}>
        <NavLink to="/" style={styles.link}><h1 style={{...styles.brand, marginLeft: isMobile ? 5 : 50}}>NatureQuest by Alaoh</h1></NavLink>
      </div>

      {/* TOGGLE BUTTON */}
      {isMobile && !menuOpen && (
        <button
          style={styles.toggleButton}
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      )}

      {/* DESKTOP NAV */}
      {!isMobile && (
      <nav style={styles.nav}>
        {/* RVs with hover submenu: clicking main link navigates to /RVs */}
        <div
          style={styles.submenuWrap}
          onMouseEnter={() => setShowSubmenu(true)}
          onMouseLeave={() => setShowSubmenu(false)}
        >
          <NavLink to="/RVs" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>RVs</NavLink>

          {showSubmenu && (
            <div style={styles.submenu} role="menu" aria-label="RVs submenu">
              <NavLink
                to="/RVs/euro-camper"
                className={({ isActive }) => isActive ? 'rvs-submenu-link active' : 'rvs-submenu-link'}
                style={styles.submenuItem}
              >
                EuroCamper
              </NavLink>

              <NavLink
                to="/RVs/venagon"
                className={({ isActive }) => isActive ? 'rvs-submenu-link active' : 'rvs-submenu-link'}
                style={styles.submenuItem}
              >
                Venagon
              </NavLink>

              <NavLink
                to="/RVs/ranger-van"
                className={({ isActive }) => isActive ? 'rvs-submenu-link active' : 'rvs-submenu-link'}
                style={styles.submenuItem}
              >
                Ranger Van
              </NavLink>

              <NavLink
                to="/RVs/travel-trailer"
                className={({ isActive }) => isActive ? 'rvs-submenu-link active' : 'rvs-submenu-link'}
                style={styles.submenuItem}
              >
                Travel Trailer
              </NavLink>

              <NavLink
                to="/RVs/flying-cloud"
                className={({ isActive }) => isActive ? 'rvs-submenu-link active' : 'rvs-submenu-link'}
                style={styles.submenuItem}
              >
                Flying Cloud
              </NavLink>

              <NavLink
                to="/RVs/motorhome"
                className={({ isActive }) => isActive ? 'rvs-submenu-link active' : 'rvs-submenu-link'}
                style={styles.submenuItem}
              >
                MotorHome
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/RoadTrips" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Road Trips</NavLink>
        <NavLink to="/FAQ" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>FAQ</NavLink>
        <NavLink to="/About" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
        <NavLink to="/Check" style={styles.circle} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Check Availability</NavLink>

      </nav>
      )}
       
        {/* MOBILE OVERLAY MENU */}
      {isMobile && (
        <div
          style={
            menuOpen
              ? styles.mobileNav
              : { ...styles.mobileNav, ...styles.mobileNavHidden }
          }
        >
          <button
            style={styles.closeBtn}
            onClick={() => { setMenuOpen(false); setMobileRVsOpen(false); }}
            aria-label="Close menu"
          >
            ✕
          </button>

         <NavLink to="/Check" end style={({ isActive }) => ({ ...linkStyle({ isActive }), ...styles.circle })}
  onClick={() => setMenuOpen(false)}
>
  Check Availability
</NavLink>

          {/* Mobile RVs toggle row: parent does NOT navigate on mobile */}
          <div
            style={styles.mobileRVsRow}
            onClick={() => setMobileRVsOpen(v => !v)}
            aria-expanded={mobileRVsOpen}
            role="button"
          >
            <NavLink to="/RVs/"  style={linkStyle} onClick={() => { setMenuOpen(false); setMobileRVsOpen(false); }}> <span style={{...styles.link, fontSize: 18, padding: 0, color: 'white'}}>RVs</span></NavLink>
            <span style={{color: 'white', fontSize: 18}}>{mobileRVsOpen ? '\u25BE' : '\u25B8'}</span>
          </div>

          {/* mobile nested items (only nested links navigate) */}
          {mobileRVsOpen && (
            <div style={styles.mobileSubmenu}>
              <NavLink to="/RVs/euro-camper" style={linkStyle} onClick={() => { setMenuOpen(false); setMobileRVsOpen(false); }}>EuroCamper</NavLink>
              <NavLink to="/RVs/venagon" style={linkStyle} onClick={() => { setMenuOpen(false); setMobileRVsOpen(false); }}>Venagon</NavLink>
              <NavLink to="/RVs/ranger-van" style={linkStyle} onClick={() => { setMenuOpen(false); setMobileRVsOpen(false); }}>Ranger Van</NavLink>
              <NavLink to="/RVs/travel-trailer" style={linkStyle} onClick={() => { setMenuOpen(false); setMobileRVsOpen(false); }}>Travel Trailer</NavLink>
              <NavLink to="/RVs/flying-cloud" style={linkStyle} onClick={() => { setMenuOpen(false); setMobileRVsOpen(false); }}>Flying Cloud</NavLink>
              <NavLink to="/RVs/motorhome" style={linkStyle} onClick={() => { setMenuOpen(false); setMobileRVsOpen(false); }}>MotorHome</NavLink>
            </div>
          )}

          <NavLink to="/RoadTrips" style={linkStyle} onClick={() => setMenuOpen(false)}>
            Road Trips
          </NavLink>
          <NavLink to="/FAQ" style={linkStyle} onClick={() => setMenuOpen(false)}>
            FAQ
          </NavLink>
          <NavLink to="/About" style={linkStyle} onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
        </div>
      )}

    </header>
  )
}