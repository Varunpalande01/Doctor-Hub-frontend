// import React, { useState } from "react";
// import { adminDashboardData } from "../../utils/adminDashboardDummyData";
// import "./AdminDashboard.css";

// const AdminDashboard = () => {
//   const { stats, pendingDoctors, systemLogs } = adminDashboardData;
//   const [searchValue, setSearchValue] = useState("");

//   const getStatusClass = (status) => {
//     switch (status.toLowerCase()) {
//       case "pending":
//         return "status-pending";
//       case "verified":
//         return "status-verified";
//       case "rejected":
//         return "status-rejected";
//       default:
//         return "";
//     }
//   };

//   // Filter doctors based on search input
//   const filteredDoctors = pendingDoctors.filter((doc) =>
//     (doc.name || "").toLowerCase().includes(searchValue.toLowerCase())
//   );

//   return (
//     <div className="admin-dashboard">
//       {/* --- Search Bar --- */}
//       <div className="dashboard-search">
//         <input
//           type="text"
//           placeholder="Search doctors..."
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//         />
//       </div>

//       {/* --- Stats Cards --- */}
//       <div className="stats-cards">
//         <div className="stat-card">
//           <div className="stat-icon">🧑‍⚕️</div>
//           <div>
//             <h3>Total Doctors</h3>
//             <p>{stats.totalDoctors}</p>
//             <small className="stat-change">+3% this month</small>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">👨‍👩‍👦</div>
//           <div>
//             <h3>Total Patients</h3>
//             <p>{stats.totalPatients}</p>
//             <small className="stat-change">+5% this month</small>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">📅</div>
//           <div>
//             <h3>Total Appointments</h3>
//             <p>{stats.totalAppointments}</p>
//             <small className="stat-change">+2% this month</small>
//           </div>
//         </div>
//       </div>

//       {/* --- Pending Doctors Section --- */}
//       <div className="pending-section">
//         <h2>Doctors Awaiting Verification</h2>
//         {filteredDoctors.length === 0 ? (
//           <p>No pending verifications</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Doctor Name</th>
//                 <th>Specialty</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredDoctors.map((doc) => (
//                 <tr key={doc.id}>
//                   <td>{doc.name}</td>
//                   <td>{doc.specialty}</td>
//                   <td className={getStatusClass(doc.status)}>{doc.status}</td>
//                   <td className="action-buttons">
//                     <button className="verify-btn">Verify</button>
//                     <button className="reject-btn">Reject</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* --- System Logs --- */}
//       <div className="logs-section">
//         <h2>System Logs</h2>
//         <ul className="logs-list">
//           {systemLogs.map((log) => (
//             <li key={log.id} className={`log-item ${log.type}`}>
//               <div className="log-content">
//                 <span className="log-action">{log.action}</span>
//                 <span className="log-user"> by {log.user}</span>
//               </div>
//               <div className="log-time">{log.time}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState } from "react";
import { adminDashboardData } from "../../utils/adminDashboardDummyData";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { stats, pendingDoctors, systemLogs } = adminDashboardData;
  const [searchValue, setSearchValue] = useState("");

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "status-pending";
      case "verified": return "status-verified";
      case "rejected": return "status-rejected";
      default: return "";
    }
  };

  const filteredDoctors = pendingDoctors.filter((doc) =>
    (doc.name || "").toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="admin-dashboard-wrapper">
      {/* Search Section */}
      <div className="dashboard-search-container">
        <input
          type="text"
          placeholder="Search doctors by name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Stats Section */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon-frame">🧑‍⚕️</div>
          <div className="stat-info">
            <h3>Total Doctors</h3>
            <p>{stats.totalDoctors}</p>
            <small className="trend-up">+3% this month</small>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon-frame">👨‍👩‍👦</div>
          <div className="stat-info">
            <h3>Total Patients</h3>
            <p>{stats.totalPatients}</p>
            <small className="trend-up">+5% this month</small>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon-frame">📅</div>
          <div className="stat-info">
            <h3>Appointments</h3>
            <p>{stats.totalAppointments}</p>
            <small className="trend-up">+2% this month</small>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="admin-section-card">
        <h2 className="section-header">Doctors Awaiting Verification</h2>
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Specialty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.length === 0 ? (
                <tr><td colSpan="4" style={{textAlign: 'center'}}>No pending verifications</td></tr>
              ) : (
                filteredDoctors.map((doc) => (
                  <tr key={doc.id}>
                    <td className="font-bold">{doc.name}</td>
                    <td>{doc.specialty}</td>
                    <td><span className={`status-text ${getStatusClass(doc.status)}`}>{doc.status}</span></td>
                    <td>
                      <div className="admin-action-group">
                        <button className="btn-verify">Verify</button>
                        <button className="btn-reject">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logs Section */}
      <div className="admin-section-card">
        <h2 className="section-header">System Logs</h2>
        <div className="logs-scroll-box">
          <ul className="admin-logs-list">
            {systemLogs.map((log) => (
              <li key={log.id} className={`admin-log-item ${log.type}`}>
                <div className="log-main">
                  <span className="log-msg"><strong>{log.action}</strong> by {log.user}</span>
                  <span className="log-ts">{log.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;