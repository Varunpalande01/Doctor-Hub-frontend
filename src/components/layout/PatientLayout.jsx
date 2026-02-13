// src/components/layout/PatientLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import PatientSidebar from "../../pages/patient/PatientSidebar";
import PatientHeader from "../../pages/patient/PatientHeader";
import "./PatientLayout.css";
import Footer from "./Footer";
import "../../assets/css/theme.css";

const PatientLayout = () => {
  return (
    <div className="patient-layout">
      <PatientSidebar />
      <div className="patient-main">
        <PatientHeader />
        <div className="patient-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};


export default PatientLayout;
