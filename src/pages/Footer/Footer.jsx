import React, { useEffect, useState } from "react";
import { footerContent } from "../../content/footerContent";
import { useLocation } from "react-router-dom";
import { FoodTreeView } from "../../content/FoodTreeView";
import treeViewContent from "../../content/treeViewContent";
import navbarContent from "../../content/navbarContent";

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

function Footer() {
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

  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-4 p-4">
      <div className="mx-auto w-full max-w-screen-xl">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Categories
        </span>
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {footerContent.map((section, index) => (
            <div key={index}>
              <a
                className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                href={section.href}
                onClick={handleClickDelete}
              >
                {section.title}
              </a>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {section.links.map((link, linkIndex) => (
                  <li className="mb-4" key={linkIndex}>
                    <a
                      href={link.href}
                      className="hover:underline"
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
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              PhilippineZone
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
