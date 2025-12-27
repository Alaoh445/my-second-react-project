import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PageTemplate from './PageTemplate'

import r1 from './assets/NatureQ/NatureQ14.avif'
import r2 from './assets/NatureQ/NatureQ16.avif'
import r3 from './assets/NatureQ/NatureQ19.avif'
import { FaFacebook, FaInstagram, FaLinkedin, FaShareAlt, FaArrowLeft } from 'react-icons/fa'
import { posts as roadPosts } from './data/roadTripsData'

const SLUG = 'coastal-camps'

function loadComments() {
  try {
    const raw = localStorage.getItem(`comments_${SLUG}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveComments(comments) {
  localStorage.setItem(`comments_${SLUG}`, JSON.stringify(comments))
}

export default function CoastalCamps(){
  const [search, setSearch] = useState('')
  // Build recent list (exclude current slug and limit to 4)
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
  useEffect(() => {
    // increment view count once per load
    const v = Number(localStorage.getItem(`views_${SLUG}`) || 0) + 1
    localStorage.setItem(`views_${SLUG}`, v)
    setViews(v)
  }, [])

  useEffect(() => saveComments(comments), [comments])

  function addComment() {
    if (!name.trim() || !text.trim()) return
    const c = { id: Date.now().toString(), name: name.trim(), text: text.trim(), createdAt: new Date().toISOString(), reads: 0 }
    setComments(prev => [c, ...prev])
    setName('')
    setText('')
  }

  function markCommentRead(id) {
    setComments(prev => prev.map(c => c.id === id ? { ...c, reads: (c.reads || 0) + 1 } : c))
  }

  function shareFacebook() {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener')
  }

  function shareLinkedIn() {
    const url = window.location.href
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener')
  }

  function shareInstagram() {
    // Instagram doesn't provide a web share endpoint; open homepage/profile instead
    window.open('https://www.instagram.com/', '_blank', 'noopener')
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyMsg('Link copied')
      setTimeout(() => setCopyMsg(''), 2000)
    } catch {
      setCopyMsg('Unable to copy')
      setTimeout(() => setCopyMsg(''), 2000)
    }
  }

  const articleParagraphs = [
    "The coastline offers more than sunsets — it's a living, breathing path for the adventurous at heart. In this feature we explore seaside RV stops that balance convenience with character: from sandy encampments where you can fall asleep to crashing waves, to cliff-side overlooks with dramatic vistas and hidden coves worth the hike.",
    "Start your journey early. Drive slowly along the coast and look for the small signs that point to local campgrounds and tiny family-run sites. These are often the spots with the character — a neighborly host, a hand-painted sign, and shoreline access that feels private.",
    "When you arrive, map out nearby tide pools and communal BBQ spots. Beach rules vary, and some areas close seasonally; a quick phone call or a look at the campsite noticeboard will save you a fine or an awkward conversation. Respect the locals and the environment: Keep fire pits controlled and mind dog restrictions.",
    "Food options vary from roadside grills to community markets; take the local catch if available, and support small businesses when possible. Activities range from surf lessons for beginners to guided coastal hikes and sunset yoga sessions. Small fun facts: some of the best sunset viewpoints are also historical markers — look for old lighthouse ruins and interpretive plaques.",
    "Pack layers, bring a basic repair kit, and know the nearest fuel stops — some stretches can be long between stations. Check local rules for leash requirements and for permitted campsite times. If you're traveling during holidays, book early."
  ]

  const articleMatches = q && articleParagraphs.join(' ').toLowerCase().includes(q)

  function highlight(text, q) {
    if (!q) return text
    const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'))
    return parts.map((part, i) => part.toLowerCase() === q.toLowerCase() ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>)
  }

  return (
    <PageTemplate title="Coastal Camps" subtitle="Where the shore meets the open road" heroNote="Surf's up — quick tide & weather tips below." recent={recentToShow}>
      <div className="article-top">
        <div className="article-meta">
          <NavLink to="/RoadTrips" className="all-posts-link"><FaArrowLeft className="all-posts-icon" />All posts</NavLink>
          <div className="meta-right">{views} views • {comments.length} comments</div>
        </div>

        <div className="search-bar">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search recent posts or this article..." aria-label="Search posts and article" />
        </div>
      </div>

      {articleMatches && <div style={{ margin: '8px 0', color: '#006b37' }}>Search matches found in the article.</div>}

      <article className="article-body">
        <h2>Surfer's Paradise: Where to Stop for Best Waves</h2>
        <div className="byline">May 24, 2025 — <span className="author">NatureQuest</span></div>

        <p className="lead">{highlight(articleParagraphs[0], q)}</p>

        <p>{highlight(articleParagraphs[1], q)}</p>

        <img className="inline-img" src={r1} alt="coast 1" />

        <p>{highlight(articleParagraphs[2], q)}</p>

        <p className="pull-quote">“Always carry tide charts and plan for one extra day — it's worth waiting for perfect conditions.”</p>

        <img className="inline-img" src={r2} alt="coast 2" />

        <p>{highlight(articleParagraphs[3], q)}</p>

        <img className="inline-img" src={r3} alt="coast 3" />

        <h3>Planning your trip</h3>
        <p>{highlight(articleParagraphs[4], q)}</p>

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
