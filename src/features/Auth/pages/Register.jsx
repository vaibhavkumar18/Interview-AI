import React, { useState } from "react";
import "../style/register.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main className="auth-layout">
        <div
          className="auth-content"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="spinner" aria-label="Loading"></div>
            <p>Creating your account...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-layout">
      <div className="auth-content">
        {/* Left side - Hero content */}
        <div className="auth-hero">
          <h1>Master your future.</h1>
          <p>
            Join over 10,000 professionals using AI to simulate real-world
            interviews and land their dream jobs.
          </p>
          <div
            className="auth-hero-visual"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div
              style={{
                padding: "1rem",
                borderRadius: "0.6rem",
                background: "rgba(0, 194, 168, 0.1)",
                border: "1px solid rgba(0, 194, 168, 0.2)",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                🚀
              </div>
              <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                Accelerated Learning
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                Personalized feedback loops
              </p>
            </div>
            <div
              style={{
                padding: "1rem",
                borderRadius: "0.6rem",
                background: "rgba(255, 111, 97, 0.1)",
                border: "1px solid rgba(255, 111, 97, 0.2)",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                📊
              </div>
              <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>Data Driven</p>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                Performance analytics insights
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className="auth-form-section">
          <div className="auth-card">
            <h2>Create Account</h2>
            <p>Start your journey to interview mastery.</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="username">Full Name</label>
                <input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-button">
                Create Account
              </button>
            </form>

            <div className="auth-divider">OR SIGN UP WITH</div>

            <div className="auth-social">
              <button type="button" className="social-button">
                Google
              </button>
              <button type="button" className="social-button">
                LinkedIn
              </button>
            </div>

            <div className="auth-footer">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
