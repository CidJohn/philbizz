import React, { useEffect, useState } from "react";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";

function Contentcreate(props) {
  const { downTree, path } = props;
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownChildOptions, setDropDownChild] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectChildValue, setSelectChildValue] = useState("");

  const initials = {
    parent: selectedValue,
    child: selectChildValue,
  };
  useEffect(() => {
    if (downTree) {
      // Update parent dropdown options
      const uniqueLocations = Array.from(
        new Set(
          downTree.filter((item) => item.path === path).map((item) => item.name)
        )
      );

      const optionsList = [
        { value: "", label: "Select Parent" },
        ...uniqueLocations.map((location) => ({
          value: location,
          label: location,
        })),
      ];

      setDropdownOptions(optionsList);

      if (optionsList.length > 0) {
        setSelectedValue(optionsList[0].value);
      }
    }
  }, [downTree, path]);

  useEffect(() => {
    if (downTree && selectedValue) {
      const children =
        downTree.find(
          (item) => item.name === selectedValue && item.path === path
        )?.children || [];

      const optionChild = [
        { value: "", label: "Select Child" },
        ...children.map((child) => ({
          value: child.name,
          label: child.name,
        })),
      ];

      setDropDownChild(optionChild);

      if (optionChild.length > 0) {
        setSelectChildValue(optionChild[0].value);
      } else {
        setSelectChildValue("");
      }
    }
  }, [downTree, selectedValue, path]);

  const handleParentDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleChildDropdownChange = (e) => {
    setSelectChildValue(e.target.value);
  };
  const handleSave = () => {
    console.log(initials);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col border rounded-lg shadow-lg min-w-80 min-h-80">
        <div className="text-2xl font-bold p-2">Form Add Cards</div>
        <form className="flex flex-col p-3 gap-2">
          <div className="flex gap-3">
            <div className="flex flex-col">
              <label htmlFor="parent">Parent Name:</label>
              <Dropdown
                id="parent"
                placeholder={selectedValue ? selectedValue : "Select Parent"}
                value={selectedValue}
                options={dropdownOptions}
                onChange={handleParentDropdownChange}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="child">Child Name:</label>
              <Dropdown
                id="child"
                placeholder={
                  !selectedValue
                    ? "Select Parent First"
                    : selectChildValue
                    ? selectChildValue
                    : "Select Child"
                }
                value={selectChildValue}
                options={
                  !selectedValue
                    ? [{ value: "", label: "Select Parent First" }]
                    : dropdownChildOptions
                }
                onChange={handleChildDropdownChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="Title">Title</label>
              <Textline
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
                type={"text"}
                placeholder={"Enter Title"}
              />
            </div>
            <div className="flex  flex-col w-full">
              <label htmlFor="Title">Address</label>
              <Textline
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
                type={"text"}
                placeholder={"Enter Address"}
              />
            </div>
            <div className="flex  flex-col w-full">
              <label htmlFor="Title">Image link</label>
              <Textline
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
                type={"text"}
                placeholder={"Enter Image link"}
              />
            </div>
            <div className="flex">
              <Button
                text={"Save"}
                className={
                  "border p-2 rounded-lg hover:bg-blue-500 hover:text-gray-100 hover:border-none"
                }
                onClick={handleSave}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contentcreate;
