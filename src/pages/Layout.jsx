import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TreeView from "../components/Treeviews/Treeview";
import treeViewContent from "../content/treeViewContent";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";
import { useNavbarcontent } from "../helper/database/useNavbarcontent";
import Spinner from "../components/Spinner/Spinner";
import BusinessNavbar from "../components/BusinessNavbar/BusinessNavbar";

function Layout({ children }) {
  const location = useLocation();
  const { navbarData, loading } = useNavbarcontent();

  const getTreeViewPath = (path) => {
    return treeViewContent.find((item) => item.path === path) || null;
  };

  const currentTreeViewContent = getTreeViewPath(location.pathname);
  const hidden = location.pathname === "/business" ? true : false;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      {hidden && <BusinessNavbar />}
      <Navbar navbarData={navbarData} loading={loading} hidden={hidden} />
      <div className="flex flex-row">
        <div className="flex-grow">{React.cloneElement(children)}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
