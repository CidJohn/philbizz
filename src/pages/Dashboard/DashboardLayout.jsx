import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "../../helper/auth/useAuthContext";
import SonnerToaster from "../../components/Sonner/Sonner";
import useStorage from "../../helper/storage/Storage";
import Lock from "../../components/Lock/Lock";
import Account from "../../helper/auth/access/account";

const DashboardLayout = ({ children, props }) => {
  const { navbar } = props;
  const location = useLocation();
  const { getStorage } = useStorage();
  const hiddenDash = location.pathname.includes("dashboard");
  const access = getStorage("user_identity");
  const [accessLevel, setAdminAccess] = useState()
  const account_level = Account();

  useEffect(() => {
    const adminAccess = access ? JSON.parse(access) : undefined;
    setAdminAccess(adminAccess)
  },[access])

  return (
    <>
      <SonnerToaster />

      {accessLevel && account_level[accessLevel.access] === account_level[2] ? (
        hiddenDash && (
          <div className="flex ">
            <div className="flex sticky top-0 h-full a ">
              <Sidebar navbar={navbar} />
            </div>
            <div className="flex w-full bg-[#013A63]/5 overflow-hidden hover:overflow-y-scroll">
              {React.cloneElement(children)}
            </div>
          </div>
        )
      ) : (
        <Lock />
      )}
    </>
  );
};

export default DashboardLayout;
