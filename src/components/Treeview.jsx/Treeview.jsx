import React, { useState } from 'react';

const TreeItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div onClick={handleToggle} className=" flex items-center cursor-pointer">
        <span className="toggle text-lg">{isOpen ? '-' : '+'}</span>
        <span className="ml-2">{item.name}</span>
      </div>
      {isOpen && (
        <ul className="ml-6">
          {item.children.map((child, index) => (
            <TreeItem key={index} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = ({ treeViewContent }) => {
  return (
    <ul className="tree mt-10">
    {treeViewContent.map((item, index) => (
      <TreeItem key={index} item={item} />
    ))}
  </ul>
  );
};

export default TreeView;
