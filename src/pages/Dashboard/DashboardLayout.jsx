import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SonnerToaster from "../../components/Sonner/Sonner";
import useStorage from "../../helper/storage/Storage";
import { useAuth } from "../../helper/auth/useAuthContext";
import CryptoJS from "crypto-js";
import Spinner from "../../components/Spinner/Spinner";
import Lock from "../../components/Lock/Lock";

const DashboardLayout = ({ children, props }) => {
  const { navbar } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { getStorage } = useStorage();
  const hiddenLayout = location.pathname.includes("dashboard");
  const access_detail = getStorage("access_detail");
  const secretKey = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const [getAccessLevel, setAccessLevel] = useState(null);

  useEffect(() => {
    if (access_detail) {
      try {
        const bytes = CryptoJS.AES.decrypt(access_detail, secretKey);
        const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
        setAccessLevel(decryptedValue);
      } catch (error) {
        console.error("Decryption failed:", error);
        setAccessLevel(null);
      }
    }
  }, [access_detail, secretKey]);

  if (!getAccessLevel && hiddenLayout) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Lock /> 
      </div>
    );
  }

  return (
    <>
      <SonnerToaster />
      {getAccessLevel === "ADMIN"
        ? hiddenLayout && (
            <div className="flex ">
              <div className="flex sticky top-0 h-full a ">
                <Sidebar navbar={navbar} />
              </div>
              <div className="flex w-full bg-[#013A63]/5 overflow-hidden hover:overflow-y-scroll">
                {React.cloneElement(children)}
              </div>
            </div>
          )
        : hiddenLayout && <Lock />}
    </>
  );
};

export default DashboardLayout;
