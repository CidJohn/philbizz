import React, { useEffect, useState } from "react";
import { footerContent } from "../../content/footerContent";
import Horizontal from "../Horizontal/Horizontal";

const Categories = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickDelete = () => {
    const storedItem = localStorage.getItem("selectedItem");
    if (storedItem) {
      const itemToStore = JSON.parse(storedItem);
      console.log("clicked:", itemToStore);

      delete itemToStore.id;
      localStorage.setItem("selectedItem", JSON.stringify(itemToStore));
      localStorage.removeItem("selectedItem");
    } else {
      console.log("No item found in localStorage");
    }
  };

  useEffect(() => {
    const savedItemId = JSON.parse(localStorage.getItem("selectedItem"));
    if (savedItemId) {
      const selectedItemObj = findItemById(footerContent, savedItemId);
      setSelectedItem(selectedItemObj);
    }
  }, []);

  const handleItemClick = (id, path) => {
    const selectedItemObj = findItemById(footerContent, id);
    localStorage.setItem("selectedItem", JSON.stringify({ id }));
    setSelectedItem(selectedItemObj);
  };
  const findItemById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.links) {
        const found = findItemById(item.links, id);
        if (found) return found;
      }
    }
    return null;
  };
  return (
    <div>
      <div className="mx-auto w-full max-w-screen-xl">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Categories
        </span>
        <Horizontal />
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
          {footerContent.map((section, index) => (
            <div key={index}>
              <a
                className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white underline underline-offset-1"
                href={section.href}
                onClick={handleClickDelete}
              >
                {section.title}
              </a>
              <ul className="grid md:grid-cols-2 text-gray-500 dark:text-gray-400  font-medium mt-5">
                {section.links.map((link, linkIndex) => (
                  <li className="mb-4" key={linkIndex}>
                    <a
                      href={link.href}
                      className="hover:bg-gray-200 border bg-blue-200 p-2 rounded-full hover:text-gray-600 "
                      onClick={() => handleItemClick(link.id, link.href)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
