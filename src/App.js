import React from "react";
import "./App.css";
import "./styles/treeview.css";
import Homeview from "./pages/Homeview";
import Salon from "./pages/Selection/Salon/Salon";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Selection from "./pages/Selection/Selection";
import { route } from "./route/route";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {route.map((item, index) => {
            const { path, element } = item;
            return <Route key={index} path={path} element={element} />;
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
