import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../../styles/treeview.css';

const TreeItem = ({ item, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleItemClick = () => {
    onItemClick(item.onclick); // Pass the clicked item to the parent component
  };

  return (
    <li className="">
      <div onClick={handleToggle} className="flex items-center cursor-pointer font-normal">
        <span className="toggle text-lg">{isOpen ? '-' : '+'}</span> {/* Changed toggle icons */}
        <Link to={item.path} className="ml-2"  onClick={handleItemClick}>{item.name}</Link> {/* Link to navigate */}
      </div>
      {isOpen && (
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
    <ul className="tree mt-10 font-bold min-w-80 ms-10">
      {treeViewContent.map((item, index) => (
        <TreeItem key={index} item={item} onItemClick={onItemClick} />
      ))}
    </ul>
  );
};

export default TreeView;
