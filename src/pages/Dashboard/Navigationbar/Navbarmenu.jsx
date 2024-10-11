import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import List from "../../../components/List/List";
import NavbarList from "./NavbarList/NavbarList";
import NavbarView from "./NavbarView/NavbarView";

function Navbarmenu() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { navbar } = state || { navbar: null };
  const [viewNavbar, setViewNavbar] = useState([]);

  //console.log(navbar);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavbar = (data) => {
    console.log(data);
    setViewNavbar(data);
  };

  return (
    <>
      <div className="flex flex-col p-5">
        <div className="flex items-center">
          <Button
            onClick={handleBack}
            icon={<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />}
            className={
              "px-2 text-lg text-gray-800 transform  transition-transform duration-500 hover:translate-x-3"
            }
          />
          <h1 className="text-2xl">Navigation Page </h1>
        </div>
        <div className="flex p-5">
          <NavbarList navbar={navbar} handleNavbar={handleNavbar} />
          <NavbarView
            name={viewNavbar.name}
            path={viewNavbar.path}
            image={viewNavbar.iconPath}
            id={viewNavbar.id}
          />
        </div>
      </div>
    </>
  );
}

export default Navbarmenu;
