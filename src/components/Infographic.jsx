import React from 'react'
import '../styles/infographic.css'

const features = [
  { icon: '🤖', title: 'AI Autocomplete', desc: 'Connected to your local LLM — no cloud required.' },
  { icon: '🌿', title: 'Minimal & Islamic UI', desc: 'Sky-blue gradients, pastel green, Amiri typography.' },
]

const roadmap = [
  { icon: '🔀', title: 'Git-like Versioning', desc: 'Track every change. Visual diff between versions.' },
  { icon: '👥', title: 'Collaborative Editing', desc: 'Real-time multi-user editing powered by CRDTs.' },
  { icon: '☁️', title: 'Cloud Storage', desc: 'Push & pull your documents on any device.' },
]

export default function Infographic() {
  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="bismillah">بسم الله الرحمن الرحيم</div>
        <h1>Qalam</h1>
        <p className="tagline">A mindful writing space — minimal, powerful, and yours.</p>
      </div>

      <section>
        <h2>Now</h2>
        <div className="card-grid">
          {features.map(f => (
            <div className="card" key={f.title}>
              <span className="card-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Coming Next</h2>
        <div className="card-grid">
          {roadmap.map(f => (
            <div className="card roadmap-card" key={f.title}>
              <span className="card-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
