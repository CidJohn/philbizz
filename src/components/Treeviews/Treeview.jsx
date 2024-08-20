import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import "../../styles/treeview.css";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";

const TreeItem = ({ item, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (e) => {
    if (item.id) {
      onItemClick(item.id, item.path); // Pass the clicked item's ids to the parent component
    }
  };

  return (
    <li className="">
      <div
        onClick={handleToggle}
        className="flex items-center cursor-pointer font-normal"
      >
        {/* <span className="toggle text-lg">{isOpen ? "" : ">"}</span> */}
        <Button
          to={item.path || "#"}
          className="text-gray-900 hover:underline decoration-sky-500 underline-offset-8 decoration-4 hover:py-2 "
          onClick={handleItemClick}
          text={t(item.name)}
        ></Button>
      </div>
      {isOpen && item.children && (
        <ul className="ml-6 px-5 lg:px-10  font-bold">
          {item.children.map((child, index) => (
            <TreeItem key={index} item={child} onItemClick={onItemClick} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = ({ treeViewContent, onItemClick }) => {
  return (
    <ul className="tree  font-bold txt-sm lg:text-2xl ">
      {treeViewContent.map((item, index) => (
        <TreeItem key={index} item={item} onItemClick={onItemClick} />
      ))}
    </ul>
  );
};

export default TreeView;
