// import React from "react";
// import "./Notifications.css";
// import { useNavigate } from "react-router-dom";
// import { useNotifications } from "../../hooks/useNotifications";

// const DoctorNotifications = () => {
//   const { notifications, markAsRead, removeNotification } = useNotifications();
//   const navigate = useNavigate();

//   const handleClick = (notification) => {
//     // Mark as read
//     markAsRead(notification.id);

//     // Remove from list (optional)
//     removeNotification(notification.id);

//     // Navigate based on type
//     switch (notification.type) {
//       case "APPOINTMENT":
//         navigate("/doctor/appointments");
//         break;
//       case "PATIENT":
//         navigate("/doctor/patients");
//         break;
//       case "PROFILE":
//         navigate("/doctor/profile");
//         break;
//       default:
//         navigate("/doctor/dashboard");
//     }
//   };

//   if (notifications.length === 0) {
//     return <p className="empty-text">No notifications</p>;
//   }

//   return (
//     <div className="doctor-notifications-page">
//       {notifications.map((n) => (
//         <div
//           key={n.id}
//           className={`notification-card ${n.isRead ? "read" : "unread"}`}
//           onClick={() => handleClick(n)}
//         >
//           {!n.isRead && <span className="notification-dot" />}
//           <p>{n.message}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DoctorNotifications;
// src/pages/doctor/Notifications.jsx

import React from "react";
import { useNotifications } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

const DoctorNotifications = () => {
  const { notifications, markAsRead, removeNotification } = useNotifications();
  const navigate = useNavigate();

  // Group notifications by type
  const grouped = notifications.reduce((acc, n) => {
    if (!acc[n.type]) acc[n.type] = [];
    acc[n.type].push(n);
    return acc;
  }, {});

  // Handle click
  const handleClick = (notification) => {
    markAsRead(notification.id);

    // Navigate depending on type
    switch (notification.type) {
      case "APPOINTMENT":
        navigate("/doctor/appointments");
        break;
      case "PATIENT":
        navigate("/doctor/patients");
        break;
      case "PROFILE":
        navigate("/doctor/profile");
        break;
      default:
        navigate("/doctor/dashboard");
    }

    // Remove after click
    removeNotification(notification.id);
  };

  return (
    <div className="doctor-notifications-page">
      {Object.keys(grouped).length === 0 && (
        <p className="empty-text">No notifications</p>
      )}

      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="notification-group">
          <h4 className="notification-group-heading">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h4>

          {items.map((n) => (
            <div
              key={n.id}
              className={`notification-card ${n.isRead ? "read" : "unread"}`}
              onClick={() => handleClick(n)}
            >
              <span
                className="notification-dot"
                style={{ backgroundColor: n.isRead ? "#aaa" : "#10b981" }}
              />
              <p>{n.message}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DoctorNotifications;

