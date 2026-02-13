// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./DoctorSidebar.css";
// import { useNotifications } from "../../hooks/useNotifications";

// const DoctorSidebar = () => {
//   const { unreadCount } = useNotifications();

//   const menu = [
//     { name: "Dashboard", path: "/doctor/dashboard" },
//     { name: "Appointments", path: "/doctor/appointments" },
//     { name: "Patients", path: "/doctor/patients" },
//     { name: "Availability", path: "/doctor/availability" },
//     { name: "Notifications", path: "/doctor/notifications" },
//   ];

//   return (
//     <aside className="doctor-sidebar">
//       <h2 className="doctor-logo">Doctor’s Hub</h2>

//       <ul className="doctor-menu">
//         {menu.map((item) => (
//           <li key={item.name}>
//             <NavLink
//               to={item.path}
//               className={({ isActive }) =>
//                 isActive ? "doctor-link active" : "doctor-link"
//               }
//             >
//               <span>{item.name}</span>
//               {item.name === "Notifications" && unreadCount > 0 && (
//                 <span className="notification-badge">{unreadCount}</span>
//               )}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default DoctorSidebar;


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./DoctorSidebar.css";
import { useNotifications } from "../../hooks/useNotifications";

const DoctorSidebar = () => {
  const { unreadCount } = useNotifications();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsCollapsed(true);
      else setIsCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menu = [
    { name: "Dashboard", path: "/doctor/dashboard", icon: "🏠" },
    { name: "Appointments", path: "/doctor/appointments", icon: "📅" },
    { name: "Patients", path: "/doctor/patients", icon: "🩺" },
    { name: "Availability", path: "/doctor/availability", icon: "⏲️" },
    { name: "Notifications", path: "/doctor/notifications", icon: "🔔" },
  ];

  return (
    <aside className={`doctor-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo-section">
          {!isCollapsed && <h2 className="doctor-logo">Doctor's Hub</h2>}
        </div>
        
        <button 
          className="menu-toggle-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Menu"
        >
          <div className={`hamburger ${isCollapsed ? "is-active" : ""}`}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </button>
      </div>

      <nav className="doctor-nav">
        <ul className="doctor-menu">
          {menu.map((item) => (
            <li key={item.name} className="menu-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "doctor-link active" : "doctor-link")}
              >
                <div className="link-content">
                  <span className="menu-icon">{item.icon}</span>
                  {!isCollapsed && <span className="menu-text">{item.name}</span>}
                </div>

                {item.name === "Notifications" && unreadCount > 0 && (
                  isCollapsed ? (
                    <span className="notification-dot"></span>
                  ) : (
                    <span className="notification-badge">{unreadCount}</span>
                  )
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DoctorSidebar;