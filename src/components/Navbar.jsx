import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../style/navbar.scss";
import { useAuth } from "../features/Auth/hooks/useAuth";

const Navbar = () => {
  const context = useAuth();
  const { user, handleLogout } = context;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    closeMenu();

    const success = await handleLogout();

    setLoggingOut(false);

    if (success) {
      navigate("/login");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          InterviewAI
        </Link>
        <nav className="navbar__nav">
          <Link to="/" className="navbar__link">
            Home
          </Link>
          {user != null && (
            <>
              <Link to="/interview/create" className="navbar__link">
                Create
              </Link>
              <Link to="/interview/reports" className="navbar__link">
                Reports
              </Link>
              <button
                type="button"
                className="navbar__link navbar__link--cta navbar__link-button"
                onClick={handleLogoutClick}
                disabled={loggingOut}
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          )}
          {user == null && (
            <>
              <Link to="/login" className="navbar__link">
                Login
              </Link>
              <Link to="/register" className="navbar__link navbar__link--cta">
                Sign up
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(255,255,255,1)"
          >
            <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </button>

        {menuOpen && (
          <nav className="navbar__mobile-menu" aria-label="Mobile navigation">
            <Link to="/" className="navbar__mobile-link" onClick={closeMenu}>
              Home
            </Link>
            {user != null ? (
              <>
                <Link
                  to="/interview/create"
                  className="navbar__mobile-link"
                  onClick={closeMenu}
                >
                  Create
                </Link>
                <Link
                  to="/interview/reports"
                  className="navbar__mobile-link"
                  onClick={closeMenu}
                >
                  Reports
                </Link>
                <button
                  type="button"
                  className="navbar__mobile-link navbar__mobile-link--cta navbar__mobile-link-button"
                  onClick={handleLogoutClick}
                  disabled={loggingOut}
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__mobile-link" onClick={closeMenu}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="navbar__mobile-link navbar__mobile-link--cta"
                  onClick={closeMenu}
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        )}

        {loggingOut && (
          <div className="loading-screen overlay navbar__logout-loader" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true"></div>
            <p>Logging you out...</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
