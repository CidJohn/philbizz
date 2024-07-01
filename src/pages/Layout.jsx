import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TreeView from "../components/Treeviews/Treeview";
import treeViewContent from "../content/treeViewContent";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";
import { useNavbarcontent } from "../helper/database/useNavbarcontent";

function Layout({ children }) {
  const location = useLocation();
  const [selectedIds, setSelectedIds] = useState(null);

  const getTreeViewPath = (path) => {
    return treeViewContent.find((item) => item.path === path) || null;
  };

  const currentTreeViewContent = getTreeViewPath(location.pathname);

  const handleItemClick = (ids) => {
    setSelectedIds(ids);
  };
  const { navbarData, loading } = useNavbarcontent();

  return (
    <div>
      <Navbar navbarData={navbarData} loading={loading} />
      <div className="flex flex-row">
        <div className="sticky left-0 top-0 fixed">
          {/* {currentTreeViewContent && (
            <TreeView
              treeViewContent={currentTreeViewContent.children}
              onItemClick={handleItemClick}
            />
          )} */}
        </div>
        <div className="flex-grow">
          {React.cloneElement(children, { selectedIds })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
