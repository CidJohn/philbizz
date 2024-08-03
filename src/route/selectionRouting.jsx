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

export const useRoute = () => {
  const [getnavroute, setNavRoute] = useState([]);
  const [getcardroute, setCardRoute] = useState([]);
  const [getcompanyroute, setCompanyRoute] = useState([]);
  const [getblog, setBlog] = useState([]);
  const { navbarData } = useNavbarcontent();
  const { cardpath, load } = useCardPath();
  const { getCardInfo } = useBusinessSettings();
  const { blogData } = useBlogSettings();

  useEffect(() => {
    if (navbarData) {
      const limitedNavbarData = navbarData.slice(0, 10); // Limit to 10 items
      const routes = limitedNavbarData.map((item, index) => (
        <>
          {(item.path === "/business" && (
            <Route key={index} path={item.path} element={<Business />} />
          )) ||
            (item.path === "/blog" && (
              <Route key={index} path={item.path} element={<Blog />} />
            ))}
          <Route key={index} path={item.path} element={<Selection />} />
        </>
      ));
      setNavRoute(routes);
    }
    if (cardpath) {
      const cardRoutes = cardpath.map((item, index) => {
        return (
          <Route
            key={index}
            path={`/${item.title}`}
            element={<Defaultpage cardpath={cardpath} load={load} />}
          />
        );
      });
      setCardRoute(cardRoutes);
    }
    if (getCardInfo) {
      const getCompany = getCardInfo.map((item, index) => {
        return (
          <Route
            key={index}
            path={`/${item.title}`}
            element={<Company CompanyData={getCardInfo} />}
          />
        );
      });
      setCompanyRoute(getCompany);
    }
    if (blogData) {
      const getBlog = blogData.map((item, index) => {
        return (
          <Route
            key={index}
            path={`/${item.title}`}
            element={<BlogContent blogdata={blogData} />}
          />
        );
      });
      setBlog(getBlog);
    }
  }, [navbarData, cardpath, getCardInfo, blogData]);

  return { getnavroute, getcardroute, getcompanyroute, getblog };
};
