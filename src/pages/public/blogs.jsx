import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./blogs.css";

const Blogs = () => {
  const navigate = useNavigate();
  const articles = [
    { title: "Mental Health in 2026", cat: "Wellness", date: "Feb 10" },
    { title: "The Future of Telemedicine", cat: "Tech", date: "Jan 28" },
    { title: "Top 5 Winter Superfoods", cat: "Diet", date: "Jan 15" }
  ];

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
        <section className="blogs-hero">
          <div className="section-header">
            <h2>Health <span>Insights</span></h2>
            <div className="accent-line"></div>
          </div>
        </section>

        <div className="blogs-grid-container">
          {articles.map((post, i) => (
            <div key={i} className="modern-doctor-card">
              <div className="card-img-wrapper" style={{background: '#d1fae5', height: '150px'}}></div>
              <div className="card-details">
                <span className="specialty-tag">{post.cat}</span>
                <h3>{post.title}</h3>
                <p className="experience-text">📅 {post.date}, 2026</p>
                <button className="book-mini-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
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

export default Blogs;