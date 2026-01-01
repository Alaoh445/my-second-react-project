import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import ReviewSlider from './ReviewSlider';
import Gallery from './Gallary';
import bg from './assets/NatureQ/NatureQ1.avif'
import Road from './assets/NatureQ/NatureQ2.avif'
import Road1 from './assets/NatureQ/NatureQ3.avif'
import Road2 from './assets/NatureQ/NatureQ5.avif'
import Road3 from './assets/NatureQ/NatureQ4.avif'
import Road4 from './assets/NatureQ/NatureQ6.avif'

export default function Home() {

   const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const styles = {
    container: {
      textAlign: 'left',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: isMobile ? '20vh' : '100vh',
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      paddingBottom: isMobile ? '120px' : '250px',
    },
    content: {
      paddingTop: isMobile ? '50px' : '200px',
      paddingLeft: isMobile ? '20px' : '350px',
    },
    rental: {
      fontSize: isMobile ? '60px' : '75px',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)', 
      marginBottom: isMobile ? '15px' : '24px',
      marginTop: 50,
    },
    travel: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row', 
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '25px' : '400px',            
      fontSize: isMobile ? '18px' : '25px',
      color: '#002e20',
      width: isMobile ? '100%' : 'fit-content',
      padding: isMobile ? '12px 14px' : '25px 30px',
      borderRadius: '20%',
      backgroundColor: isMobile ? 'transparent' : 'rgba(255, 255, 255, 1)',
       textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      marginTop: isMobile ? 0 : 1,
      fontWeight: '500',
      boxSizing: 'border-box',
    },
    checkLink: {
      textDecoration: 'none',
      color: 'white',
      fontSize: isMobile ? '20px' : '25px',
      padding: isMobile ? '12px 16px' : '10px 20px',
      transition: 'all 0.3s ease',
      backgroundColor: '#00cc66',
      borderRadius: isMobile ? 50 : 50,
      display: isMobile ? 'block' : 'inline-block',
      textAlign: 'center'
    },

    // Section 2
    Book: {
      marginTop: isMobile ? '80px' : '100px',
      paddingLeft: isMobile ? '20px' : '50px',
      fontSize: isMobile ? '25px' : '40px',
      fontWeight: '500px',
    },
    container1: {
      display: 'grid',
      padding: isMobile ? '0px' : '0px 40px',
      marginTop: isMobile ? '30px' : '40px',
      background: 'white',
       gridTemplateColumns: 'repeat(auto-fit, minmax(335px, 1fr))',
       gap: isMobile ? '20px': '20px',
    },
    Roadside: {
     background: '#00cc66',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
       minHeight: isMobile ? '35vh' : '100vh',
       width: '100%',
    },
    Roadside2: {
       backgroundImage: isMobile ? `url(${Road})` : `url(${Road})`,
       backgroundColor: isMobile ? 'black' : 'transparent',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
       minHeight: isMobile ? '35vh' : '70vh',
       width: '100%',
       marginTop: isMobile ? '0px' : '150px',
    },
    Roadside3: {
       backgroundImage: `url(${Road1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
       minHeight: isMobile ? '35vh' : '40vh',
       width: isMobile ? '100%' : '70%',
    },
    Roadside4: {
       background: '#c87a27',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
       minHeight: isMobile ? '35vh' : '40vh',
      width: isMobile ? '100%' : '70%',
    },
     thirdCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20, 
      marginTop: isMobile ? '0px' : '150px',             
    },
    text: {
      fontSize: isMobile ? '40px' : '40px',
      paddingLeft: isMobile ? '20px' : '30px',
      color: 'white',
      paddingTop: isMobile ? '30px' : '100px',
    },
    textroadside: {
      fontSize: isMobile ? '40px' : '40px',
      paddingLeft: isMobile ? '20px' : '30px',
      color: 'white',
      paddingTop: isMobile ? '10px' : '250px',
    },
    textroadside1: {
      fontSize: isMobile ? '40px' : '40px',
      paddingLeft: isMobile ? '20px' : '30px',
      color: 'white',
      paddingTop: isMobile ? '10px' : '100px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    getKnowWrap: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'center',
      gap: isMobile ? '12px' : '24px',
      justifyContent: isMobile ? 'flex-start' : 'center',
      textAlign: isMobile ? 'center' : 'center',
      marginTop: isMobile ? '70px' : '100px',
      marginBottom: isMobile ? '40px' : '70px',
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
    learnMoreLink: {
      textDecoration: 'none',
      color: 'white',
      background: '#00cc66',
      padding: isMobile ? '15px 50px' : '15px 30px',
      borderRadius: 50,
      display: isMobile ? 'block' : 'inline-block',
      marginTop: isMobile ? '1px' : 0,
      marginLeft: isMobile ? 0 : '8px',
      fontSize: isMobile ? '20px' : '25px',
    },
    section1: {
      backgroundColor: '#f5f5f5',
      paddingBottom: isMobile ? '30px' : '50px',
    },
    Book1: {
      textAlign: 'center',
      paddingTop: isMobile ? '50px' : '100px',
      fontSize: isMobile ? '25px' : '40px',
    },
    number: {
      fontSize: isMobile ? '25px' : '25px',
      color: '#00cc66',
      marginTop: isMobile ? '10px' : '2px',
    },
    stepGrid: {
   display: 'grid',
   gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
   gap: isMobile ? '30px' : '50px',
   marginTop: isMobile ? '50px' : '140px',
   paddingLeft: isMobile ? '30px' : '200px',
   paddingRight: isMobile ? '50px' : '150px',
   },
    stepcard: {
     display: 'flex',
     flexDirection: isMobile ? 'colum' : 'row',
    },
  stepcard1: {
  display: 'block',
  backgroundImage: `url(${Road2})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: isMobile ? '100%' : '400px',
  height: isMobile ? '400px' : '750px',
  position: 'relative',
  zIndex: 1,
},
stepcard2: {
  display: 'block',
  backgroundImage: `url(${Road3})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: isMobile ? '100%' : '300px',
  height: isMobile ? '200px' : '300px',
  position: 'relative',
  right: isMobile ? '-50px' : '-250px', 
  top: isMobile ? '30px' : '50px',  
  zIndex: 2,
},
image: {
  width: '100%',
  height: isMobile ? '50vh' : '80vh',
  position: 'relative',
  backgroundImage: `url(${Road4})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: isMobile ? 'scroll' : 'fixed',
},

};
  
     const hoverStyles = `
    .check-availability-link:hover {
      background-color: #002e2e !important;
    }`;

  return (
    <>
    <section style={styles.container}>
      <style>{hoverStyles}</style>
      <div style={styles.content}>
        <h1 style={styles.rental}>RV Rentals<br />in Nigeria</h1>
        <div>
          <p style={styles.travel}>
            <span style={{color: isMobile ? 'white' : '#002e20', fontSize: isMobile ? '20px' : '25px'}}>Travel The Way You Want It</span>
            <NavLink 
              to="/Check" 
              style={styles.checkLink}
              className="check-availability-link"
            >
              Check Availability
            </NavLink>
          </p>
        </div>
      </div>
    </section>
    
    <section>
       <div style={styles.Book}> 
        <p>Why Book With Us</p>
      </div>
      <div style={styles.container1}>
      <div style={styles.Roadside}>
        <p style={styles.textroadside}>Roadside<br/> Assistance</p>
      </div>
      <div style={styles.Roadside2}>
        <p style={styles.textroadside1}>Unlimited<br/> Miles</p>
      </div>
      <div style={styles.thirdCol}>
        <div style={styles.Roadside3}><p style={styles.text}>Trip<br/> Advice</p></div>
        <div style={styles.Roadside4}><p style={styles.text}>No<br/> Booking<br/> Fees</p></div>
      </div>
      </div>

      {/* Get to know section: circle + title, learn more placed responsively */}
      <div style={styles.getKnowWrap}>
        <div style={styles.getKnowTitleWrap}>
          <div style={styles.greenCircle}></div>
          <h3 style={styles.getKnowTitle}>Get to Know Us</h3>
          {/* on desktop keep Learn More inline with space; on mobile it will go below */}
          {!isMobile && (
            <NavLink to="/About" style={styles.learnMoreLink} className="check-availability-link">Learn More</NavLink>
          )}
        </div>

        {isMobile && (
          <NavLink to="/About" style={styles.learnMoreLink} className="check-availability-link">Learn More</NavLink>
        )}
      </div>
      </section>

      <section style={styles.section1}>
        <div style={styles.Book1}>
          <p>Book your Trips in 3 Easy Steps</p>
        </div>
        <div style={styles.stepGrid}>
          <div>
          <div>
           <span style={styles.number}>01</span><br/> <h1 style={{fontWeight: 500, fontSize: '40px'}}>Reserve Your Ride</h1>
            <p style={{fontSize:20,}}>Book your vaction ride with NatureQuest by Alaoh<br/>We make sure you have memorable fun.</p>
          </div>
          <div>
            <span style={styles.number}>02</span><h1 style={{fontWeight: 500, fontSize: '40px'}}>Plan Your Trips</h1>
            <p style={{fontSize:20,}}>You can plan your trip with natureQuest by Alaoh<br/>We are available to make sure you have fun.</p>
          </div>
          <div>
           <span style={styles.number}>03</span> <h1 style={{fontWeight: 500, fontSize: '40px'}}>Hit the Road</h1>
            <p style={{fontSize:20,}}>Hit the road and enjoy a memorable fun adventure with<br/>NatureQuest by Alaoh for memorable fun.</p>
          </div>
          </div>
          <div style={styles.stepcard}>
            <div style={styles.stepcard2}></div>
            <div style={styles.stepcard1}></div>
          </div>
        </div>
        <div style={styles.getKnowWrap}>
        <div style={styles.getKnowTitleWrap}>
          <div style={styles.greenCircle}></div>
          <h3 style={styles.getKnowTitle}>Find Your Next Road Trip</h3>
          {/* on desktop keep Learn More inline with space; on mobile it will go below */}
          {!isMobile && (
            <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={styles.learnMoreLink} className="check-availability-link">Discover Trip Ideas</NavLink>
          )}
        </div>

        {isMobile && (
          <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  style={styles.learnMoreLink} className="check-availability-link">Discover Trip Ideas</NavLink>
        )}
      </div>
      </section>

      <section>
        <div style={styles.image}>
        </div>
      </section>

      <section>
        <ReviewSlider />
      </section>  

      <section>
        <Gallery />
      </section>
    </>
  )
}
