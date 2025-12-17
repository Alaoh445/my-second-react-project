import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLink, FaSearch } from 'react-icons/fa'
import './index.css'
import img11 from './assets/NatureQ/NatureQ20.avif'
import img12 from './assets/NatureQ/NatureQ30.avif'




export default function FAQ() {

  
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
              backgroundImage: isMobile ? `url(${img12})` : `url(${img11})`,
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
          background:isMobile ? 'rgba(0,10,0,0.3)' : 'rgba(0,10,0,0.5)',
          marginTop: '-35px',
          height: '370px',
        },
       faqWrapper: {
         width: '100%',
         backgroundColor: '#f5f5f5',
         marginTop: isMobile ? '-30px' : '-60px',
         paddingTop: isMobile ? '40px' : '72px',
         paddingBottom: isMobile ? '20px' : '48px',
       },
      }

      const [activeTab, setActiveTab] = useState('general')
      const [searchText, setSearchText] = useState('')

      const generalFaqs = [
        { id: 1, q: 'What is an FAQ section?', a: "An FAQ (Frequently Asked Questions) section helps visitors find answers quickly to the most common questions about your service or product.", shareTarget: '/RoadTrips/surfer-paradise', cardHeight: 80, cardHeightMobile: 180 },
        { id: 2, q: 'Why do FAQs matter?', a: "They reduce support load, set expectations for customers, and help SEO by answering common queries clearly.", shareTarget: '/RoadTrips/lockdown-escape', cardHeight: 80, cardHeightMobile: 160 },
        { id: 3, q: 'Where can I add my FAQs?', a: "FAQs can be added to any page on your site or to your mobile app. Use the editor to manage questions and group them into categories.", shareTarget: '/RoadTrips/coastal-camps', cardHeight: 80, cardHeightMobile: 180 },
        { id: 4, q: 'How do I group my FAQs?', a: "Use categories to group related questions (billing, shipping, product usage) so users can find relevant answers faster.", shareTarget: '/RoadTrips/mountains-meadows', cardHeight: 80, cardHeightMobile: 160 },
        { id: 5, q: 'Can I include media in answers?', a: "Yes — include images or links to guides for richer help articles and better user understanding.", shareTarget: '/RoadTrips/desert-trails', cardHeight: 80, cardHeightMobile: 190 }
      ];

      const setupFaqs = [
        { id: 101, q: 'How do I add a question?', a: "Open the FAQ editor, click 'Add question', and enter a title and answer. Save to publish.", shareTarget: '/RoadTrips/forest-getaways', cardHeight: 80, cardHeightMobile: 160 },
        { id: 102, q: 'How do I change the order?', a: "Drag and drop questions inside the editor to reorder them, or use the ordering controls.", shareTarget: '/RoadTrips/surfer-paradise', cardHeight: 80, cardHeightMobile: 180 },
        { id: 103, q: 'How do I edit an answer?', a: "Click the question and press 'Edit' to modify the text, then save changes.", shareTarget: '/RoadTrips/lockdown-escape', cardHeight: 80, cardHeightMobile: 160 },
        { id: 104, q: 'Can I schedule FAQ updates?', a: "Some editors allow scheduling — check your CMS settings for publishing options.", shareTarget: '/RoadTrips/coastal-camps', cardHeight: 80, cardHeightMobile: 180 },
        { id: 105, q: 'How do I localize FAQs?', a: "Use the translation/localization tools to add language versions for different audiences.", shareTarget: '/RoadTrips/mountains-meadows', cardHeight: 80, cardHeightMobile: 180 }
      ];

  return (
   <>
    <div style={styles.Image}>
     <div style={styles.Rvsstyle}><h1 style={{paddingTop:isMobile ? '150px' : '70px', fontSize:isMobile ? '35px' : '50px'}}>FAQ</h1>
        <div style={{width:isMobile ? '90%' : '50%', margin:'0 auto'}}>
        <p style={{fontSize:isMobile ? '18px' : '20px', textAlign: isMobile ? 'center' : 'center'}}>
      Welcome to our help center. Below you will find quick answers to our most common questions regarding orders, shipping, and returns.
       If you can't find the information you need, please don't hesitate to contact our support team for personal assistance.</p></div>
           </div>
    </div>

    <div style={styles.faqWrapper}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '16px' : '28px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: isMobile ? 'flex-start' : 'space-between', alignItems: 'center', gap: 12 }}>
          <h2 style={{ textAlign: isMobile ? 'left' : 'left', margin: 0, paddingBottom: 0, width: isMobile ? '100%' : 'auto' }}>Frequently asked questions</h2>

          <div style={{ width: isMobile ? '100%' : 320, marginTop: isMobile ? 8 : 0 }}>
            <div style={{ position: 'relative', width: '70%' }}>
              <input
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Looking for something?"
                aria-label="Search FAQs"
                style={{ width: '100%', padding: '12px 36px 12px 10px', border: 'none', borderBottom: '1px solid #ccc' }}
              />
              <FaSearch style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 18, marginBottom: 18 }}>
          <button
            onClick={() => setActiveTab('general')}
            style={{ border: 'none', background: 'transparent', borderBottom: activeTab === 'general' ? '2px solid #00cc66' : 'none', padding: '8px 4px', color: activeTab === 'general' ? '#00cc66' : '#333' }}
          >
            General
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            style={{ border: 'none', background: 'transparent', borderBottom: activeTab === 'setup' ? '2px solid #00cc66' : 'none', padding: '8px 4px', color: activeTab === 'setup' ? '#00cc66' : '#333' }}
          >
            Setting up FAQs
          </button>
        </div>

        <div>
          {(activeTab === 'general' ? generalFaqs : setupFaqs).filter(item => item.q.toLowerCase().includes(searchText.toLowerCase())).map(item => (
            <div
              key={item.id}
              id={`faq-${item.id}`}
              style={{
                border: '1px solid rgba(0,0,0,0.06)',
                marginBottom: 12,
                background: '#fff',
                minHeight: isMobile ? 'auto' : `${item.cardHeight}px`,
                width: isMobile ? '100%' : '100%',
                margin: isMobile ? '0' : '0 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
                <div style={{ fontWeight: 600 }}>{item.q}</div>
                <button aria-label="toggle" onClick={() => setOpenId(openId === item.id ? null : item.id)} style={{ border: 'none', background: 'transparent', fontSize: 18 }}>
                  {openId === item.id ? '▴' : '▾'}
                </button>
              </div>

              <div style={{ maxHeight: openId === item.id ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.28s ease' }}>
                <div style={{ padding: openId === item.id ? '12px 16px' : '0 16px', color: '#444' }}>{item.a}</div>

                <div style={{ padding: openId === item.id ? '12px 16px' : '0 16px', display: 'flex', gap: 8 }}>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + item.shareTarget)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    style={{ color: '#1877F2' }}
                  ><FaFacebookF /></a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + item.shareTarget)}&text=${encodeURIComponent(item.q)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X (Twitter)"
                    style={{ color: '#1DA1F2' }}
                  ><FaTwitter /></a>

                  <a
                    href="https://instagram.com/naturequestbyalaoh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram profile"
                    style={{ color: '#E1306C' }}
                  ><FaInstagram /></a>

                  <button
                    onClick={() => {
                      const shareUrl = window.location.origin + (item.shareTarget || `${window.location.pathname}#faq-${item.id}`)
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(shareUrl).then(() => alert('Link copied to clipboard'))
                      } else {
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
                    style={{ border: 'none', background: 'transparent' }}
                  ><FaLink /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  )}