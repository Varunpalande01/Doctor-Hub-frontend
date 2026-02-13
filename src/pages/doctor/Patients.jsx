import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Patients.css";

const Patients = () => {
  const navigate = useNavigate();

  // Dummy data (will replace with API later)
  const [patients, setPatients] = useState([
    { id: "P-1001", name: "Rahul Sharma", phone: "9876543210", age: 34, gender: "Male" },
    { id: "P-1002", name: "Priya Verma", phone: "9123456780", age: 28, gender: "Female" },
    { id: "P-1003", name: "Aman Gupta", phone: "9988776655", age: 45, gender: "Male" },
    { id: "P-1004", name: "Neha Singh", phone: "9871234560", age: 30, gender: "Female" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [genderFilter, setGenderFilter] = useState("All");
  const [ageSort, setAgeSort] = useState("None");

  // Live filtering and sorting
  useEffect(() => {
    let temp = [...patients];

    // Filter by gender
    if (genderFilter !== "All") {
      temp = temp.filter(p => p.gender === genderFilter);
    }

    // Filter by search term
    if (searchTerm) {
      temp = temp.filter(
        p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.phone.includes(searchTerm)
      );
    }

    // Sort by age
    if (ageSort === "LowToHigh") {
      temp.sort((a, b) => a.age - b.age);
    } else if (ageSort === "HighToLow") {
      temp.sort((a, b) => b.age - a.age);
    }

    setFilteredPatients(temp);
  }, [searchTerm, genderFilter, ageSort, patients]);

  // Reset all filters
  const handleReset = () => {
    setSearchTerm("");
    setGenderFilter("All");
    setAgeSort("None");
  };

  // Highlight search text
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="highlight">{part}</span> : part
    );
  };

  return (
    <div className="patients-page">
      <h2>All Patients</h2>

      <div className="search-filter-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name, ID or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select value={ageSort} onChange={(e) => setAgeSort(e.target.value)}>
          <option value="None">Sort by Age</option>
          <option value="LowToHigh">Low → High</option>
          <option value="HighToLow">High → Low</option>
        </select>

        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="no-records">
          <p>No patients found</p>
        </div>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id}>
                <td>{highlightText(p.id)}</td>
                <td>{highlightText(p.name)}</td>
                <td>{highlightText(p.phone)}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/doctor/patients/${p.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Patients;
