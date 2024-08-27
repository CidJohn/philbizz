import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const hiddenDash = location.pathname === "/dashboard" ? true : false;

  return (
    <>
      {hiddenDash && (
        <div className="flex flex-row">
          <div className="flex">
            <Sidebar />
          </div>
          <div className="flex">{React.cloneElement(children)}</div>      
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
