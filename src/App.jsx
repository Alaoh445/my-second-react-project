import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header.jsx'
import Home from './Home.jsx'
import RVs from './RVs.jsx'
import Footer from './Footer.jsx'
import RoadTrips from './RoadTrips.jsx'
import FAQ from './FAQ.jsx'
import About from './About.jsx'
import Check from './Check.jsx'
import EuroCamper from './EuroCamper.jsx'
import Venagon from './Venagon.jsx'
import RangerVan from './RangerVAn.jsx'
import TravelTrailer from './TravelTrailer.jsx'
import FlyingCloud from './FlyingCloud.jsx'
import MotorHome from './MotorHome.jsx'
import SurferParadise from './SurferParadise.jsx'
import LockdownEscape from './LockdownEscape.jsx'
import CoastalCamps from './CoastalCamps.jsx'
import MountainsMeadows from './MountainsMeadows.jsx'
import DesertTrails from './DesertTrails.jsx'
import ForestGetaways from './ForestGetaways.jsx'
import SubscribeConfirm from './SubscribeConfirm.jsx'
import ScrollToTop from './ScrollToTop.jsx'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: isMobile ? 90 : 0 }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RVs" element={<RVs />} />

          {/* Standalone RV detail pages */}
          <Route path="/RVs/euro-camper" element={<EuroCamper />} />
          <Route path="/RVs/venagon" element={<Venagon />} />
          <Route path="/RVs/ranger-van" element={<RangerVan />} />
          <Route path="/RVs/travel-trailer" element={<TravelTrailer />} />
          <Route path="/RVs/flying-cloud" element={<FlyingCloud />} />
          <Route path="/RVs/motorhome" element={<MotorHome />} />

          <Route path="/RoadTrips" element={<RoadTrips />} />
          <Route path="/RoadTrips/surfer-paradise" element={<SurferParadise />} />
          <Route path="/RoadTrips/lockdown-escape" element={<LockdownEscape />} />
          <Route path="/RoadTrips/coastal-camps" element={<CoastalCamps />} />
          <Route path="/RoadTrips/mountains-meadows" element={<MountainsMeadows />} />
          <Route path="/RoadTrips/desert-trails" element={<DesertTrails />} />
          <Route path="/RoadTrips/forest-getaways" element={<ForestGetaways />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/About" element={<About />} />
          <Route path="/Check" element={<Check />} />
          <Route path="/subscribe/confirmed" element={<SubscribeConfirm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
