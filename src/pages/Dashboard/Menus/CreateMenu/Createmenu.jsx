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
    treeviewdata,
    businessCategory,
    title,
    cardlocation,
    blogTitle,
  } = state || {
    name: null,
    path: null,
    content: null,
    treeviewdata: null,
    businessCategory: null,
    title: null,
    cardlocation: null,
    blogTitle: null,
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
            " ms-2 px-2 py-1 border hover:bg-green-500 hover:border-none hover:text-white text-sm  rounded-lg"
          }
          onClick={handleCreateView}
        />
        <Treeviewcreate path={path} treeview={treeviewdata} name={name} />
      </>
    );
  };
  const renderCardContent = () => {
    return (
      <Contentcreate
        name={name}
        path={path}
        downTree={treeviewdata}
        category={businessCategory}
        title={title}
        location={cardlocation}
        blogTitle={blogTitle}
      />
    );
  };

  const renderTreeview = () => {
    return (
      <>
        <Button
          text={"Create New"}
          className={
            "ms-2  px-2 py-1 border hover:bg-green-500 hover:border-none hover:text-white text-sm rounded-lg "
          }
          onClick={handleCreateView}
        />
        <Treeviewupdate
          treeview={treeviewdata}
          name={name}
          path={path}
          business={businessCategory}
        />
      </>
    );
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
      <div className="p-2">
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
