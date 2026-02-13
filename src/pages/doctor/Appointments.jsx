import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";

const Appointments = () => {
  const navigate = useNavigate();

  // TEMP – later from backend
  const profileCompleted = true; // change to false to test lock

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Rahul Sharma",
      time: "10:00 AM",
      status: "PENDING",
    },
    {
      id: 2,
      patient: "Anita Verma",
      time: "11:30 AM",
      status: "APPROVED",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
  };

  return (
    <div className="doctor-page">
      <h3>Appointments</h3>

      <table className="doctor-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.patient}</td>
              <td>{a.time}</td>
              <td>{a.status}</td>
              <td className="actions">
                {/* VIEW – ALWAYS ENABLED */}
                <button
                  className="view-btn"
                  onClick={() => navigate(`/doctor/appointments/${a.id}`)}
                >
                  View
                </button>

                {/* APPROVE */}
                <button
                  disabled={!profileCompleted || a.status !== "PENDING"}
                  onClick={() => updateStatus(a.id, "APPROVED")}
                >
                  Approve
                </button>

                {/* REJECT */}
                <button
                  disabled={!profileCompleted || a.status !== "PENDING"}
                  onClick={() => updateStatus(a.id, "REJECTED")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!profileCompleted && (
        <p className="warning-text">
          Complete your profile to approve or reject appointments.
        </p>
      )}
    </div>
  );
};

export default Appointments;
