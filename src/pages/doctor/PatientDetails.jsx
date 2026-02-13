import React, { useState } from "react";
import "./PatientDetails.css";
import AddVisitModal from "./AddVisitModal";
import AddPrescriptionModal from "./AddPrescriptionModal";
import AddReportModal from "./AddReportModal";
import { useParams } from "react-router-dom";

const PatientDetails = () => {
  const { patientId } = useParams();

  // Dummy patient (API later)
  const patient = {
    id: patientId || "P-1023",
    name: "Rahul Sharma",
    age: 34,
    gender: "Male",
    phone: "9876543210",
  };

  const [activeTab, setActiveTab] = useState("visits");
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Dummy data (API later)
  const visits = [
    {
      id: 1,
      date: "10 Jan 2026",
      complaint: "Fever",
      notes: "Paracetamol advised",
    },
  ];

  const prescriptions = [
    {
      id: 1,
      date: "10 Jan 2026",
      medicines: "Paracetamol 500mg – 5 days",
    },
  ];

  const reports = [
    {
      id: 1,
      date: "11 Jan 2026",
      name: "Blood Test Report",
    },
  ];

  const appointments = [
    {
      id: 1,
      date: "10 Jan 2026",
      time: "10:00 AM",
      status: "Completed",
    },
  ];

  return (
    <div className="patient-details-page">
      {/* LEFT SUMMARY */}
      <div className="patient-summary">
        <div className="avatar">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <h3>{patient.name}</h3>
        <p>ID: {patient.id}</p>
        <p>Age: {patient.age}</p>
        <p>Gender: {patient.gender}</p>
        <p>Phone: {patient.phone}</p>
      </div>

      {/* RIGHT RECORDS */}
      <div className="patient-records">
        {/* Tabs */}
        <div className="patient-tabs">
          {["visits", "prescriptions", "reports", "appointments"].map(
            (tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* CONTENT */}
        <div className="tab-content">
          {/* VISITS */}
          {activeTab === "visits" && (
            <>
              <div className="tab-header">
                <h3>Visit History</h3>
                <button
                  className="add-btn"
                  onClick={() => setShowVisitModal(true)}
                >
                  + Add Visit
                </button>
              </div>

              {visits.map((v) => (
                <div key={v.id} className="card">
                  <strong>{v.date}</strong>
                  <p>Complaint: {v.complaint}</p>
                  <p>Notes: {v.notes}</p>
                </div>
              ))}
            </>
          )}

          {/* PRESCRIPTIONS */}
          {activeTab === "prescriptions" && (
            <>
              <div className="tab-header">
                <h3>Prescriptions</h3>
                <button
                  className="add-btn"
                  onClick={() => setShowPrescriptionModal(true)}
                >
                  + Add Prescription
                </button>
              </div>

              {prescriptions.length === 0 ? (
                <div className="empty-state">No prescriptions added yet</div>
              ) : (
                prescriptions.map((p) => (
                  <div key={p.id} className="card">
                    <strong>{p.date}</strong>
                    <p>{p.medicines}</p>
                  </div>
                ))
              )}
            </>
          )}

          {/* REPORTS */}
          {activeTab === "reports" && (
            <>
              <div className="tab-header">
                <h3>Medical Reports</h3>
                <button
                  className="add-btn"
                  onClick={() => setShowReportModal(true)}
                >
                  + Add Report
                </button>
              </div>

              {reports.length === 0 ? (
                <div className="empty-state">No reports added yet</div>
              ) : (
                reports.map((r) => (
                  <div key={r.id} className="card">
                    <strong>{r.date}</strong>
                    <p>{r.name}</p>
                  </div>
                ))
              )}
            </>
          )}

          {/* APPOINTMENTS */}
          {activeTab === "appointments" && (
            <>
              {appointments.map((a) => (
                <div key={a.id} className="card">
                  <strong>{a.date}</strong>
                  <p>
                    {a.time} – {a.status}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showVisitModal && (
        <AddVisitModal onClose={() => setShowVisitModal(false)} />
      )}

      {showPrescriptionModal && (
        <AddPrescriptionModal
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}

      {showReportModal && (
        <AddReportModal onClose={() => setShowReportModal(false)} />
      )}
    </div>
  );
};

export default PatientDetails;
