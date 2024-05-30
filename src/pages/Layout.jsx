import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import TreeView from '../components/Treeviews/Treeview'
import treeViewContent from '../content/treeViewContent';
import Footer from './Footer/Footer';

function Layout({children}) {


  return (
    <div>
        <Navbar />
        <div className="flex flex-row container">
        <div className="sticky left-0 top-0 ">
            <TreeView treeViewContent={treeViewContent}  />
        </div>
        {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout