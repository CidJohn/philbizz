import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";
import { useNavbarcontent } from "../helper/database/useNavbarcontent";
import Spinner from "../components/Spinner/Spinner";
import BusinessNavbar from "../components/BusinessNavbar/BusinessNavbar";
import { AuthProvider } from "../helper/auth/useAuthContext";

function Layout({ children }) {
  const location = useLocation();
  const { navbarData, loading } = useNavbarcontent();

  const hidden = location.pathname === "/business" ? true : false;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <AuthProvider>
      <div>
        {hidden && <BusinessNavbar />}
        <Navbar navbarData={navbarData} loading={loading} hidden={hidden} />
        <div className="flex flex-row">
          <div className="flex-grow">{React.cloneElement(children)}</div>
        </div>
        <div className="   ">
          <div className=" ">
            <Footer />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default Layout;
