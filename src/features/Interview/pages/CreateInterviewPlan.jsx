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
    <main className="create-interview-plan route-container">
      <div className="create-interview-plan__shell">
        <header className="create-interview-plan__hero">
          <p className="create-interview-plan__eyebrow">Create your interview strategy</p>
          <h1>Prepare for Your Interview</h1>
          <p className="create-interview-plan__subtitle">
            Share a job description and your resume to get a personalized
            interview preparation plan.
          </p>
        </header>

        <section className="create-interview-plan__card" aria-label="Interview strategy inputs">
          <div className="create-interview-plan__grid">
            <article className="create-interview-plan__panel create-interview-plan__panel--job">
              <div className="create-interview-plan__panel-head">
                <div>
                  <p className="create-interview-plan__panel-label">Job Description</p>
                  <h2>Paste the role details</h2>
                </div>
              </div>

              <label className="create-interview-plan__field create-interview-plan__field--textarea" htmlFor="jobDescription">
                <span className="create-interview-plan__field-sr-only">Job Description</span>
                <textarea
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                  }}
                  name="jobDescription"
                  id="jobDescription"
                  placeholder="Paste the full job description here..."
                ></textarea>
              </label>

              <div className="create-interview-plan__panel-footnote">
                <span>{jobDescription.length} / 5000 chars</span>
              </div>
            </article>

            <article className="create-interview-plan__panel create-interview-plan__panel--profile">
              <div className="create-interview-plan__panel-head">
                <div>
                  <p className="create-interview-plan__panel-label">Your Profile</p>
                  <h2>Upload your resume</h2>
                </div>
              </div>

              <div className="create-interview-plan__profile-upload">
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                />
                <label className="create-interview-plan__profile-upload-dropzone" htmlFor="resume">
                  <span className="create-interview-plan__profile-upload-icon" aria-hidden="true">
                    <span></span>
                  </span>
                  <strong>Click to upload or drag & drop</strong>
                  <small>PDF or DOCX, max 5MB</small>
                </label>
              </div>

              <div className="create-interview-plan__panel-divider">
                <span>or</span>
              </div>

              <div className="create-interview-plan__field-group">
                <label className="create-interview-plan__field-label" htmlFor="selfDescription">
                  Quick description
                </label>
                <label
                  className="create-interview-plan__field create-interview-plan__field--textarea create-interview-plan__field--compact"
                  htmlFor="selfDescription"
                >
                  <span className="create-interview-plan__field-sr-only">Self Description</span>
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

              <div className="create-interview-plan__panel-alert" role="note">
                <span className="create-interview-plan__panel-alert-dot" aria-hidden="true"></span>
                Either a resume or description is required.
              </div>
            </article>
          </div>

          {/* Recent Reports List */}
          

          <footer className="create-interview-plan__actions">
            <div className="create-interview-plan__meta">
              <span>AI-powered strategy</span>
              <span>~30 seconds</span>
            </div>

            <button
              className="button primary-button create-interview-plan__submit"
              type="button"
              onClick={handleGenerateReport}
            >
              Generate Strategy
            </button>
          </footer>
        </section>
      </div>
      {showGeneratingOverlay && (
        <div className="loading-screen overlay create-interview-plan__overlay" role="status" aria-live="polite">
          <div className="spinner create-interview-plan__spinner" aria-hidden="true"></div>
          <p>Generating your personalized interview strategy...</p>
        </div>
      )}
    </main>
  );
};

export default CreateInterviewPlan;
