// src/pages/patient/Dashboard.jsx
import React from "react";
import "./Dashboard.css";

const patientDashboardData = {
  stats: {
    upcomingAppointments: 3,
    completedAppointments: 15,
    pendingReports: 2,
  },
  appointments: [
    { doctor: "Dr. Aisha Khan", date: "2026-02-05", time: "10:00 AM" },
    { doctor: "Dr. Raj Verma", date: "2026-02-07", time: "02:30 PM" },
    { doctor: "Dr. Priya Sharma", date: "2026-02-10", time: "11:00 AM" },
  ],
  notifications: [
    "Your lab report is ready",
    "New doctor assigned for consultation",
    "Appointment reminder for 2026-02-05",
  ],
};

const Dashboard = () => {
  const { stats, appointments, notifications } = patientDashboardData;

  return (
    <div className="patient-dashboard">
      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Upcoming Appointments</h3>
          <p>{stats.upcomingAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Appointments</h3>
          <p>{stats.completedAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Reports</h3>
          <p>{stats.pendingReports}</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="appointments-section">
        <h2>Upcoming Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, i) => (
              <tr key={i}>
                <td>{app.doctor}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications */}
      <div className="notifications-section">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
