import React, { useState } from "react";
import "./Doctors.css";

const initialDoctors = [
  { id: 1, name: "Dr. John Doe", specialty: "Cardiology", email: "john@example.com", phone: "123-456-7890", gender: "Male", status: "pending", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Dr. Jane Smith", specialty: "Neurology", email: "jane@example.com", phone: "987-654-3210", gender: "Female", status: "verified", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Dr. Alex Brown", specialty: "Dermatology", email: "alex@example.com", phone: "555-123-4567", gender: "Male", status: "rejected", image: "https://via.placeholder.com/150" },
];

const Doctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter ? doc.gender === genderFilter : true;
    const matchesStatus = statusFilter ? doc.status === statusFilter : true;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleDelete = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  const handleSave = () => {
    setDoctors(doctors.map((doc) => (doc.id === modalData.id ? modalData : doc)));
    setModalData(null);
    setIsEdit(false);
  };

  return (
    <div className="doctors-page">
      <h2 className="page-header">Doctors Management</h2>

      {/* --- Dashboard-style search --- */}
      <div className="search-outer-container">
        <div className="search-inner-box">
          <input
            type="text"
            placeholder="Search doctors by name..."
            className="dashboard-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* --- Filters --- */}
      <div className="doctors-filters-row">
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* --- Table --- */}
      <table className="doctors-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Email</th>
            <th>Specialty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doc) => (
            <tr key={doc.id} className="doctor-row">
              <td>
                <div className="doctor-info-cell">
                  <img src={doc.image} alt="" className="doctor-avatar" />
                  <span>{doc.name}</span>
                </div>
              </td>
              <td>{doc.email}</td>
              <td>{doc.specialty}</td>
              <td>
                <span className={`status-text status-${doc.status}`}>{doc.status}</span>
              </td>
              <td className="action-buttons">
                <button className="view-btn" onClick={() => { setModalData(doc); setIsEdit(false); }}>View</button>
                <button className="edit-btn" onClick={() => { setModalData(doc); setIsEdit(true); }}>Edit</button>
                <button className="delete-btn" onClick={() => { setModalData(doc); setIsEdit(false); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Modal --- */}
      {modalData && (
        <div className="modal-overlay" onClick={() => setModalData(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3>{isEdit ? "Edit Doctor" : "Doctor Details"}</h3>
            <div className="modal-body">
              <img src={modalData.image} alt="" className="modal-avatar" />
              <label>Name</label>
              <input type="text" value={modalData.name} disabled={!isEdit} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} />

              <label>Specialty</label>
              <input type="text" value={modalData.specialty} disabled={!isEdit} onChange={(e) => setModalData({ ...modalData, specialty: e.target.value })} />

              <label>Email</label>
              <input type="text" value={modalData.email} disabled={!isEdit} onChange={(e) => setModalData({ ...modalData, email: e.target.value })} />

              <label>Phone</label>
              <input type="text" value={modalData.phone} disabled={!isEdit} onChange={(e) => setModalData({ ...modalData, phone: e.target.value })} />

              <label>Gender</label>
              <input type="text" value={modalData.gender} disabled={!isEdit} />

              <label>Status</label>
              <select value={modalData.status} disabled={!isEdit} onChange={(e) => setModalData({ ...modalData, status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setModalData(null)}>Close</button>
              {isEdit && <button className="action-btn" onClick={handleSave}>Save Changes</button>}
              {!isEdit && <button className="action-btn" onClick={() => handleDelete(modalData.id)}>Delete</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
