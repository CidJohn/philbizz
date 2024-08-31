import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "../../helper/auth/useAuthContext";

const DashboardLayout = ({ children, props }) => {
  const {navbar} = props;
  const location = useLocation();
  const hiddenDash = location.pathname.includes("dashboard");
  return (
    <>
      <AuthProvider>
        {hiddenDash && (
          <div className="flex flex-row">
            <div className="flex">
              <Sidebar  navbar={navbar} />
            </div>
            <div className="flex">{React.cloneElement(children)}</div>
          </div>
        )}
      </AuthProvider>
    </>
  );
};

export default DashboardLayout;
