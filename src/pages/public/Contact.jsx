import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Contact.css";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <div className="header-brand" onClick={() => navigate("/")}>
          <h1>Doctor's Hub</h1>
        </div>
        <nav className="header-nav">
          <span className="nav-item" onClick={() => navigate("/about")}>About Us</span>
          <span className="nav-item" onClick={() => navigate("/blogs")}>Blogs</span>
          <span className="nav-item" onClick={() => navigate("/contact")}>Contact Us</span>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="login-link">Login</Link>
          <button className="signup-btn" onClick={() => navigate("/signup")}>SignUp</button>
        </div>
      </header>

      <main className="main-content">
        <section className="contact-main">
          <div className="contact-container-box">
            <div className="contact-text-side">
              <h2>Get in <span>Touch</span></h2>
              <p>Our team is here to help you 24/7.</p>
              <div className="contact-details">
                <p>📍 123 Health St, Mumbai</p>
                <p>📞 +91 (000) 000-0000</p>
              </div>
            </div>
            <form className="contact-form-side">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" rows="4" required></textarea>
              <button type="submit" className="primary-btn">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-left">
            <h2>Doctor's Hub</h2>
            <p>Elevating digital healthcare.</p>
          </div>
          <div className="footer-right">
            <p>© 2026 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;