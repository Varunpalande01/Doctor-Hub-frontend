import React from "react";
import "./PendingVerifications.css"; // optional, create CSS later
import { adminDashboardData } from "../../utils/adminDashboardDummyData";
import DoctorCard from "../../components/common/DoctorCard";

const PendingVerifications = () => {
  const pendingDoctors = adminDashboardData.pendingDoctors;

  return (
    <div className="pending-verifications-page">
      <h2>Pending Doctor Verifications</h2>
      {pendingDoctors.length === 0 ? (
        <p>No pending verifications</p>
      ) : (
        <div className="doctor-cards">
          {pendingDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingVerifications;
