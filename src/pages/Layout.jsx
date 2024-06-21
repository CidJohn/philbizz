import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import TreeView from '../components/Treeviews/Treeview'
import treeViewContent from '../content/treeViewContent';
import Footer from './Footer/Footer';
import { useLocation } from 'react-router-dom';

function Layout({children}) {
  const location = useLocation();

  const getTreeViewPath = (path) => {
    return treeViewContent.find((item) => item.path === path) || null
  }
  const currentTreeViewContent = getTreeViewPath(location.pathname);
  return (
    <div>
        <Navbar />
        <div className="flex flex-row container">
        <div className="sticky left-0 top-0 fixed">
        {currentTreeViewContent && (
            <TreeView treeViewContent={currentTreeViewContent.children} />
          )}
        </div>
        {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout