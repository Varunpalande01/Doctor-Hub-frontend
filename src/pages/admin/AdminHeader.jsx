// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminHeader.css";

// const AdminHeader = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//   };

//   const goToProfile = () => {
//     navigate("/admin/profile");
//     setOpen(false);
//   };

//   return (
//     <header className="admin-header">
//       <div className="admin-header-right">
//         <div className="profile-wrapper">
//           <span className="welcome-text">
//             👋 Welcome, {user?.fullName || "Admin"}
//           </span>
//           <img
//             src={user?.profileImg || "https://i.pravatar.cc/40"}
//             alt="Admin"
//             className="profile-img"
//             onClick={() => setOpen(!open)}
//           />

//           {open && (
//             <div className="profile-dropdown">
//               <p>{user?.fullName || "Admin"}</p>
//               <span>Admin</span>
//               <button onClick={goToProfile} className="profile-btn">
//                 Profile
//               </button>
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [open, setOpen] = useState(false);

  // Mapping paths to Page Titles
  const pageTitles = {
    "/admin/dashboard": "Dashboard Overview",
    "/admin/doctors": "Doctors Directory",
    "/admin/verify-doctors": "Pending Verifications",
    "/admin/users": "User Management",
    "/admin/profile": "My Profile",
    "/admin/settings": "System Settings",
  };

  const currentTitle = pageTitles[location.pathname] || "Admin Panel";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="admin-header">
      {/* 1. Dynamic Title on the Left */}
      <div className="admin-header-left">
        <h1 className="header-page-title">{currentTitle}</h1>
      </div>

      {/* 2. Profile Section on the Right */}
      <div className="admin-header-right">
        <div className="profile-wrapper" onClick={() => setOpen(!open)}>
          <span className="welcome-text">
            👋 Welcome, {user?.fullName || "Admin"}
          </span>
          <img
            src={user?.profileImg || "https://i.pravatar.cc/40"}
            alt="Admin"
            className="profile-img"
          />

          {/* 3. Dropdown Menu */}
          {open && (
            <div className="profile-dropdown">
              <div className="dropdown-info">
                <p className="dropdown-name">{user?.fullName || "Admin"}</p>
                <span className="dropdown-role">Administrator</span>
              </div>
              <hr className="dropdown-divider" />
              <button 
                onClick={() => { navigate("/admin/profile"); setOpen(false); }} 
                className="profile-btn"
              >
                Profile
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;