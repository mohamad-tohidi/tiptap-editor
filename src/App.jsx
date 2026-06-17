import React, { useState } from 'react'
import Editor from './components/Editor'
import Infographic from './components/Infographic'
import './styles/app.css'

export default function App() {
  const [page, setPage] = useState('editor')

  return (
    <div className="app">
      <nav className="nav">
        <span className="nav-logo">✦ Qalam</span>
        <div className="nav-links">
          <button className={page === 'editor' ? 'active' : ''} onClick={() => setPage('editor')}>Editor</button>
          <button className={page === 'info' ? 'active' : ''} onClick={() => setPage('info')}>About</button>
        </div>
      </nav>
      {page === 'editor' ? <Editor /> : <Infographic />}
    </div>
  )
}
