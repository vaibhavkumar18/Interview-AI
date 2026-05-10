import React from "react";
import "../style/footer.scss";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>© {new Date().getFullYear()} ResumeGen — Built with care</p>
        <small>Made for consistent, modern UI.</small>
      </div>
    </footer>
  );
};

export default Footer;
