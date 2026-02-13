import React, { useState } from "react";
import "./AddVisitModal.css";
import { useEffect } from "react";

const AddVisitModal = ({ onClose }) => {
  const [complaint, setComplaint] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    // UI ONLY for now
    console.log({ complaint, notes });
    onClose();
  };
useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        <h3>Add Patient Visit</h3>

        <label>Complaint</label>
        <input
          type="text"
          placeholder="Eg. Fever, Headache"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />

        <label>Doctor Notes</label>
        <textarea
          placeholder="Observations, diagnosis, advice"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVisitModal;
