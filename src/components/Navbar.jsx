import React from "react";
import { Link } from "react-router-dom";
import "../style/navbar.scss";
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          ResumeGen
        </Link>
        <nav className="navbar__nav">
          <Link to="/" className="navbar__link">
            Home
          </Link>
          <Link to="/interview/create" className="navbar__link">
            Create
          </Link>
          <Link to="/login" className="navbar__link">
            Login
          </Link>
          <Link to="/register" className="navbar__link navbar__link--cta">
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
