import React from 'react'
import Navbar from '../components/Navbar.jsx/Navbar'
import Treeview from '../components/Treeview.jsx/Treeview'
import treeViewContent from '../content/treeViewContent'
import Footer from './Footer/Footer'
import { Selection } from './Selection/Selection'

function Homeview() {
  return (
    <>
      <div className="w-full mx-auto max-w-screen-xl">
        <Navbar />
        <div className="flex flex-row items-center justify-between">
           <Treeview treeViewContent={treeViewContent} />
            <Selection />
        </div>
        <Footer />

    </div>
    </>
       
  )
}

export default Homeview