import React, { useState } from "react";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import { useCreateTreeView } from "../../../../../helper/database/useCardSettings";
import { useCreateNewCategory } from "../../../../../helper/database/useBusinessData";

const Treeviewcreate = (props) => {
  const { path, name } = props;
  const [parent, setParent] = useState("");
  const [child, setChild] = useState("");
  const [treeViewChild, setTreeViewChild] = useState([]);
  const { fetchTreeCreate, resultNew, treeload } = useCreateTreeView();
  const { fetchCreateNewCategory, resultCategoryNew, loadNew } =
    useCreateNewCategory();

  const treeAdd = {
    parent: parent,
    child: treeViewChild,
    path: path,
  };

  const handleChildAdd = (e) => {
    e.preventDefault();
    const newChild = { child, path };
    setTreeViewChild([...treeViewChild, newChild]);
    setChild(""); // Reset child input after adding
  };

  const handleCreate = () => {
    if (name === "Business") {
      fetchCreateNewCategory(treeAdd);
      console.log(resultCategoryNew);
    } else {
      //fetchTreeCreate(treeAdd);
      console.log(resultNew);
    }
  };

  return (
    <div className="flex gap-2  p-2 w-full">
      <div className="border-2 p-5 rounded-lg shadow-md min-w-96 min-h-80 bg-white">
        <div className="text-2xl p-2 font-bold">
          {name === "Business" ? "Add Cateogry" : "Add Treeview"}
        </div>
        <form className="space-y-4 ">
          <div>
            <label
              htmlFor="parentname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Parent Name:
            </label>
            <div className="p-2">
              <Textline
                id="parentname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                placeholder={"Enter Parent Name"}
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
            <div className="flex flex-col ">
              <div className="p-2 max-h-32 ">
                <Textline
                  id="childname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={child}
                  onChange={(e) => setChild(e.target.value)}
                  placeholder={"Enter Child Name"}
                />
              </div>
              <div className="p-2">
                <Button
                  text={"Add"}
                  className={
                    "w-full border p-2  rounded-lg hover:bg-blue-500 hover:text-white text-md"
                  }
                  onClick={handleChildAdd}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="border-2 p-5 rounded-lg shadow-md min-w-96 min-h-80 bg-white">
        <div className="text-2xl font-bold p-2">
          {name === "Business" ? "Display Category" : "Display Treeview"}
        </div>
        <div className="text-lg font-bold">{treeAdd.parent}</div>
        <div className="max-h-64 h-screen overflow-hidden hover:overflow-y-scroll">
          <ul className="p-2">
            {treeViewChild.map((item, index) => (
              <li key={index} className="pl-2">
                {item.child}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-2">
          <Button
            text={"Create"}
            className={
              "w-full border p-2 mt-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm"
            }
            onClick={handleCreate}
          />
        </div>
      </div>
    </div>
  );
};

export default Treeviewcreate;
