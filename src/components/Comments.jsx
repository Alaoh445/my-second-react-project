import React, { useEffect, useState } from 'react'

export default function Comments({ slug }) {
  const key = `comments_${slug}`
  const [show, setShow] = useState(false)
  const [comments, setComments] = useState(() => {
    try {
      const s = localStorage.getItem(key)
      return s ? JSON.parse(s) : []
    } catch {
      return []
    }
  })
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(comments)) } catch (err) { console.debug('localStorage write failed', err) }
  }, [comments, key])

  function addComment() {
    if (!name.trim() || !text.trim()) return
    const c = { id: Date.now().toString(), name: name.trim(), text: text.trim(), createdAt: new Date().toISOString(), reads: 0 }
    setComments(prev => [c, ...prev])
    setName('')
    setText('')
  }

  function markRead(id) {
    setComments(prev => prev.map(c => c.id === id ? { ...c, reads: (c.reads || 0) + 1 } : c))
  }

  return (
    <div className="comments-block">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h4 style={{ margin: 0 }}>{comments.length} comments</h4>
        <button className="all-posts-link small" onClick={() => setShow(s => !s)}>{show ? 'Hide comments' : 'View all comments'}</button>
      </div>

      {show && (
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
              <li key={c.id} onClick={() => markRead(c.id)}>
                <div className="c-head"><strong>{c.name}</strong> <span className="c-date">{new Date(c.createdAt).toLocaleString()}</span></div>
                <div className="c-body">{c.text}</div>
                <div className="c-meta">Reads: {c.reads || 0}</div>
              </li>
            ))}
            {!comments.length && <li style={{ color: '#666' }}>No comments yet — be the first to share!</li>}
          </ul>
        </>
      )}
    </div>
  )
}
