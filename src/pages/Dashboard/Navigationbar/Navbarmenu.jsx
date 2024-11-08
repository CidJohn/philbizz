import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NavbarList from "./NavbarList/NavbarList";
import NavbarView from "./NavbarView/NavbarView";
import { useNavbarView } from "../../../helper/database/useNavbarSettings";
import Spinner from "../../../components/Spinner/Spinner";

function Navbarmenu() {
  const navigate = useNavigate();
  const [viewNavbar, setViewNavbar] = useState([]);
  const [viewNavbarList, setViewNavbarList] = useState([]);
  const { navbarData, loadingData } = useNavbarView();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavbar = (data) => {
    setViewNavbar(data);
  };

  if (loadingData) {
    return (
      <>
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }
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
          {navbarData ? (
            <NavbarList navbar={navbarData} handleNavbar={handleNavbar} />
          ) : (
            "Create Navbar First"
          )}
          <NavbarView
            name={viewNavbar.name}
            path={viewNavbar.path}
            image={viewNavbar.icons}
            restrict={viewNavbar.restrict}
            id={viewNavbar.id}
          />
        </div>
      </div>
    </>
  );
}

export default Navbarmenu;
