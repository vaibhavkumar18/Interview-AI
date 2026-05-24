import React from "react";
import { Link } from "react-router-dom";
import "../style/home.scss";

const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "";
const previewImages = {
  interview: `${backendUrl}/images/Interview.png`,
  createInterview: `${backendUrl}/images/CreateInterview.png`,
};

const features = [
  {
    title: "Resume Analysis",
    description:
      "Scan your resume and job description to highlight the best-fit skills, gaps, and ATS opportunities.",
    tone: "resume",
  },
  {
    title: "Interview Simulation",
    description:
      "Practice with AI-generated interview questions that adapt to the role you are targeting.",
    tone: "simulation",
  },
  {
    title: "Personalized Feedback",
    description:
      "Get a concise report after every session with practical tips you can apply immediately.",
    tone: "feedback",
  },
];

const steps = [
  {
    number: "1",
    title: "Upload",
    description: "Add your resume and the role description you want to target.",
  },
  {
    number: "2",
    title: "Practice",
    description:
      "Run an AI interview simulation focused on the most relevant topics.",
  },
  {
    number: "3",
    title: "Improve",
    description:
      "Review the feedback, refine your answers, and try again when you are ready.",
  },
];

const Home = () => {
  return (
    <main className="home">
      <section className="home__shells">
        <header className="home__hero">
          <div className="home__hero-copy">
            <span className="home__eyebrow">Interview AI</span>
            <h1>Land your next role with simple AI guidance.</h1>
            <p>
              ResumeGen helps you review your resume, practice realistic
              interview questions, and get clear feedback without a heavy or
              confusing interface.
            </p>

            <div className="home__actions">
              <Link
                to="/interview/create"
                className="home__button home__button--primary"
              >
                Get Started Free
              </Link>
              
            </div>
          </div>

          <div className="home__preview" aria-label="Product preview">
            <img
              className="home__preview-image home__preview-image--tilted"
              src={previewImages.createInterview}
              alt="Interview strategy preview"
            />
          </div>
        </header>

        <section className="home__section">
          <div className="home__section-head home__section-head--left">
            <span className="home__eyebrow">How it helps</span>
            <h2>Everything you need, kept simple.</h2>
            <p>
              A straightforward workflow that focuses on what matters: your
              resume, your practice, and the feedback you can use right away.
            </p>
          </div>

          <div className="home__feature-grid">
            <article className="home__feature-card home__feature-card--large">
              <div className="home__feature-copy">
                <h3>{features[0].title}</h3>
                <p>{features[0].description}</p>
                <ul>
                  <li>Keyword optimization</li>
                  <li>Formatting score</li>
                </ul>
              </div>
          
            </article>

            <article className="home__feature-card home__feature-card--stacked">
              <div className="home__feature-copy">
                <h3>{features[1].title}</h3>
                <p>{features[1].description}</p>
              </div>

            </article>

            <article className="home__feature-card home__feature-card--wide">
              <div className="home__feature-metrics">
                <div>
                  <strong>94%</strong>
                  <span>User accuracy</span>
                </div>
                <div>
                  <strong>2.4x</strong>
                  <span>Faster placement</span>
                </div>
              </div>
              <div className="home__feature-copy home__feature-copy--flat">
                <h3>{features[2].title}</h3>
                <p>{features[2].description}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="home__section home__section--steps">
          <div className="home__section-head home__section-head--left home__section-head--compact">
            <span className="home__eyebrow">Three steps</span>
            <h2>A short path from upload to improvement.</h2>
          </div>

          <div className="home__steps">
            {steps.map((step) => (
              <article className="home__step" key={step.number}>
                <div className="home__step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home__cta">
          <div className="home__cta-copy">
            <h2>Ready to practice for the real interview?</h2>
            <p>
              Start with a clean workflow and get a focused report in minutes.
            </p>
          </div>
          <Link to="/interview/create" className="home__button home__button--primary">
            Get Started Free
          </Link>
        </section>
      </section>
    </main>
  );
};

export default Home;
