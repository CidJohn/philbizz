import React from "react";
import "./App.css";
import "./styles/treeview.css";
import Homeview from "./pages/Homeview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { useRoute } from "./route/selectionRouting";

function App() {
  const { getnavroute, getcardroute } = useRoute();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homeview />} />     
          {getnavroute}
          {getcardroute}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
