// src/pages/patient/PatientHeader.jsx
import React, { useState } from "react";
import "./PatientHeader.css";

const PatientHeader = () => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/"; // redirect to Home page
  };

  return (
    <header className="patient-header">
      <h2>Patient Dashboard</h2>
      <div className="profile-area">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          onClick={() => setOpen(!open)}
          className="profile-img"
        />
        {open && (
          <div className="profile-dropdown">
            <p>{user?.fullName}</p>
            <span>{user?.role}</span>
            <hr />
            <a href="/patient/profile">Update Profile</a>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PatientHeader;
