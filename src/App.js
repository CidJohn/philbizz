import React from 'react';
import './App.css';
import './styles/treeview.css';
import Homeview from './pages/Homeview';
import Salon from './pages/Selection/Salon/Salon';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Ktv from './pages/Selection/Ktv/Ktv';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homeview />} />
        <Route path="/salon" element={<Salon />} />
        <Route path="/ktv" element={<Ktv />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
