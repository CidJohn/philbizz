import React from "react";
import "./App.css";
import "./styles/treeview.css";
import Homeview from "./pages/Homeview";
import Salon from "./pages/Selection/Salon/Salon";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Selection from "./pages/Selection/Selection";
import { useNavbarcontent } from "./helper/database/useNavbarcontent";
import { route } from "./route/selectionRouting";

function App() {
  // const { navbarData } = useNavbarcontent();

  // const route = navbarData ? navbarData : "";
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homeview />} />
          {route.map((item, index) => {
            const { path, element } = item;
            return <Route key={index} path={path} element={<Selection />} />;
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
