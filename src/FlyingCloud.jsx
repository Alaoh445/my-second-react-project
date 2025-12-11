import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaUsers, FaBed, FaToilet } from "react-icons/fa";
import {TbRulerMeasure} from "react-icons/tb";
import './index.css'
import Road from './assets/NatureQ/NatureQ11.avif'

export default function EuroCamper() {

  
     const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth <= 768)
      check()
      window.addEventListener('resize', check)
      return () => window.removeEventListener('resize', check)
    }, [])

    
const styles = {
  EuroCamper: {
    paddingTop:isMobile ? '50px' : '100px',
    display: "inline-flex",
  },
  EuroCamper1: {
        display: "flex",
        flexDirection:isMobile ? 'column': 'row',
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap:isMobile? '10px': "20px",
        paddingTop:isMobile? '0px' : '50px',
         paddingBottom: isMobile? '10px' : '70px',
  },
  EuroCamper2: {
       display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // two columns on desktop
      gap:isMobile? '20px' : "80px",
      marginTop: "10px"
  },
  EuroCamper3: {
    display: 'flex',
    flexDirection: isMobile? 'column' : 'row',
    gap:isMobile? '0px' : '15px',
   textAlign: 'center',
   justifyContent: 'center',
   paddingBottom:isMobile? '50px' : '50px',
  },
};
  
  return (
    <>
    <div style={{backgroundColor: '#f5f5f5'}}>
    <div style={styles.EuroCamper}>
       <FaArrowLeft style={{ paddingLeft:isMobile ? "20px" : "170px"}} />
      <NavLink to="/RVs" className="EuroCamper"> 
        Back to RVs</NavLink>
    </div>

    <div style={styles.EuroCamper1}>
      <div style={{paddingLeft:isMobile ? '0px'  : '250px', paddingTop:isMobile? '0px' : '70px'}}>
      <h1 style={{fontSize: '50px', paddingLeft:isMobile ? '20px'  : '0px',  fontWeight:500}}>Flying Cloud</h1>
      <p style={{fontSize: '25px', paddingLeft:isMobile ? '20px'  : '0px', marginTop: isMobile? '-20px': '-10px' }}># 150,000 per night</p>
      <div>
        <img src={Road} alt="Euro Camper Image" style={{width: '100%',height:'auto', display:isMobile? 'block' :'none'}}/>
      </div>
      <p style={{fontSize: '20px', paddingLeft:isMobile? '40px': '0px'}}>Book for your venagon adventurous trip<br />
      Enjoy natural environment free<br/>
      From pollution and noise</p>
      <h1 style={{marginTop: '50px', fontWeight: 'lighter', paddingLeft:isMobile? '20px': '0px'}}>Specifications</h1>

      <div style={styles.EuroCamper2}>
        <div style={{paddingLeft:isMobile? '20px': '0px'}}>
          <FaUsers style={{backgroundColor: '#c87a27', width: '60px', borderRadius: '50%'}} size={40}/>
          <h1 style={{fontSize: '20px'}}>6 passengers</h1>
        </div>
         <div style={{paddingLeft:isMobile? '20px': '0px'}}>
          <TbRulerMeasure style={{backgroundColor: '#c87a27', width: '60px', borderRadius: '50%'}} size={40}/>
          <h1  style={{fontSize: '20px'}}>Dimension</h1>
          <p style={{marginTop: '-10px'}}>7m X 3m X 2.8</p>
        </div>
         <div style={{paddingLeft:isMobile? '20px': '0px'}}>
          <FaBed style={{backgroundColor: '#c87a27', width: '60px', borderRadius: '50%'}} size={40}/>
          <h1  style={{fontSize: '20px'}}>3 Double Beds</h1>
          <p style={{marginTop: '-10px'}}>Sleep five</p>
        </div>
         <div style={{paddingLeft:isMobile? '20px': '0px'}}>
          <FaToilet style={{backgroundColor: '#c87a27', width: '60px', borderRadius: '50%'}} size={40}/>
          <h1  style={{fontSize: '20px'}}>WC</h1>
          <p style={{marginTop: '-10px'}}>Optional as extra</p>
        </div>
      </div>
      </div>

      <div>
        <img src={Road} alt="Euro Camper Image" style={{width:isMobile? '100%' : '70%', paddingRight:isMobile ? '0px' : '50px', display:isMobile? 'none' :'block'}} />
      </div>
    </div >
     <div style={styles.EuroCamper3}>
      <p style={{fontSize:isMobile? '25px' : '30px'}}>Want This RV?</p><span>
        <NavLink style={{fontSize: '18px', marginTop:isMobile? '0px' : '20px'}} to="/Check" className="check-availability-link">Check Availability</NavLink></span>
      </div>
    </div>
    </>
  )
}