import Homeview from "../pages/Homeview";
import Selection from "../pages/Selection/Selection";

export const route = [
  {
    path: "/",
    element: <Homeview />,
  },
  {
    path: "/business",
    element: <Selection />,
  },
  {
    path: "/food",
    element: <Selection />,
  },
  {
    path: "/golf",
    element: <Selection />,
  },
];
