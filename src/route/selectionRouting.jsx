import { useNavbarcontent } from "../helper/database/useNavbarcontent";
import { useCardPath } from "../helper/database/useCardPath";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Selection from "../pages/Selection/Selection";
import KtvandJtv from "../pages/Selection/KtvandJtv/KtvandJtv";
import Food from "../pages/Selection/Food/Food";
import Business from "../pages/Selection/Business/Business";

export const useRoute = () => {
  const [getnavroute, setNavRoute] = useState([]);
  const [getcardroute, setCardRoute] = useState([]);
  const { navbarData } = useNavbarcontent();
  const { cardpath } = useCardPath();

  useEffect(() => {
    if (navbarData) {
      const limitedNavbarData = navbarData.slice(0, 10); // Limit to 10 items
      const routes = limitedNavbarData.map((item, index) => (
        <>
          {item.path === "/business" && (
            <Route key={index} path={item.path} element={<Business />} />
          )}
          <Route key={index} path={item.path} element={<Selection />} />
        </>
      ));
      setNavRoute(routes);
    }
    if (cardpath) {
      const cardRoutes = cardpath
        .map((item, index) => {
          switch (item.id) {
            case 1:
              return (
                <Route
                  key={index}
                  path={`/${item.title}`}
                  element={<KtvandJtv />}
                />
              );
            case 3:
              return (
                <Route key={index} path={`/${item.title}`} element={<Food />} />
              );
            default:
              return null; // Or handle other cases if necessary
          }
        })
        .filter(Boolean); // Filter out any null values

      setCardRoute(cardRoutes);
    }
  }, [navbarData, cardpath]); // Only run when navbarData or cardpath changes

  return { getnavroute, getcardroute };
};
