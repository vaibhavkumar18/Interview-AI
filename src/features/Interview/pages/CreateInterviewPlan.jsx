import React from "react";
import { useState, useRef } from "react";
import "../style/createInterview.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const CreateInterviewPlan = () => {
  const { generateReport } = useInterview();
  const [generating, setGenerating] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    try {
      setGenerating(true)
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      navigate(`/interview/report/${data._id}`);
    } catch (err) {
      console.error(err)
      setGenerating(false)
    }
  };

  const showGeneratingOverlay = generating
  return (
    <main className="home route-container">
      <div className="home__shell">
        <header className="home__hero">
          <p className="home__eyebrow">Create your interview strategy</p>
          <h1>Prepare for Your Interview</h1>
          <p className="home__subtitle">
            Share a job description and your resume to get a personalized
            interview preparation plan.
          </p>
        </header>

        <section className="home__card" aria-label="Interview strategy inputs">
          <div className="home__grid">
            <article className="panel panel--job">
              <div className="panel__head">
                <div>
                  <p className="panel__label">Job Description</p>
                  <h2>Paste the role details</h2>
                </div>
              </div>

              <label className="field field--textarea" htmlFor="jobDescription">
                <span className="field__sr-only">Job Description</span>
                <textarea
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                  }}
                  name="jobDescription"
                  id="jobDescription"
                  placeholder="Paste the full job description here..."
                ></textarea>
              </label>

              <div className="panel__footnote">
                <span>{jobDescription.length} / 5000 chars</span>
              </div>
            </article>

            <article className="panel panel--profile">
              <div className="panel__head">
                <div>
                  <p className="panel__label">Your Profile</p>
                  <h2>Upload your resume</h2>
                </div>
              </div>

              <div className="profile-upload">
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                />
                <label className="profile-upload__dropzone" htmlFor="resume">
                  <span className="profile-upload__icon" aria-hidden="true">
                    <span></span>
                  </span>
                  <strong>Click to upload or drag & drop</strong>
                  <small>PDF or DOCX, max 5MB</small>
                </label>
              </div>

              <div className="panel__divider">
                <span>or</span>
              </div>

              <div className="field-group">
                <label className="field__label" htmlFor="selfDescription">
                  Quick description
                </label>
                <label
                  className="field field--textarea field--compact"
                  htmlFor="selfDescription"
                >
                  <span className="field__sr-only">Self Description</span>
                  <textarea
                    onChange={(e) => {
                      setSelfDescription(e.target.value);
                    }}
                    name="selfDescription"
                    id="selfDescription"
                    placeholder="Briefly describe your experience and skills..."
                  ></textarea>
                </label>
              </div>

              <div className="panel__alert" role="note">
                <span className="panel__alert-dot" aria-hidden="true"></span>
                Either a resume or description is required.
              </div>
            </article>
          </div>

          {/* Recent Reports List */}
          

          <footer className="home__actions">
            <div className="home__meta">
              <span>AI-powered strategy</span>
              <span>~30 seconds</span>
            </div>

            <button
              className="button primary-button home__submit"
              type="button"
              onClick={handleGenerateReport}
            >
              Generate Strategy
            </button>
          </footer>
        </section>
      </div>
      {showGeneratingOverlay && (
        <div className="loading-screen overlay" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <p>Generating your personalized interview strategy...</p>
        </div>
      )}
    </main>
  );
};

export default CreateInterviewPlan;
