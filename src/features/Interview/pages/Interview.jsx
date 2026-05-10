import React, { useState } from 'react'
import "../style/interview.scss"
import { useInterview } from '../hooks/useInterview';


const Interview = () => {
  const [tab, setTab] = useState('technical')
  const [openIndex, setOpenIndex] = useState(null)
  const { interviewReport, getResumePDF, loading, loadingMessage } = useInterview();
  const report = interviewReport || {}

  if (loading) {
    return (
      <main className='loading-screen'>
        <div className='spinner' aria-label='Loading'></div>
        <p>{loadingMessage || 'Loading your interview report...'}</p>
      </main>
    )
  }
  const renderQuestions = (list = []) => (
    <div className='qa-list'>
      {list.map((q, idx) => {
        const key = `${tab}-${idx}`
        const isOpen = openIndex === key
        return (
          <div className='question-card' key={key}>
            <button
              type='button'
              className='question-card__trigger'
              onClick={() => setOpenIndex(isOpen ? null : key)}
              aria-expanded={isOpen}
              aria-controls={`answer-${key}`}
            >
              <div className='question-card__head'>
                <div className='question-card__num'>Q{String(idx + 1).padStart(2, '0')}</div>
                <div className='question-card__title'>{q.question}</div>
                <span className='question-card__toggle' aria-hidden='true'>
                  {isOpen ? '▴' : '▾'}
                </span>
              </div>

              <div className='question-card__meta'>
                <span className='pill pill--intent'>INTENTION</span>
                <span className='pill pill--model'>MODEL ANSWER</span>
              </div>

              <div className='question-card__intention'>{q.intention}</div>
            </button>

            {isOpen && (
              <div id={`answer-${key}`} className='question-card__answer'>
                <div className='pill pill--model small'>MODEL ANSWER</div>
                <p>{q.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <main className='interview route-container'>
      <div className='interview__card'>
        <aside className='interview__side interview__side--left' aria-label='Sections'>
          <nav>
            <ul>
              <li className={tab === 'technical' ? 'is-active' : ''} onClick={() => { setTab('technical'); setOpenIndex(null); }}>Technical questions</li>
              <li className={tab === 'behavioral' ? 'is-active' : ''} onClick={() => { setTab('behavioral'); setOpenIndex(null); }}>Behavioral questions</li>
              <li className={tab === 'roadmap' ? 'is-active' : ''} onClick={() => { setTab('roadmap'); setOpenIndex(null); }}>Road Map</li>
            </ul>
          </nav>

          <div className='interview__resume-action'>
            <button
              type='button'
              className='button primary-button interview__resume-button'
              onClick={() => getResumePDF(report._id)}
              disabled={!report._id || loading}
            >
              <svg className='interview__resume-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
                <path d='M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z'></path>
              </svg>
              <span>Download Resume</span>
            </button>
          </div>
        </aside>

        <section className='interview__main' aria-label='Main content'>
          {tab === 'technical' && renderQuestions(report.technicalQuestions)}
          {tab === 'behavioral' && renderQuestions(report.behavioralQuestions)}

          {tab === 'roadmap' && (
            <div className='roadmap'>
              {(report.preparationPlan || []).map((p, i) => (
                <div className='roadmap-day' key={i}>
                  <h4>Day {p.day} — {p.focus}</h4>
                  <ul>
                    {p.tasks.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

        </section>

        <aside className='interview__side interview__side--right' aria-label='Skill gaps'>
          <div className='match-score match-score--donut' aria-hidden='true'>
            <div className='donut' style={{ background: `conic-gradient(#2ecc71 ${(report.matchScore || 0) * 3.6}deg, rgba(255,255,255,0.06) 0deg)` }}>
              <div className='donut__center'>{report.matchScore || 0}%</div>
            </div>
            <div className='match-score__note'>Strong match for this role</div>
          </div>

          <div className='skill-header'>
            <h3>Skill Gaps</h3>
          </div>

          <div className='skill-list'>
            {(report.skillGaps || []).map((s, i) => (
              <span className={`chip chip--${(s.severity || 'low').toLowerCase()}`} key={i}>{s.skill}</span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Interview
