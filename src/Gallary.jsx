import React, { useState, useEffect } from 'react'
import "./index.css";
import img1 from "./assets/NatureQ/NatureQ17.avif";
import img2 from "./assets/NatureQ/NatureQ21.avif";
import img3 from "./assets/NatureQ/NatureQ22.avif";
import img4 from "./assets/NatureQ/NatureQ19.avif";
import img5 from "./assets/NatureQ/NatureQ9.avif";
import img6 from "./assets/NatureQ/NatureQ10.avif";
import img7 from "./assets/NatureQ/NatureQ1.avif";
import img8 from "./assets/NatureQ/NatureQ4.avif";
import img9 from "./assets/NatureQ/NatureQ14.avif";
import img10 from "./assets/NatureQ/NatureQ16.avif"; 

const images = [
  { src: img1, hashtag: "#travel #Adventure", link: "https://instagram.com/yourprofile" },
  { src: img2, hashtag: "#nature", link: "https://instagram.com/yourprofile" },
  { src: img3, hashtag: "#adventure", link: "https://instagram.com/yourprofile" },
  { src: img4, hashtag: "#fun", link: "https://instagram.com/yourprofile" },
  { src: img5, hashtag: "#explore", link: "https://instagram.com/yourprofile" },
  { src: img6, hashtag: "#wanderlust", link: "https://instagram.com/yourprofile" },
  { src: img7, hashtag: "#roadtrip", link: "https://instagram.com/yourprofile" },
  { src: img8, hashtag: "#vacation", link: "https://instagram.com/yourprofile" },
  { src: img9, hashtag: "#sunset", link: "https://instagram.com/yourprofile" },
  { src: img10, hashtag: "#memories", link: "https://instagram.com/yourprofile" },
];

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const styles = {
    GreenCircle: {
      width: isMobile ? 25 : 40,
      height: isMobile ? 25 : 40,
      borderRadius: '50%',
      background: '#c87a27',
      flexShrink: 0,
      marginRight: 10,
    },
  }

  return (
    <>
      {/* Circle + Text together */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', paddingTop:isMobile ? '30px' : '150px'}}>
        <div style={styles.GreenCircle}></div>
        <h2 style={{fontWeight: 'normal', fontSize: isMobile ? '25px' : '40px'}}>
          Follow us @NatureQuest by Alaoh
        </h2>
      </div>

      {/* Gallery */}
      <div className="gallery" style={{paddingBottom: isMobile ? '20px' : '100px'}}>
        {images.map((img, index) => (
          <a
            key={index}
            href={img.link}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-item"
          >
            <img src={img.src} alt={img.hashtag} />
            <div className="overlay">{img.hashtag}</div>
          </a>
        ))}
      </div>
    </>
  );
}
