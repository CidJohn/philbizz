import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Treeviewcreate from "./Treeviewcreate/Treeviewcreate";
import Contentcreate from "./Contentcreate/Contentcreate";
import Treeviewupdate from "./Treeviewcreate/Treeviewupdate";

const Createmenu = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    name,
    path,
    content,
    businessCategory,
    title,
    cardlocation,
    blogTitle,
    viewMenus,
    viewContent,
  } = state || {
    name: null,
    path: null,
    content: null,
    businessCategory: null,
    title: null,
    cardlocation: null,
    blogTitle: null,
    viewMenus: null,
    viewContent: null
  };
  const [isCreateOpen, setCreateOpen] = useState(false);
  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateView = () => {
    setCreateOpen(!isCreateOpen);
  };

  const renderTreeContent = () => {
    return (
      <>
        <Button
          text={"Update Treeview"}
          className={
            " ms-2 px-4 py-2 border hover:bg-yellow-300 shadow-lg text-lg  rounded-lg transform transform duration-500 hover:scale-95"
          }
          onClick={handleCreateView}
        />
        <Treeviewcreate
          path={path}
          name={name}
          viewMenus={viewMenus}
          navigate={navigate}
        />
      </>
    );
  };

  const renderTreeview = () => {
    return (
      <>
        <Button
          text={"Create New"}
          className={
            "ms-5 px-4 py-2 border hover:bg-green-300 shadow-lg text-lg  rounded-lg transform transform duration-500 hover:scale-95 "
          }
          onClick={handleCreateView}
        />
        <Treeviewupdate
          name={name}
          path={path}
          business={businessCategory}
          viewMenus={viewMenus}
          handleBack={() => handleBack}
        />
      </>
    );
  };

  const renderCardContent = () => {
    return (
      <Contentcreate
        name={name}
        path={path}
        downTree={viewMenus}
        title={title}
        location={cardlocation}
        blogTitle={blogTitle}
        handleBack={() => handleBack}
        viewContent={viewContent}
      />
    );
  };

  return (
    <div className="p-5 ">
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
      <div className="p-2 h-[95vh]">
        {content === "Edit Tree Content" || content === "Add Category"
          ? isCreateOpen
            ? renderTreeContent()
            : renderTreeview()
          : renderCardContent()}
      </div>
    </div>
  );
};

export default Createmenu;
