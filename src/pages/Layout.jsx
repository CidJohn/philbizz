import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import BusinessNavbar from "../components/BusinessNavbar/BusinessNavbar";
import { AuthProvider } from "../helper/auth/useAuthContext";

function Layout({ children, navbar }) {
  const location = useLocation();

  const hidden = location.pathname.includes("business");
  const hiddenDash = !location.pathname.includes("dashboard");

  if (navbar.navload) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <AuthProvider>
      {hiddenDash && (
        <div>
          {hidden && <BusinessNavbar />}
          <Navbar navbarData={navbar.navbar} hidden={hidden} />
          <div className="flex flex-row">
            <div className="flex-grow">{React.cloneElement(children)}</div>
          </div>
          <div className="">
            <div className=" ">
              <Footer />
            </div>
          </div>
        </div>
      )}
    </AuthProvider>
  );
}

export default Layout;
