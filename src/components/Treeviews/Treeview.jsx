import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const TreeItem = ({ item, onItemClick, textColor }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (e) => {
    if (item.id) {
      onItemClick(item.id, item.path, item.name);
    }
  };

  return (
    <li className="">
      <div
        onClick={handleToggle}
        className="flex items-center cursor-pointer font-normal hover:font-bold  "
      >
        <Button
          className={
            item.children && item.children.length > 0
              ? ` font-bold hover:underline decoration-sky-500 underline-offset-8 decoration-4 text-left truncate w-[10vw]`
              : "text-gray-500 text-[15px] text-left"
          }
          onClick={handleItemClick}
          text={capitalize(t(item.name))}
          style={
            item.children && item.children.length > 0
              ? { color: textColor }
              : {}
          }
          title={item.name}
        />
        {item.children && item.children.length > 0 && (
          <FontAwesomeIcon
            icon={isOpen ? faChevronDown : faChevronRight}
            className={`mr-2 w-[20px] px-1  `}
            style={{ color: textColor }}
          />
        )}
      </div>
      {isOpen && item.children && (
        <ul className="px-5 lg:px-10  font-bold">
          {item.children.map((child, index) => (
            <TreeItem
              key={index}
              item={child}
              onItemClick={onItemClick}
              textColor={textColor}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = ({ treeViewContent, onItemClick, textColor }) => {
  return (
    <ul className="font-bold text-sm lg:text-lg capitalize ">
      {treeViewContent.map((item, index) => (
        <TreeItem
          key={index}
          item={item}
          onItemClick={onItemClick}
          textColor={textColor}
        />
      ))}
    </ul>
  );
};

export default TreeView;
