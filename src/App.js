import React from "react";
import "./App.css";
import "./styles/treeview.css";
import Homeview from "./pages/Homeview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { useRoute } from "./route/selectionRouting";

function App() {
  const { getnavroute, getcardroute, getcompanyroute, getblog } = useRoute();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homeview />} key={"home"} />
          {getnavroute}
          {getcardroute}
          {getcompanyroute}
          {getblog}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
