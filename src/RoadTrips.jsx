import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import './index.css'
import img11 from './assets/NatureQ/NatureQ13.avif'




export default function RoadTrips() {

  
     const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth <= 768)
      check()
      window.addEventListener('resize', check)
      return () => window.removeEventListener('resize', check)
    }, [])

     const styles = {
        Image: {
          textAlign: 'center',
          color: 'white',
          backgroundImage: `url(${img11})`,
          backgroundSize: isMobile ? 'cover' : 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: isMobile ? '40vh' : '50vh',
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          paddingBottom: '0px', 
        },
         Rvsstyle: {
      justifyContent: 'center',
      alignItem: 'center',
      background: 'rgba(0,10,0,0.2)',
      marginTop: '-27px',
      height: '370px',
    },
    All: {
      textDecoration: 'none',
      paddingLeft:isMobile ? '20px' : '70px',
      color: '#00cc66',
      fontSize: '20px',
    }
   }

  return (
    <>
    <div style={styles.Image}>
     <div style={styles.Rvsstyle}><h1 style={{paddingTop:'70px', fontSize:isMobile ? '25px' : '40px'}}>Our Road Trips</h1>
        <div style={{width:isMobile ? '90%' : '50%', margin:'0 auto'}}>
        <p style={{fontSize:isMobile ? '18px' : '20px', textAlign: isMobile ? 'center' : 'center'}}>Book our Trips today and enjoy a world of adventure, freedom, and comfort;
        you can embark on an unforgettable journey to scenic national parks or charming small towns, all while expereincing the unique 
        thrill of the open road and natural environment.</p></div>
           </div>
    </div>

  <div>
    <p><NavLink to="/RoadTrips/" style={styles.All} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>All Posts</NavLink></p>
  </div>
    </>
  )
}