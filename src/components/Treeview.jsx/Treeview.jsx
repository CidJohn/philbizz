import React, { useState } from 'react';
import '../../styles/treeview.css'

const TreeItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className=''>
      <div onClick={handleToggle} className=" flex items-center cursor-pointer font-normal">
        <span className="toggle text-lg">{isOpen ? '' : ''}</span>
        <span className="ml-2">{item.name}</span>
      </div>
      {isOpen && (
        <ul className="ml-6 px-7 ">
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
    <ul className="tree mt-10  font-bold min-w-80">
    {treeViewContent.map((item, index) => (
      <TreeItem key={index} item={item} />
    ))}
  </ul>
  );
};

export default TreeView;
