import React from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import '../style/allreports.scss'

const AllReports = () => {
  const { interviewReports, loading } = useInterview()
  const navigate = useNavigate()

  const getScorePercentage = (score) => {
    if (score === null || score === undefined) return null
    const n = Number(score)
    if (Number.isNaN(n)) return null
    return n <= 1 ? Math.round(n * 100) : Math.round(n)
  }

  if (loading) {
    return (
      <main className="loading-screen all-reports__loading">
        <div className="spinner" aria-label="Loading"></div>
        <p>Loading reports...</p>
      </main>
    )
  }

  const reports = Array.isArray(interviewReports) ? interviewReports : []

  return (
    <main className="all-reports route-container">
      <div className="all-reports__card">
        <header className="all-reports__head">
          <h2>Your Interview Reports</h2>
          <p className="muted">Click any report to view the full interview report</p>
        </header>

        {reports.length === 0 ? (
          <div className="all-reports__empty">No reports found.</div>
        ) : (
          <ul className="report-list">
            {reports.map((report) => {
              const pct = getScorePercentage(report.matchScore)

              let createdAtDate = null
              if (report && report.createdAt) {
                const d = new Date(report.createdAt)
                if (!isNaN(d.getTime())) createdAtDate = d
              }

              if (!createdAtDate && report && report._id) {
                try {
                  const ts = parseInt(String(report._id).substring(0, 8), 16)
                  if (!Number.isNaN(ts)) createdAtDate = new Date(ts * 1000)
                } catch {
                  createdAtDate = null
                }
              }

              const validDate = createdAtDate && !isNaN(createdAtDate.getTime())
              const formattedDate = validDate ? createdAtDate.toLocaleDateString() : 'Unknown date'

              return (
                <li key={report._id} className="report-list__item">
                  <button
                    type="button"
                    className="report-list__link"
                    onClick={() => navigate(`/interview/report/${report._id}`)}
                  >
                    <div className="report-list__left">
                      <span className="report-list__title">{report.title || 'Untitled Role'}</span>
                    </div>

                    <div className="report-list__meta">
                      {pct != null && <span className="report-list__score">{pct}% match</span>}
                      <time className="report-list__date">{formattedDate}</time>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </main>
  )
}

export default AllReports
