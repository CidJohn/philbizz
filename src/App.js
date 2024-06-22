import React from 'react';
import './App.css';
import './styles/treeview.css';
import Homeview from './pages/Homeview';
import Salon from './pages/Selection/Salon/Salon';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Selection from './pages/Selection/Selection';


function App() {
  return (
    <BrowserRouter>
    <Layout>
    <Routes>
        <Route path="/" element={<Homeview />} />
        <Route path="/salon" element={<Salon />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/manila" element={<Selection />} />
        </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
