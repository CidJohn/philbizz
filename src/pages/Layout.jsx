import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { AuthProvider, useAuth } from "../helper/auth/useAuthContext";
import Header from "../components/Header/Header";
import SonnerToaster from "../components/Sonner/Sonner";

function Layout(props) {
  const { children, navbar } = props;
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
    <>
      <SonnerToaster />

      {hiddenDash && (
        <div className="w-full">
          <Header hidden={hidden} />
          <Navbar navbarData={navbar.navbar} hidden={hidden} />
          <div className="w-full flex flex-row">
            <div className="flex-grow">{React.cloneElement(children)}</div>
          </div>
          <div className="">
            <div className="">
              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
