import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import "../../styles/treeview.css";
import { useTranslation } from "react-i18next";

const TreeItem = ({ item, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    if (item.id) {
      onItemClick(item.id); // Pass the clicked item's ids to the parent component
      console.log("TreeView Item ID:", item.id); // Log the ID to the console
    }
  };

  return (
    <li className="">
      <div
        onClick={handleToggle}
        className="flex items-center cursor-pointer font-normal"
      >
        {/* <span className="toggle text-lg">{isOpen ? "" : ">"}</span> */}
        <Link
          to={item.path || "#"}
          className={isOpen ? "text-gray-900 " : "text-red-500 ml-2"}
          onClick={handleItemClick}
        >
          {t(item.name)}
        </Link>
      </div>
      {isOpen && item.children && (
        <ul className="ml-6 px-7">
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
    <ul className="tree mt-10 font-bold max-w-auto ms-10 text-2xl">
      {treeViewContent.map((item, index) => (
        <TreeItem key={index} item={item} onItemClick={onItemClick} />
      ))}
    </ul>
  );
};

export default TreeView;
