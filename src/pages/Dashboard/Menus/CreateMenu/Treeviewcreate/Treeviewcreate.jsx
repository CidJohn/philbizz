import React, { useEffect, useState } from "react";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import { useCreateTreeView } from "../../../../../helper/database/useCardSettings";
import { useCreateNewCategory } from "../../../../../helper/database/useBusinessData";
import { IoMdClose } from "react-icons/io";
import {
  useSideMenu,
  useSideMenuView,
} from "../../../../../helper/database/useTreeview";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import useAlert from "../../../../../helper/alert/useAlert";
import { useToast } from "../../../../../components/Sonner/Sonner";

const Treeviewcreate = (props) => {
  const { path, name, viewMenus, navigate } = props;
  const [parent, setParent] = useState("");
  const [child, setChild] = useState("");
  const [treeAdd, setTreeAdd] = useState([]);
  const [activeParentIndex, setActiveParentIndex] = useState(0);
  const { fetchTreeCreate, resultNew, treeload } = useCreateTreeView();
  const { postSideMenu, resultMenu, MenuLoading } = useSideMenu();
  const { fetchCreateNewCategory, resultCategoryNew, loadNew } =
    useCreateNewCategory();
  const toastify = useToast();

  const handleChildAdd = (e) => {
    e.preventDefault();
    if (child.trim() && treeAdd.length > 0) {
      setTreeAdd((prevTreeAdd) =>
        prevTreeAdd.map((parentItem, index) =>
          index === activeParentIndex
            ? {
                ...parentItem,
                children: [...parentItem.children, { name: child, path }],
              }
            : parentItem
        )
      );
      setChild("");
    }
  };
  const handleCreate = () => {
    if (postSideMenu(treeAdd)) {
      setTreeAdd([]);
      toastify(`New Menu Created!`, "success");
    } else {  
      toastify(`Something Went Wrong!`, "error");
    }
  };

  const handleAddParent = (e) => {
    e.preventDefault();
    if (parent.trim()) {
      const newParent = { name: parent, path, parent: null, children: [] };
      setTreeAdd([...treeAdd, newParent]);
      setParent("");
      setActiveParentIndex(treeAdd.length);
    }
  };

  const handleDelete = (childIndex) => {
    setTreeAdd((prevTreeAdd) =>
      prevTreeAdd.map((parentItem, index) =>
        index === activeParentIndex
          ? {
              ...parentItem,
              children: parentItem.children.filter((_, i) => i !== childIndex),
            }
          : parentItem
      )
    );
  };

  const handleNext = () => {
    setActiveParentIndex((prevIndex) =>
      Math.min(prevIndex + 1, treeAdd.length - 1)
    );
  };

  const handleBack = () => {
    setActiveParentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="flex gap-2 p-2 w-full">
      <div className="border-2 p-5 rounded-lg shadow-md min-w-96 min-h-80 bg-white">
        <div className="text-2xl p-2 font-bold">
          {name === "Business" ? "Add Category" : "Add Treeview"}
        </div>
        <form className="space-y-4 h-[40vh]">
          <div>
            <label
              htmlFor="parentname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Parent Name:
            </label>
            <div className="flex gap-2 items-center w-full p-2">
              <Textline
                id="parentname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                placeholder="Enter Parent Name"
              />
              <Button
                icon={<IoCreateOutline />}
                className="py-2 px-3 text-[35px] transform translate-transform duration-500 hover:text-green-500"
                onClick={handleAddParent}
                disabled={!parent.trim()}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="childname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Child Name:
            </label>
            <div className="flex flex-col">
              <div className="p-2 flex items-center gap-2">
                <Textline
                  id="childname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
                  value={child}
                  onChange={(e) => setChild(e.target.value)}
                  placeholder={"Enter Child Name"}
                />
                <Button
                  icon={<IoIosAddCircleOutline />}
                  className="py-2 px-3 text-[35px] transform translate-transform duration-500 hover:text-green-500"
                  onClick={handleChildAdd}
                  disabled={!child.trim() || treeAdd.length === 0}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="border-2 p-5 rounded-lg shadow-md min-w-[40vw] min-h-80 bg-white">
        <div className="text-2xl font-bold p-2">
          {name === "Business" ? "Display Category" : "Display Treeview"}
        </div>

        {treeAdd.length > 0 && (
          <>
            <div className="text-lg font-bold">
              {treeAdd[activeParentIndex]?.name || "No Parent Selected"}
            </div>
            <div className="h-[40vh] overflow-hidden hover:overflow-y-scroll">
              <ul className="indent-8">
                {treeAdd[activeParentIndex]?.children.map(
                  (childItem, childIndex) => (
                    <li key={childIndex} className="flex justify-between">
                      <p className="text-wrap max-w-80">{childItem.name}</p>
                      <div className="flex items-center flex-grow mx-2">
                        <div className="flex-grow border-b border-gray-800 border-dashed"></div>
                      </div>
                      <Button
                        icon={<IoMdClose />}
                        onClick={() => handleDelete(childIndex)}
                        className="hover:text-red-700 font-bold text-lg"
                      />
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="flex gap-2 p-2">
              <Button
                text="Back"
                className="w-full border p-3 rounded-lg bg-gray-400 hover:bg-gray-500"
                onClick={handleBack}
                disabled={activeParentIndex === 0}
              />
              <Button
                text="Next"
                className="w-full border p-3 rounded-lg bg-gray-400 hover:bg-gray-500"
                onClick={handleNext}
                disabled={activeParentIndex === treeAdd.length - 1}
              />
            </div>
          </>
        )}

        {treeAdd.length > 0 && (
          <div className="p-2">
            <Button
              text="Create"
              className="w-full border p-3 mt-2 rounded-lg transform duration-500 hover:scale-95 bg-blue-500 hover:text-white text-2xl"
              onClick={handleCreate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Treeviewcreate;
