import React from "react";
import "./App.css";
import "./styles/treeview.css";
import Homeview from "./pages/Homeview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Dashboard/Home/Home";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Contact from "./pages/Homeview/Contact/Contact";
import Createmenu from "./pages/Dashboard/Menus/CreateMenu/Createmenu";
import BlogPost from "./pages/Selection/Blog/BlogPost/BlogPost";
import Archived from "./pages/Dashboard/Archived/Archived";
import Navbarmenu from "./pages/Dashboard/Navigationbar/Navbarmenu";
import { AuthProvider } from "./helper/auth/useAuthContext";
import Reload from "./components/Reload/Reload";
import Menus from "./pages/Dashboard/Menus/Menus";
import Selection from "./pages/Selection/Selection";
import Business from "./pages/Selection/Business/Business";
import Blog from "./pages/Selection/Blog/Blog";
import Defaultpage from "./pages/Selection/Defaultpage/Defaultpage";
import { useCardPath } from "./helper/database/useCardPath";
import Company from "./pages/Selection/Business/Company/Company";
import BlogContent from "./pages/Selection/Blog/BlogContent/BlogContent";
import Accounts from "./pages/Dashboard/Accounts/Accounts";
import { useNavbarcontent } from "./helper/database/useNavbarcontent";
import { useBusinessSettings } from "./helper/database/useBusinessData";
import useBlogSettings from "./helper/database/useBlogSettings";

function App() {
  const { cardpath, load } = useCardPath();
  const { navbarData, loading } = useNavbarcontent();
  const { getCardInfo, getCompanyLoad } = useBusinessSettings();
  const { blogData } = useBlogSettings();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout
          navbar={{ navbar: navbarData, navload: loading }}
          key={"layout"}
        >
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
              path={"/:navbar"}
              element={<Selection navbar={navbarData} />}
            />
            <Route
              path={"/business"}
              element={
                <Business
                  businessSettings={{
                    businessSettings: getCardInfo,
                    getCompanyLoad: getCompanyLoad,
                  }}
                />
              }
            />
            <Route path="/blog" element={<Blog />} key={"blog"} />
            <Route path="/blog/post" element={<BlogPost />} key={"blog-post"} />
            <Route
              key={`blog`}
              path={`/blog-page/:title`}
              element={<BlogContent blogdata={blogData} />}
            />

            <Route
              key={`card-page`}
              path={`/card-page/:title`}
              element={<Defaultpage cardpath={cardpath} load={load} />}
            />
            <Route
              key={`company-`}
              path={`/company-page/:title`}
              element={<Company CompanyData={getCardInfo} />}
            />
          </Routes>
        </Layout>
        <DashboardLayout
          props={{ navbar: navbarData }}
          key={"dashboard-layout"}
        >
          <Routes>
            <Route path="/dashboard" element={<Home />} key={"dashboard"} />
            <Route
              path="/dashboard/Form/Create"
              element={<Createmenu />}
              key={"createForm"}
            />
            <Route path="/dashboard/Archived/:item" element={<Archived />} />
            <Route path="/dashboard/item/:sidebar" element={<Navbarmenu />} />
            <Route path="/dashboard/reload" element={<Reload />} />
            <Route
              key={`sidebar`}
              path={`/dashboard/:content`}
              element={<Menus blogData={blogData} business={getCardInfo} />}
            />
            <Route
              key={`sample-account`}
              path={`/dashboard/account/list`}
              element={<Accounts />}
            />
            <Route
              key={`company-dashboard`}
              path={`/dashboard/business/:title`}
              element={<Company CompanyData={getCardInfo} />}
            />
            <Route
              key={`card-dashboard`}
              path={`/dashboard/viewpage/:title`}
              element={<Defaultpage cardpath={cardpath} load={load} />}
            />
          </Routes>
        </DashboardLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
