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
    const success = await handleLogin({ email, password });

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
            <p>Logging you in...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-layout login-layout">
      <div className="auth-card login-card">
        <div className="login-header">
          <span className="login-badge">Welcome back</span>
          <h1>Login to your account</h1>
          <p>Continue where you left off and keep building your resume.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
