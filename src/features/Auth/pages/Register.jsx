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
    const success = await handleRegister({ username, email, password });

    if (success) {
      navigate("/");
    }
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
    <main className="auth-layout register-layout">
      <div className="auth-card register-card">
        <div className="login-header">
          <span className="login-badge">Start here</span>
          <h1>Create your account</h1>
          <p>Join the workspace and begin building your resume with AI support.</p>
        </div>

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

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
