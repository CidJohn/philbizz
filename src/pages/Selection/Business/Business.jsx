import React, { Children } from "react";
import BusinessNavbar from "../../../components/BusinessNavbar/BusinessNavbar";
import businenssContent from "../../../content/businessNavbarContent.json";
import Company from "./Company/Company";

const Business = () => {
  const navbar = businenssContent.nabvar;
  const sidebar = businenssContent.sidebar;
  return (
    <div className="mt-5">
      <BusinessNavbar />
      <div className="flex flex-wrap mx-auto ">
        <div className="flex flex-row mx-auto  p-5">
          <div className="flex flex-col ">
            <ul className="flex ">
              {navbar.map((item, index) => (
                <li
                  className="hover:underline decoration-sky-500 underline-offset-8 decoration-4 hover:py-2  p-3"
                  key={index}
                >
                  <a href={item.path} key={index} className="  text-center">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-2xl ">
              <Company />
            </div>
          </div>

          <div className="flex flex-wrap pt-10 ">
            <ul className="">
              {sidebar.map((item, index) => (
                <li
                  className="hover:underline decoration-sky-500 underline-offset-8 decoration-4 hover:py-2  p-3"
                  key={index}
                >
                  <a href={item.path} key={index} className="  text-center">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
