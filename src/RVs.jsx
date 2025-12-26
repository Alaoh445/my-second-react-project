import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import './index.css'
import img11 from './assets/NatureQ/NatureQ25.avif'
import img12 from './assets/NatureQ/NatureQ15.avif'
import img13 from './assets/NatureQ/NatureQ16.avif'
import img14 from './assets/NatureQ/NatureQ14.avif'
import img15 from './assets/NatureQ/NatureQ21.avif'
import img16 from './assets/NatureQ/NatureQ23.avif'
import img17 from './assets/NatureQ/NatureQ18.avif'



export default function RVs() {
  // add wrapper class for page-level min-height handling
  const pageClass = 'rvs-page-wrapper'
  
     const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth <= 768)
      check()
      window.addEventListener('resize', check)
      return () => window.removeEventListener('resize', check)
    }, [])

  const navStyle = {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    padding: '18px 20px',
    background: '#002e20',
    color: 'white',
    marginTop: 0, 
    flexWrap: 'wrap',
  };

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
      alignItems: 'center',
      background: 'rgba(0,10,0,0.5)',
      marginTop: '-27px',
      height: '370px',
    },
    heading: {
      fontWeight: 'lighter',
      fontSize: '30px',
      paddingLeft: '10px',
    },
    heading1: {
       marginTop: '-5px',
       opacity: 0.5,
       fontSize: '20px',
       paddingLeft: '10px',
       paddingBottom: '10px',
    },

      getKnowWrap: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'center',
      gap: isMobile ? '12px' : '24px',
      justifyContent: isMobile ? 'flex-start' : 'center',
      textAlign: isMobile ? 'center' : 'center',
      marginTop: isMobile ? '30px' : '30px',
      marginBottom: isMobile ? '0px' : '0px',
       backgroundColor: '#f5f5f5',
       paddingTop:isMobile ? '50px' :'120px',
       paddingBottom:isMobile ? '50px' : '120px',
    },
    getKnowTitleWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '10px': '25px',
    },
     greenCircle: {
      width: isMobile ? 25 : 40,
      height: isMobile ? 25 : 40,
      borderRadius: '50%',
      background: '#c87a27',
      flexShrink: 0,
    },
     getKnowTitle: {
      fontSize: isMobile ? '25px' : '35px',
      margin: 0,
      color: 'black',
      fontWeight: '500',
    },
  };

  return (
    <div className={pageClass}>
      <nav style={navStyle}>
        <NavLink to="/RVs/euro-camper" className={({ isActive }) => isActive ? "linkBase active" : "linkBase"}>EuroCamper</NavLink>
        <NavLink to="/RVs/venagon" className={({ isActive }) => isActive ? "linkBase active" : "linkBase"}>Venagon</NavLink>
        <NavLink to="/RVs/ranger-van" className={({ isActive }) => isActive ? "linkBase active" : "linkBase"}>Ranger Van</NavLink>
        <NavLink to="/RVs/travel-trailer" className={({ isActive }) => isActive ? "linkBase active" : "linkBase"}>Travel Trailer</NavLink>
        <NavLink to="/RVs/flying-cloud" className={({ isActive }) => isActive ? "linkBase active" : "linkBase"}>Flying Cloud</NavLink>
        <NavLink to="/RVs/motorhome" className={({ isActive }) => isActive ? "linkBase active" : "linkBase"}>MotorHome</NavLink>
      </nav>

      <main>
        <div style={styles.Image}>
        <div style={styles.Rvsstyle}><h1 style={{paddingTop:'70px', fontSize:isMobile ? '25px' : '40px'}}>Our RVs</h1>
        <div style={{width:isMobile ? '90%' : '50%', margin:'0 auto'}}>
        <p style={{fontSize:isMobile ? '18px' : '20px', textAlign: isMobile ? 'center' : 'center'}}>Book our RVs today and enjoy a world of adventure, freedom, and comfort;
        you can embark on an unforgettable journey to scenic national parks or charming small towns, all while expereincing the unique 
        thrill of the open road and natural environment.</p></div>
           </div>
           </div>
        <Outlet />

        <div className="rvs-grid">
          <div>
            <NavLink  to="/RVs/euro-camper" className="rv-card">
            <img src={img12} alt="NatureQ26" style={{ width: '100%', marginTop: '20px' }} />
            <h1 style={styles.heading}>ErinCamper</h1>
            <p style={styles.heading1}>#140,000 per night</p>
            </NavLink>
          </div>
          
          <div>
             <NavLink  to="/RVs/venagon" className="rv-card">
            <img src={img13} alt="NatureQ27" style={{ width: '100%', marginTop: '20px' }} />
            <h1 style={styles.heading}>Venagon</h1>
            <p style={styles.heading1}>#130,000 per night</p>
            </NavLink>
          </div>
          <div>
             <NavLink  to="/RVs/ranger-van" className="rv-card">
            <img src={img14} alt="NatureQ28" style={{ width: '100%', marginTop: '20px' }} />
            <h1 style={styles.heading}>Ranger Van</h1>
            <p style={styles.heading1}>#120,000 per night</p>
            </NavLink>
          </div>
          <div>
             <NavLink  to="/RVs/travel-trailer" className="rv-card">
            <img src={img15} alt="NatureQ29" style={{ width: '100%', marginTop: '20px' }} />
            <h1 style={styles.heading}>Travel Trailer</h1>
            <p style={styles.heading1}>#110,000 per night</p>
            </NavLink>
          </div>
          <div>
             <NavLink  to="/RVs/flying-cloud" className="rv-card">
            <img src={img16} alt="NatureQ30" style={{ width: '100%', marginTop: '20px' }} />
            <h1 style={styles.heading}>Flying Cloud</h1>
            <p style={styles.heading1}>#150,000 per night</p>
            </NavLink>
          </div>
          <div>
             <NavLink  to="/RVs/motorhome" className="rv-card">
            <img src={img17} alt="NatureQ31" style={{ width: '100%', marginTop: '20px' }} />
            <h1 style={styles.heading}>MotorHome</h1>
            <p style={styles.heading1}>#160,000 per night</p>
            </NavLink>
          </div>
        </div>
        <div style={{alignItems: 'center'}} className="reserve-container">
            
             <h3 style={styles.heading}>Reserve Your Trip</h3>
            <NavLink 
              to="/Check"  
              className="check-availability-link"
              >
                Check Availability
              </NavLink>
             </div>
             <div>
               <div style={styles.getKnowWrap}>
                      <div style={styles.getKnowTitleWrap}>
                        <div style={styles.greenCircle}></div>
                        <h3 style={styles.getKnowTitle}>Have Questions? Visit Our</h3>
                        {/* on desktop keep Learn More inline with space; on mobile it will go below */}
                        {!isMobile && (
                          <NavLink to="/FAQ" style={styles.learnMoreLink} className="check-availability-link">FAQs Page</NavLink>
                        )}
                      </div>
              
                      {isMobile && (
                        <NavLink to="/About" style={styles.learnMoreLink} className="check-availability-link">Learn More</NavLink>
                      )}
                    </div>
             </div>
      </main>
    </div>
  );
}
