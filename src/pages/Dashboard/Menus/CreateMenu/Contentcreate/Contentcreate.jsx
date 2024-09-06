import React, { useEffect, useState } from "react";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import TextEditor from "../../../../../components/Texteditor/Texteditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function Contentcreate(props) {
  const { downTree, path, category, name } = props;
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownChildOptions, setDropDownChild] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectChildValue, setSelectChildValue] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [addTextLine, setAddTextLine] = useState([{ id: 1, value: "" }]);
  const initials = {
    parent: selectedValue,
    child: selectChildValue,
  };
  useEffect(() => {
    if (name === "Business") {
      if (category) {
        const uniqueCategory = Array.from(
          new Set(category.map((item) => item.title))
        );
        const optionCategory = [
          { value: "", label: "Select Parent" },
          ...uniqueCategory.map((location) => ({
            value: location,
            label: location,
          })),
        ];
        setDropdownOptions(optionCategory);
        if (optionCategory.length > 0) {
          setSelectedValue(optionCategory[0].value);
        }
      }
    } else {
      if (downTree) {
        // Update parent dropdown options
        const uniqueLocations = Array.from(
          new Set(
            downTree
              .filter((item) => item.path === path)
              .map((item) => item.name)
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
    }
  }, [downTree, path, category]);

  useEffect(() => {
    if (category || (downTree && selectedValue)) {
      const children =
        name === "Business"
          ? category.find((item) => item.title === selectedValue)?.links || []
          : downTree.find(
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
  }, [downTree, selectedValue, path, category]);

  const handleParentDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleChildDropdownChange = (e) => {
    setSelectChildValue(e.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    console.log(initials);
    console.log(addTextLine);
  };
  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleAddLink = () => {
    setAddTextLine([...addTextLine, { id: addTextLine.length + 1, value: "" }]);
    console.log("Added new Textline:", addTextLine);
  };
  const handleTextlineChange = (id, newValue) => {
    setAddTextLine(
      addTextLine.map((textLine) =>
        textLine.id === id ? { [id]: newValue } : addTextLine
      )
    );
  };

  return (
    <div className="p-5">
      <div className="flex flex-col border rounded-lg shadow-lg min-w-80 min-h-80">
        <div className="text-2xl font-bold p-4">Create Form Content</div>
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
              <label htmlFor="Description">Description</label>
              <Textline
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
                type={"text"}
                placeholder={"Enter Address"}
              />
            </div>
            <div className="flex  flex-col w-full">
              <label htmlFor="Body">Body Content</label>
              <TextEditor
                value={editorContent}
                onChange={handleContentChange}
                placeholder="Write your content here..."
                className={
                  "min-h-full bg-white p-4 shadow-sm rounded-lg border"
                }
              />
            </div>
            <div className="flex  flex-col w-full">
              <label htmlFor="Image">Image link</label>
              <div className="flex flex-wrap  max-w-[70vw] gap-1">
                {addTextLine.map((textLine, index) => (
                  <div key={textLine.id} className="flex w-full gap-1">
                    <div className="w-full">
                      <Textline
                        className="min-w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        type="text"
                        placeholder={
                          index === 0
                            ? "Enter Image link (Required)"
                            : "Enter Image link (Optional)"
                        }
                        value={textLine.value}
                        onChange={(e) =>
                          handleTextlineChange(textLine.id, e.target.value)
                        }
                        required={index === 0}
                      />
                    </div>

                    <div className="flex items-center justify-center">
                      <Button
                        icon={
                          <FontAwesomeIcon
                            icon={faAdd}
                            className="border p-3 mt-2 rounded-lg hover:bg-blue-500 hover:text-white"
                            onClick={handleAddLink}
                          />
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex  flex-wrap w-full p-2 gap-3">
              <div className="flex flex-col">
                <label htmlFor="Title">Telegram link</label>
                <Textline
                  className={
                    "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                  }
                  type={"text"}
                  placeholder={"Enter Telegram link Optional"}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Title">Gmail link</label>
                <Textline
                  className={
                    "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                  }
                  type={"text"}
                  placeholder={"Enter gmail link Optional"}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Title">Kakaotalk link</label>
                <Textline
                  className={
                    "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                  }
                  type={"text"}
                  placeholder={"Enter Kakaotalk link Optional"}
                />
              </div>
            </div>
            <div className="flex p-2 w-full justify-center">
              <Button
                text={"Create"}
                className={
                  "min-w-64 border p-2  rounded-lg hover:bg-blue-500 hover:text-gray-100 hover:border-none"
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
