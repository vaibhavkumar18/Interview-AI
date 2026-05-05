import React, { useState } from "react";
import "../style/login.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
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
            <p>Logging you in...</p>
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
          <h1>Accelerate your career momentum.</h1>
          <p>
            Master the high-stakes world of corporate interviews with AI-driven
            precision and personalized performance analytics.
          </p>
          <div className="auth-hero-visual">
            <div style={{ textAlign: "center", width: "100%" }}>
              <p style={{ marginBottom: "1rem" }}>Welcome back to ResumeGen</p>
              <p style={{ fontSize: "0.9rem" }}>
                Your interview preparation portal awaits
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="auth-form-section">
          <div className="auth-card">
            <h2>Welcome back</h2>
            <p>Access your interview preparation portal.</p>

            <form onSubmit={handleSubmit} className="auth-form">
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
                Login →
              </button>
            </form>

            <div className="auth-divider">OR CONTINUE WITH</div>

            <div className="auth-social">
              <button type="button" className="social-button">
                Google
              </button>
              <button type="button" className="social-button">
                LinkedIn
              </button>
            </div>

            <div className="auth-footer">
              Don't have an account?{" "}
              <Link to="/register">Sign up for free</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
