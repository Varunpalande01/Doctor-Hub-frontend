// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Appointments.css";

// const Appointments = () => {
//   const navigate = useNavigate();

//   // TEMP – later from backend
//   const profileCompleted = true; // change to false to test lock

//   const [appointments, setAppointments] = useState([
//     {
//       id: 1,
//       patient: "Rahul Sharma",
//       time: "10:00 AM",
//       status: "PENDING",
//     },
//     {
//       id: 2,
//       patient: "Anita Verma",
//       time: "11:30 AM",
//       status: "APPROVED",
//     },
//   ]);

//   const updateStatus = (id, newStatus) => {
//     setAppointments((prev) =>
//       prev.map((a) =>
//         a.id === id ? { ...a, status: newStatus } : a
//       )
//     );
//   };

//   return (
//     <div className="doctor-page">
//       <h3>Appointments</h3>

//       <table className="doctor-table">
//         <thead>
//           <tr>
//             <th>Patient</th>
//             <th>Time</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {appointments.map((a) => (
//             <tr key={a.id}>
//               <td>{a.patient}</td>
//               <td>{a.time}</td>
//               <td>{a.status}</td>
//               <td className="actions">
//                 {/* VIEW – ALWAYS ENABLED */}
//                 <button
//                   className="view-btn"
//                   onClick={() => navigate(`/doctor/appointments/${a.id}`)}
//                 >
//                   View
//                 </button>

//                 {/* APPROVE */}
//                 <button
//                   disabled={!profileCompleted || a.status !== "PENDING"}
//                   onClick={() => updateStatus(a.id, "APPROVED")}
//                 >
//                   Approve
//                 </button>

//                 {/* REJECT */}
//                 <button
//                   disabled={!profileCompleted || a.status !== "PENDING"}
//                   onClick={() => updateStatus(a.id, "REJECTED")}
//                 >
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {!profileCompleted && (
//         <p className="warning-text">
//           Complete your profile to approve or reject appointments.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Appointments;

import React, { useState } from "react";
import "./Appointments.css";
import AddAppointmentModal from "./AddAppointmentModal";

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data
  const appointmentsData = [
    { id: 1, name: "Rahul Sharma", time: "10:00 AM", status: "PENDING" },
    { id: 2, name: "Anita Verma", time: "11:30 AM", status: "APPROVED" },
    { id: 3, name: "Sunil Gupta", time: "01:00 PM", status: "REJECTED" },
  ];

  return (
    <div className="appointments-page-wrapper">
      {/* HEADER SECTION */}
      <div className="page-header-flex">
        <h2 className="appointments-title">My Appointments</h2>
        <button className="btn-view" style={{padding: '10px 20px', borderRadius: '8px'}} onClick={() => setIsModalOpen(true)}>
          + New Appointment
        </button>
      </div>

      {/* --- DESKTOP VIEW (TABLE) --- */}
      <div className="desktop-view-container">
        <table className="modern-doctor-table">
          <thead>
            <tr>
              <th>PATIENT NAME</th>
              <th>APPOINTMENT TIME</th>
              <th>CURRENT STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {appointmentsData.map((app) => (
              <tr key={app.id}>
                <td className="patient-cell">{app.name}</td>
                <td><span className="time-tag">{app.time}</span></td>
                <td>
                  <span className={`status-pill ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn-view">View</button>
                  <button className="btn-approve" disabled={app.status === "APPROVED"}>Approve</button>
                  <button className="btn-reject" disabled={app.status === "REJECTED"}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW (CARDS) --- */}
      <div className="mobile-view-container">
        {appointmentsData.map((app) => (
          <div key={app.id} className="appointment-card-mobile">
            <div className="card-top">
              <div className="card-user-info">
                <h4>{app.name}</h4>
                <p><span className="time-tag">{app.time}</span></p>
              </div>
              <span className={`status-pill ${app.status.toLowerCase()}`}>
                {app.status}
              </span>
            </div>
            
            <div className="card-footer-btns">
              <button className="m-btn view">View Details</button>
              <div className="m-action-row">
                <button className="m-btn approve" disabled={app.status === "APPROVED"}>Approve</button>
                <button className="m-btn reject" disabled={app.status === "REJECTED"}>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL INTEGRATION */}
      {isModalOpen && (
        <AddAppointmentModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Appointments;