import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "../../helper/auth/useAuthContext";
import SonnerToaster from "../../components/Sonner/Sonner";

const DashboardLayout = ({ children, props }) => {
  const { navbar } = props;
  const location = useLocation();
  const hiddenDash = location.pathname.includes("dashboard");
  return (
    <>
      <AuthProvider>
        <SonnerToaster />

        {hiddenDash && (
          <div className="flex flex-row">
            <div className="flex sticky top-0 h-screen  ">
              <Sidebar navbar={navbar} />
            </div>
            <div className="flex w-full h-full bg-[#013A63]/5">
              {React.cloneElement(children)}
            </div>
          </div>
        )}
      </AuthProvider>
    </>
  );
};

export default DashboardLayout;
