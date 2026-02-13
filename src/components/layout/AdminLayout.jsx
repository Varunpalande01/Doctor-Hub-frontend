// src/components/layout/AdminLayout.jsx
import React, { useState } from "react";
import AdminSidebar from "../../pages/admin/AdminSidebar";
import AdminHeader from "../../pages/admin/AdminHeader";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="admin-content">
          <Outlet context={{ searchValue }} />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
