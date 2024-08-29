import React from "react";
import "./App.css";
import "./styles/treeview.css";
import Homeview from "./pages/Homeview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { useRoute } from "./route/selectionRouting";
import Home from "./pages/Dashboard/Home/Home";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Contact from "./pages/Homeview/Contact/Contact";

function App() {
  const {
    getnavroute,
    getcardroute,
    getcompanyroute,
    getblog,
    blogData,
    navbarData,
    getCardInfo,
    loading,
  } = useRoute();
  return (
    <BrowserRouter>
      <Layout navbar={{ navbar: navbarData, navload: loading }}>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/"
            element={
              <Homeview
                data={{
                  blogData: blogData,
                  navbar: navbarData,
                  businessSettings: getCardInfo,
                }}
              />
            }
            key={"home"}
          />
          {getnavroute}
          {getcardroute}
          {getcompanyroute}
          {getblog}
        </Routes>
      </Layout>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Home />} key={"dashboard"} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
