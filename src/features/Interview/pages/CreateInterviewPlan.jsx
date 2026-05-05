import React from 'react'
import { useState, useRef } from 'react'
import "../style/createInterview.scss"
import { useInterview } from '../hooks/useInterview';
import { useNavigate } from 'react-router';


const CreateInterviewPlan = () => {
    const { loading, generateReport, interviewReports } = useInterview();
    const recentReports = Array.isArray(interviewReports)
        ? [...interviewReports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
        : [];

    const getScorePercentage = (score) => {
        if (score === null || score === undefined) return null;
        const n = Number(score);
        if (Number.isNaN(n)) return null;
        return n <= 1 ? Math.round(n * 100) : Math.round(n);
    };
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const resumeInputRef = useRef(null);
    const navigate = useNavigate();

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0];
        const data = await generateReport({ jobDescription, selfDescription, resumeFile });
        navigate(`/interview/report/${data._id}`);
    };

    if (loading) {
        return (
            <div className='loading-screen'>
                <div className='spinner' aria-label='Loading'></div>
                <p>Generating your personalized interview strategy...</p>
            </div>
        )
    }
    return (
        <main className='home route-container'>
            <div className='home__shell'>
                <header className='home__hero'>
                    <p className='home__eyebrow'>AI-powered interview planning</p>
                    <h1>Create Your Custom <span>Interview Plan</span></h1>
                    <p className='home__subtitle'>
                        Share a job description, attach your resume, and add a short self description to shape a focused interview strategy.
                    </p>
                </header>

                <section className='home__card' aria-label='Interview strategy inputs'>
                    <div className='home__grid'>
                        <article className='panel panel--job'>
                            <div className='panel__head'>
                                <div>
                                    <p className='panel__label'>Target Job Description</p>
                                    <h2>Paste the role details</h2>
                                </div>
                                <span className='panel__badge panel__badge--required'>Required</span>
                            </div>

                            <label className='field field--textarea' htmlFor='jobDescription'>
                                <span className='field__sr-only'>Job Description</span>
                                <textarea
                                    onChange={(e) => { setJobDescription(e.target.value) }}
                                    name='jobDescription'
                                    id='jobDescription'
                                    placeholder="Paste the full job description here...\nFor example: Senior Frontend Engineer with React, TypeScript, and system design experience."
                                ></textarea>
                            </label>

                            <div className='panel__footnote'>
                                <span>0 / 5000 chars</span>
                            </div>
                        </article>

                        <article className='panel panel--profile'>
                            <div className='panel__head'>
                                <div>
                                    <p className='panel__label'>Your Profile</p>
                                    <h2>Upload your context</h2>
                                </div>
                                <span className='panel__badge panel__badge--accent'>Best results</span>
                            </div>

                            <div className='profile-upload'>
                                <input ref={resumeInputRef} hidden type='file' id='resume' accept='.pdf,.doc,.docx' />
                                <label className='profile-upload__dropzone' htmlFor='resume'>
                                    <span className='profile-upload__icon' aria-hidden='true'>
                                        <span></span>
                                    </span>
                                    <strong>Click to upload or drag &amp; drop</strong>
                                    <small>PDF or DOCX, max 5MB</small>
                                </label>
                            </div>

                            <div className='panel__divider'>
                                <span>or</span>
                            </div>

                            <div className='field-group'>
                                <label className='field__label' htmlFor='selfDescription'>Quick self-description</label>
                                <label className='field field--textarea field--compact' htmlFor='selfDescription'>
                                    <span className='field__sr-only'>Self Description</span>
                                    <textarea
                                        onChange={(e) => { setSelfDescription(e.target.value) }}
                                        name='selfDescription'
                                        id='selfDescription'
                                        placeholder="Briefly describe your experience, key skills, and years of experience if you do not have a resume handy..."
                                    ></textarea>
                                </label>
                            </div>

                            <div className='panel__alert' role='note'>
                                <span className='panel__alert-dot' aria-hidden='true'></span>
                                Either a resume or a self description is required to generate a personalized plan.
                            </div>
                        </article>
                    </div>

                    {/* Recent Reports List */}
                    {recentReports.length > 0 && (
                        <div className='home__recent-reports'>
                            <h2>Your Recent Interview Plans</h2>
                            <ul className='report-list'>
                                {recentReports.map(report => {
                                    const pct = getScorePercentage(report.matchScore);
                                    const scoreClass = `report-list__score ${pct >= 75 ? 'report-list__score--high' : pct >= 50 ? 'report-list__score--mid' : 'report-list__score--low'}`;

                                    // Prefer explicit createdAt, fall back to ObjectId timestamp when available
                                    let createdAtDate = null;
                                    if (report && report.createdAt) {
                                        const d = new Date(report.createdAt);
                                        if (!isNaN(d.getTime())) createdAtDate = d;
                                    }

                                    if (!createdAtDate && report && report._id) {
                                        try {
                                            // ObjectId contains timestamp in the first 8 hex chars
                                            const ts = parseInt(String(report._id).substring(0, 8), 16);
                                            if (!Number.isNaN(ts)) createdAtDate = new Date(ts * 1000);
                                        } catch (e) {
                                            createdAtDate = null;
                                        }
                                    }

                                    const validDate = createdAtDate && !isNaN(createdAtDate.getTime());
                                    const formattedDate = validDate ? createdAtDate.toLocaleDateString() : 'Unknown date';
                                    const dateTimeAttr = validDate ? createdAtDate.toISOString() : '';

                                    return (
                                        <li key={report._id} className='report-list__item'>
                                            <a href={`/interview/report/${report._id}`} className='report-list__link' aria-label={report.title || 'Untitled Role'}>
                                                <div className='report-list__left'>
                                                    <span className='report-list__title report-list__title--highlight'>{report.title || 'Untitled Role'}</span>
                                                </div>

                                                <div className='report-list__meta'>
                                                    {pct != null && <span className={scoreClass}>{pct}% match</span>}
                                                    <time className='report-list__date' dateTime={dateTimeAttr}>Generated on {formattedDate}</time>
                                                </div>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}

                    <footer className='home__actions'>
                        <div className='home__meta'>
                            <span>AI-powered strategy generation</span>
                            <span>Approx. 30s</span>
                        </div>

                        <button className='button primary-button home__submit' type='button'
                            onClick={handleGenerateReport}
                        >
                            Generate My Interview Strategy
                        </button>
                    </footer>
                </section>

                <nav className='home__links' aria-label='Support links'>
                    <a href='#'>Privacy Policy</a>
                    <a href='#'>Terms of Service</a>
                    <a href='#'>Help Center</a>
                </nav>
            </div>
        </main>
    )
}

export default CreateInterviewPlan
