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
        <SonnerToaster />

        {hiddenDash && (
          <div className="flex ">
            <div className="flex sticky top-0 h-full  ">
              <Sidebar navbar={navbar} />
            </div>
            <div className="flex w-full bg-[#013A63]/5 overflow-hidden hover:overflow-y-scroll">
              {React.cloneElement(children)}
            </div>
          </div>
        )}
    </>
  );
};

export default DashboardLayout;
