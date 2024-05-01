import React from 'react'
import Navbar from '../components/Navbar.jsx/Navbar'
import Treeview from '../components/Treeview.jsx/Treeview'
import treeViewContent from '../content/treeViewContent'

function Homeview() {
  return (
    <div className="w-full mx-auto max-w-screen-xl">
        <Navbar />
        <Treeview treeViewContent={treeViewContent} />
    </div>
       
  )
}

export default Homeview