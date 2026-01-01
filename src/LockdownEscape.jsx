import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PageTemplate from './PageTemplate'

import r1 from './assets/NatureQ/NatureQ15.avif'
import r2 from './assets/NatureQ/NatureQ16.avif'
import r3 from './assets/NatureQ/NatureQ19.avif'
import { FaFacebook, FaInstagram, FaLinkedin, FaShareAlt, FaArrowLeft } from 'react-icons/fa'
import { posts as roadPosts } from './data/roadTripsData'

const SLUG = 'lockdown-escape'
function loadComments(){ try { const raw = localStorage.getItem(`comments_${SLUG}`); return raw ? JSON.parse(raw) : [] } catch { return [] } }
function saveComments(comments){ localStorage.setItem(`comments_${SLUG}`, JSON.stringify(comments)) }

export default function LockdownEscape(){
  const [search, setSearch] = useState('')
  const baseRecent = roadPosts.map(p => ({ title: p.title, to: p.path, img: p.img, slug: p.path.split('/').pop() })).filter(r => r.slug !== SLUG)
  const q = search.trim().toLowerCase()
  const filteredRecent = q ? baseRecent.filter(r => r.title.toLowerCase().includes(q) || r.slug.includes(q)) : baseRecent
  const recentToShow = filteredRecent.slice(0,4)

  const [comments, setComments] = useState(() => loadComments())
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [views, setViews] = useState(() => Number(localStorage.getItem(`views_${SLUG}`) || 0))
  const [copyMsg, setCopyMsg] = useState('')
  const [showComments, setShowComments] = useState(false)

  useEffect(() => { const v = Number(localStorage.getItem(`views_${SLUG}`) || 0) + 1; localStorage.setItem(`views_${SLUG}`, v); setViews(v) }, [])
  useEffect(() => saveComments(comments), [comments])

  function addComment(){ if(!name.trim()||!text.trim()) return; const c = { id: Date.now().toString(), name: name.trim(), text: text.trim(), createdAt: new Date().toISOString(), reads:0}; setComments(prev=>[c,...prev]); setName(''); setText('') }
  function markCommentRead(id){ setComments(prev=>prev.map(c=>c.id===id?{...c, reads:(c.reads||0)+1}:c)) }
  function shareFacebook(){ const url = window.location.href; window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener') }
  function shareLinkedIn(){ const url = window.location.href; window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener') }
  function shareInstagram(){ window.open('https://www.instagram.com/', '_blank', 'noopener') }
  async function copyLink(){ try{ await navigator.clipboard.writeText(window.location.href); setCopyMsg('Link copied'); setTimeout(()=>setCopyMsg(''),2000) } catch { setCopyMsg('Unable to copy'); setTimeout(()=>setCopyMsg(''),2000) } }

  const articleParagraphs = [
    "Blend productivity with travel: the right itinerary, power setups, and quiet campgrounds make remote work from an RV genuinely enjoyable.",
    "Choose campgrounds with reliable cellular or satellite options and plan your working hours around peak connectivity windows.",
    "Pack surge protectors and a small UPS if you rely on desktop work; seek out community hubs and co-working cafes where available.",
    "Take local time for walks and short hikes to separate work from downtime — it keeps you focused and refreshed.",
    "Book ahead if possible, but leave buffer days for unexpected changes."
  ]
  const articleMatches = q && articleParagraphs.join(' ').toLowerCase().includes(q)
  function highlight(text,q){ if(!q) return text; const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'ig')); return parts.map((part,i)=> part.toLowerCase()===q.toLowerCase()? <mark key={i}>{part}</mark>: <span key={i}>{part}</span>) }

  return (
    <PageTemplate title="Lockdown Escape" subtitle="Work & Travel From Your RV" heroNote="Work remote while you wander." recent={recentToShow}>
      <div className="article-top">
        <div className="article-meta">
          <NavLink to="/RoadTrips" className="all-posts-link"><FaArrowLeft className="all-posts-icon" />All posts</NavLink>
          <div className="meta-right">{views} views • {comments.length} comments</div>
        </div>

        <div className="search-bar"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search recent posts or this article..." aria-label="Search posts and article" /></div>
      </div>

      {articleMatches && <div style={{ margin: '8px 0', color: '#006b37' }}>Search matches found in the article.</div>}

      <article className="article-body">
        <h2>Work & Travel: A practical guide</h2>
        <div className="byline">June 1, 2025 — <span className="author">NatureQuest</span></div>

        <p className="lead">{highlight(articleParagraphs[0],q)}</p>
        <p>{highlight(articleParagraphs[1],q)}</p>
        <img className="inline-img" src={r1} alt="work on the road" />
        <p>{highlight(articleParagraphs[2],q)}</p>
        <p className="pull-quote">“Plan for connectivity, but plan to disconnect too — balance is the point of the escape.”</p>
        <img className="inline-img" src={r2} alt="cozy camp" />
        <p>{highlight(articleParagraphs[3],q)}</p>
        <img className="inline-img" src={r3} alt="camp setup" />
        <h3>Tips & checklists</h3>
        <p>{highlight(articleParagraphs[4],q)}</p>

        <div className="share-row">
          <button className="icon-btn" onClick={shareFacebook} aria-label="Share on Facebook"><FaFacebook /></button>
          <button className="icon-btn" onClick={shareInstagram} aria-label="Open Instagram"><FaInstagram /></button>
          <button className="icon-btn" onClick={shareLinkedIn} aria-label="Share on LinkedIn"><FaLinkedin /></button>
          <button className="icon-btn" onClick={copyLink} aria-label="Copy link"><FaShareAlt /></button>
          <span className="copy-msg">{copyMsg}</span>
        </div>

        <hr />

        <section className="comments">
          <h4>Comments</h4>
          <div style={{ marginBottom: 8 }}>{comments.length} comments • <button className="all-posts-link small" onClick={() => setShowComments(s => !s)}>{showComments ? 'Hide comments' : 'View all comments'}</button></div>

          {showComments && (
            <>
              <div className="comment-form">
                <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <textarea placeholder="Write a comment" value={text} onChange={e => setText(e.target.value)} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-primary" onClick={addComment}>Submit</button>
                  <div style={{alignSelf:'center', color:'#666'}}>{comments.length} comments</div>
                </div>
              </div>

              <ul className="comment-list">
                {comments.map(c => (
                  <li key={c.id} onClick={() => markCommentRead(c.id)}>
                    <div className="c-head"><strong>{c.name}</strong> <span className="c-date">{new Date(c.createdAt).toLocaleString()}</span></div>
                    <div className="c-body">{c.text}</div>
                    <div className="c-meta">Reads: {c.reads || 0}</div>
                  </li>
                ))}
                {!comments.length && <li style={{ color: '#666' }}>No comments yet — be the first to share!</li>}
              </ul>
            </>
          )}


        </section>

      </article>
    </PageTemplate>
  )
} 
