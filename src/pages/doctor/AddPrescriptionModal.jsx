import React, { useState, useEffect } from "react";
import "./AddPrescriptionModal.css";

const AddPrescriptionModal = ({ onClose }) => {
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleSave = () => {
    console.log({
      medicine,
      dosage,
      duration,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Add Prescription</h3>

        <label>Medicine Name</label>
        <input
          type="text"
          placeholder="Eg. Paracetamol"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
        />

        <label>Dosage</label>
        <input
          type="text"
          placeholder="Eg. 1 tablet twice a day"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />

        <label>Duration</label>
        <input
          type="text"
          placeholder="Eg. 5 days"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPrescriptionModal;
