import React from "react";
import "../style/footer.scss";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>© {new Date().getFullYear()} InterviewAI </p>
        <small>Made By Vaibhav.</small>
      </div>
    </footer>
  );
};

export default Footer;
