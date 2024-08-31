import { useNavbarcontent } from "../helper/database/useNavbarcontent";
import { useCardPath } from "../helper/database/useCardPath";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Selection from "../pages/Selection/Selection";
import Business from "../pages/Selection/Business/Business";
import Company from "../pages/Selection/Business/Company/Company";
import { useBusinessSettings } from "../helper/database/useBusinessData";
import Blog from "../pages/Selection/Blog/Blog";
import Defaultpage from "../pages/Selection/Defaultpage/Defaultpage";
import useBlogSettings from "../helper/database/useBlogSettings";
import BlogContent from "../pages/Selection/Blog/BlogContent/BlogContent";
import ViewAccount from "../pages/Dashboard/Accounts/ViewAccount/ViewAccount";
import sampleItem from "../content/sampleItem";
import Menus from "../pages/Dashboard/Menus/Menus";

export const useRoute = () => {
  const [getnavroute, setNavRoute] = useState([]);
  const [getcardroute, setCardRoute] = useState([]);
  const [getcompanyroute, setCompanyRoute] = useState([]);
  const [getblog, setBlog] = useState([]);
  const [getcardContent, setCardContent] = useState([]);
  const [getsidebar, setSideBar] = useState([]);
  const { navbarData, loading } = useNavbarcontent();
  const { cardpath, load } = useCardPath();
  const { getCardInfo, getCompanyLoad } = useBusinessSettings();
  const { blogData } = useBlogSettings();

  useEffect(() => {
    if (navbarData) {
      const limitedNavbarData = navbarData.slice(0, 10); // Limit to 10 items
      const routes = limitedNavbarData.map((item, index) => (
        <Route
          key={`nav-${index}`}
          path={`${item.path}`}
          element={
            item.path === "/business" ? (
              <Business
                businessSettings={{
                  businessSettings: getCardInfo,
                  getCompanyLoad: getCompanyLoad,
                }}
              />
            ) : item.path === "/blog" ? (
              <Blog />
            ) : (
              <Selection navbar={navbarData} />
            )
          }
        />
      ));
      const sideroute = navbarData.map((item, index) => (
        <Route
          key={`sidebar-${index}`}
          path={`/dashboard${item.path}`}
          element={<Menus />}
        />
      ));
      setSideBar(sideroute);
      setNavRoute(routes);
    }

    if (cardpath) {
      const cardRoutes = cardpath.map((item, index) => (
        <Route
          key={`card-${index}`}
          path={`/${item.title}`}
          element={<Defaultpage cardpath={cardpath} load={load} />}
        />
      ));
      setCardRoute(cardRoutes);
    }

    if (getCardInfo) {
      const getCompany = getCardInfo.map((item, index) => (
        <Route
          key={`company-${index}`}
          path={`/${item.title}`}
          element={<Company CompanyData={getCardInfo} />}
        />
      ));
      setCompanyRoute(getCompany);
    }

    if (blogData) {
      const getBlog = blogData.map((item, index) => (
        <Route
          key={`blog-${index}`}
          path={`/${item.title}`}
          element={<BlogContent blogdata={blogData} />}
        />
      ));
      setBlog(getBlog);
    }
    // user route sample
    if (sampleItem) {
      const getcontent = sampleItem.map((item, index) => (
        <Route
          key={`sample-${index}`}
          path={`/dashboard/${item.name}`}
          element={<ViewAccount />}
        />
      ));
      setCardContent(getcontent);
    }
  }, [navbarData, cardpath, getCardInfo, blogData, load]);

  return {
    getnavroute,
    getcardroute,
    getcompanyroute,
    getblog,
    blogData,
    getCardInfo,
    navbarData,
    loading,
    getcardContent,
    getsidebar
  };
};
