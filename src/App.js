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
import Inbox from "./pages/Dashboard/Inbox/Inbox";
import Createmenu from "./pages/Dashboard/Menus/CreateMenu/Createmenu";
import BlogPost from "./pages/Selection/Blog/BlogPost/BlogPost";
import Archived from "./pages/Dashboard/Archived/Archived";
import Navbarmenu from "./pages/Dashboard/Navigationbar/Navbarmenu";

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
    getcardContent,
    getsidebar,
    getdashcompanyroute,
    getdashcardroute,
  } = useRoute();
  return (
    <BrowserRouter>
      <Layout navbar={{ navbar: navbarData, navload: loading }} key={"layout"}>
        <Routes>
          <Route path="/contact" element={<Contact />} key={"contact"} />
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
          <Route
            path="/blog/post"
            element={<BlogPost />}
            key={"blog-post"}
          />
          {getnavroute}
          {getcardroute}
          {getcompanyroute}
          {getblog}
        </Routes>
      </Layout>
      <DashboardLayout props={{ navbar: navbarData }} key={"dashboard-layout"}>
        <Routes>
          <Route path="/dashboard" element={<Home />} key={"dashboard"} />
          <Route
            path="/dashboard/Form/Create"
            element={<Createmenu />}
            key={"createForm"}
          />
          <Route path="/dashboard/Archived/:item" element={<Archived />} />
          <Route path="/dashboard/:sidebar" element={<Navbarmenu />} />
          {getcardContent}
          {getsidebar}
          {getdashcompanyroute}
          {getdashcardroute}
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
