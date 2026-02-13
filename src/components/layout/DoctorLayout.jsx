  import React from "react";
  import { Outlet } from "react-router-dom";
  import DoctorHeader from "../../pages/doctor/DoctorHeader";
  import DoctorSidebar from "../../pages/doctor/DoctorSidebar";
  import "../../assets/css/theme.css";
  import "./DoctorLayout.css";

  const DoctorLayout = () => {
    return (
      <div className="doctor-layout">
        <DoctorSidebar />

        <div className="doctor-main">
          <DoctorHeader />

          <div className="doctor-content">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  export default DoctorLayout;
