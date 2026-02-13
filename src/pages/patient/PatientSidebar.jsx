import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./PatientSidebar.css";

const PatientSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/patient/dashboard", icon: "📊" },
    { name: "Appointments", path: "/patient/appointments", icon: "📅" },
    { name: "Doctors", path: "/patient/doctors", icon: "👨‍⚕️" },
    { name: "Medical Records", path: "/patient/records", icon: "📁" },
    { name: "Profile", path: "/patient/profile", icon: "👤" },
  ];

  return (
    <aside className={`patient-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h2 className="sidebar-logo">Patient Panel</h2>}
        <button 
          className="collapse-toggle" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <ul>
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              title={item.name}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!isCollapsed && <span className="link-text">{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PatientSidebar;