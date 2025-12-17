import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import './index.css'
import img11 from './assets/NatureQ/NatureQ13.avif'
import SearchBar from "./SearchBar.jsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFacebookF, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";

import img14 from './assets/NatureQ/NatureQ14.avif'
import img15 from './assets/NatureQ/NatureQ15.avif'
import img16 from './assets/NatureQ/NatureQ16.avif'
import img17 from './assets/NatureQ/NatureQ17.avif'
import img18 from './assets/NatureQ/NatureQ18.avif'
import img19 from './assets/NatureQ/NatureQ19.avif'




export default function RoadTrips() {

  
     const [isMobile, setIsMobile] = useState(false)
    const [openId, setOpenId] = useState(null);
  
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
      color: 'black',
      fontSize: '15px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
       alignItems: 'center',
       paddingLeft: isMobile ? '20px' : '70px',
       paddingRight: isMobile ? '20px' : '70px',
        marginTop: '40px',
        marginBottom: 0,
        backgroundColor: '#f5f5f5',
   },
      postsWrapper: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        marginTop: isMobile ? '-30px' : '-60px',
        paddingTop: isMobile ? '40px' : '72px',
        paddingBottom: isMobile ? '10px' : '20px'
      },
   Heading: {
    fontSize: isMobile ? '25px' : '40px',
    marginTop: isMobile ? '20px' : '30px',
    fontWeight: 'lighter',
   },
   Line:{
   width: '100%',
   height: '1px',
  backgroundColor: '#ccc',
  marginTop: '50px',
   },
   view:{
    fontSize: '14px',
   color: '#666',
   },
  }

  const posts = [
  { id: 1, img: img14, imgHeight: 260, imgHeightMobile: 160, cardHeight: 420, cardHeightMobile: 360, path: '/RoadTrips/surfer-paradise', title: "Surfer’s Paradise: Where to Stop for Best Waves", excerpt: "Sufer paradise is an adventurous that every individual can enjoy, it is pure joy and free from the bustling of Human activities...", date: "May 16, 2025", read: "1 min read", views: 256 },
  { id: 2, img: img15, imgHeight: 460, imgHeightMobile: 200, cardHeight: 520, cardHeightMobile: 380, path: '/RoadTrips/lockdown-escape', title: "Lockdown Escape: Work & Travel From Your RV", excerpt: "Lockdown escape is an adventure that is filled with joyous and endless view of the natural environment. it is pure joy if you are here...", date: "May 16, 2025", read: "3 min read", views: 356 },
  { id: 3, img: img16, imgHeight: 340, imgHeightMobile: 180, cardHeight: 460, cardHeightMobile: 380, path: '/RoadTrips/coastal-camps', title: "Coastal Camps: Beachfront RV Spots Worth Visiting", excerpt: "Explore coastal camps with sunsets and salty air—perfect for beachside RV stays", date: "May 16, 2025", read: "3 min read", views: 198 },
  { id: 4, img: img17, imgHeight: 280, imgHeightMobile: 160, cardHeight: 480, cardHeightMobile: 360, path: '/RoadTrips/mountains-meadows', title: "Mountains & Meadows: High Altitude Road Trips", excerpt: "Find serene campsites with clear skies and crisp mornings in the high country. Enjoy the beauty of nature and the freedom of the open road.", date: "May 16, 2025", read: "3 min read", views: 422 },
  { id: 5, img: img18, imgHeight: 500, imgHeightMobile: 240, cardHeight: 600, cardHeightMobile: 460, path: '/RoadTrips/desert-trails', title: "Desert Trails: Minimalist RV Adventures", excerpt: "Experience quiet deserts and starry nights on minimalist RV routes. Book our Trips today and enjoy a world of adventure, freedom, and comfort!", date: "May 16, 2025", read: "3 min read", views: 289 },
  { id: 6, img: img19, imgHeight: 320, imgHeightMobile: 160, cardHeight: 410, cardHeightMobile: 360, path: '/RoadTrips/forest-getaways', title: "Forest Getaways: Campsites Among the Pines", excerpt: "Wake to birdsong and scented pines at these forested RV parks. Come and have fun and enjoy the best of adventurous joy full of natural life and free of noise!", date: "May 16, 2025", read: "3 min read", views: 312 }
  ];

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

<div style={styles.postsWrapper}>
  <div style={styles.header}>
    <NavLink to="/RoadTrips/" style={styles.All} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><h2>All Posts</h2></NavLink>
    <SearchBar />
  </div>
  {/* All Post in RoadTrips */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start', paddingLeft: isMobile ? '20px' : '70px', paddingRight: isMobile ? '20px' : '70px', paddingTop: '50px', marginBottom: '50px'}}>
  {posts.map(post => (
    <article key={post.id} style={{ flex: isMobile ? '1 1 100%' : '1 1 calc(33.333% - 20px)', minWidth: '250px', background: '#fff', borderRadius: 0, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <NavLink to={post.path} className="Road_trips" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'block' }}>
        <img src={post.img} alt={post.title} style={{ width: '100%', height: isMobile ? 160 : (post.imgHeight || 200), objectFit: 'cover', display: 'block' }} />
      </NavLink>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14, color: '#666' }}><span className="date">{post.date}</span> <span className="read-time">• {post.read}</span></div>

          <div style={{ position: 'relative' }}>
            <button className="menu-btn" onClick={() => setOpenId(openId === post.id ? null : post.id)} aria-label="More options"><BsThreeDotsVertical /></button>

            {openId === post.id && (
              <div className="share-box" style={{ position: 'absolute', right: 0, top: 28, background: '#fff', borderRadius: 6, padding: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', gap: 8 }}>
                <a
                  className="share-icon facebook"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + post.path)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  className="share-icon twitter"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + post.path)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X (Twitter)"
                >
                  <FaTwitter />
                </a>

                <a
                  className="share-icon instagram"
                  href="https://instagram.com/naturequestbyalaoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile"
                >
                  <FaInstagram />
                </a>

                <button
                  className="share-icon copy"
                  onClick={() => {
                    const shareUrl = window.location.origin + post.path
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(shareUrl).then(() => alert('Link copied to clipboard'))
                    } else {
                      // fallback
                      const tmp = document.createElement('input')
                      tmp.value = shareUrl
                      document.body.appendChild(tmp)
                      tmp.select()
                      document.execCommand('copy')
                      document.body.removeChild(tmp)
                      alert('Link copied to clipboard')
                    }
                  }}
                  aria-label="Copy link"
                >
                  <FaLink />
                </button>
              </div>
            )}
          </div>
        </div>

        <NavLink to={post.path} className="Road_trips" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 style={styles.Heading}>{post.title}</h2>
          <p style={{ margin: 0, lineHeight: 1.4 }}>{post.excerpt}</p>
        </NavLink>

        <div style={styles.Line}></div>
        <p style={styles.view}>{post.views} views</p>
      </div>
    </article>
  ))}
  </div>
</div>
    </>
  )}