import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Textline from "../../../../components/Textline/Textline";
import Button from "../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Treeviewcreate from "./Treeviewcreate/Treeviewcreate";
import Contentcreate from "./Contentcreate/Contentcreate";

const Createmenu = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, path, content, treeviewdata } = state || {
    name: null,
    path: null,
    content: null,
    treeviewdata: null
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderTreeContent = () => {
    return <Treeviewcreate path={path} />;
  };

  const renderCardContent = () => {
    return <Contentcreate name={name} path={path} downTree={treeviewdata} />;
  };

  return (
    <div className="p-5">
      <div className="flex items-center">
        <Button
          onClick={handleBack}
          icon={<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />}
          className={
            "px-2 text-lg text-gray-800 transform  transition-transform duration-500 hover:translate-x-3"
          }
        />
        <h1 className="text-2xl font-bold">Menu - {name} Page </h1>
      </div>
      {content === "Edit Tree Content" || content === "Add Category"
        ? renderTreeContent()
        : renderCardContent()}
    </div>
  );
};

export default Createmenu;
