import React, { useState } from "react";
import "./DoctorHeader.css";
import { useNavigate, useLocation } from "react-router-dom";

const DoctorHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- current URL path
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Map routes to header titles
  const routeTitles = {
    "/doctor/dashboard": "Dashboard",
    "/doctor/appointments": "Appointments",
    "/doctor/patients": "Patients",
    "/doctor/reports": "Reports",
    "/doctor/profile": "Profile",
    "/doctor/availability": "Availability",
      "/doctor/notifications": "Notifications",


  };

  // Determine current header title based on route
  const headerTitle = routeTitles[location.pathname] || "Dashboard";

  return (
    <header className="doctor-header">
      {/* Left side: dynamic title */}
      <div className="doctor-header-left">
        <h2 className="doctor-dashboard-title">{headerTitle}</h2>
      </div>

      {/* Right side: avatar + doctor name */}
      <div className="doctor-profile" onClick={() => setOpen(!open)}>
        <img
          src="https://i.pravatar.cc/40"
          alt="Doctor"
          className="doctor-avatar"
        />
        <div className="doctor-name-wrapper">
          <span className="doctor-name-text">Dr. {user?.fullName || "Doctor"}</span>
          <span className="doctor-role-text">{user?.role || "Doctor"}</span>
        </div>

        {open && (
          <div className="doctor-dropdown">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/doctor/profile");
              }}
            >
              My Profile
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DoctorHeader;
