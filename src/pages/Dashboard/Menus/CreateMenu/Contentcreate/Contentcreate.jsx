import React, { useEffect, useState } from "react";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import TextEditor from "../../../../../components/Texteditor/Texteditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "../../../../../components/UploadImage/UploadImage";
import Pako from "pako";

function Contentcreate(props) {
  const { downTree, path, category, name } = props;
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownChildOptions, setDropDownChild] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectChildValue, setSelectChildValue] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [addTextLine, setAddTextLine] = useState([{ id: 1, value: "" }]);
  const [newTextLine, setNewTextLine] = useState({});
  const [TextLine, setTextLine] = useState({
    title: "",
    description: "",
    image: "",
    contact: 0,
    email: "",
    location: "",
    service: "",
  });
  const [entries, setEntries] = useState([
    {
      id: Date.now(),
      imagePreview: null,
      personnelName: "",
      position: "",
    },
  ]);

  const compressedEditorContent = Pako.deflate(editorContent, { to: "string" });
  const initials = {
    Treeview: {
      parent: selectedValue,
      child: selectChildValue,
      name: name,
    },
    TextLine: { required: TextLine, option: newTextLine },
    TextEditor: compressedEditorContent,
    Personnel: { entries },
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
    if (name === "Business") console.log(initials.Personnel);
    console.log(initials);
  };
  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleAddLink = () => {
    setAddTextLine([...addTextLine, { id: addTextLine.length + 1, value: "" }]);
  };

  const handleTextlineChange = (id, newValue) => {
    setAddTextLine(
      addTextLine.map((textLine) =>
        textLine.id === id ? { ...textLine, value: newValue } : textLine
      )
    );
    setNewTextLine((prev) => ({
      ...prev,
      [id]: { id: id, value: newValue },
    }));
  };

  const handleTextLineChange = (e) => {
    const { name, value } = e.target;
    setTextLine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteTextline = (id) => {
    const updatedTextLines = addTextLine.filter(
      (textLine) => textLine.id !== id
    );

    const reindexedTextLines = updatedTextLines.map((textLine, index) => ({
      ...textLine,
      id: index + 1,
    }));

    setAddTextLine(reindexedTextLines);

    setNewTextLine((prev) => {
      const newState = {};

      reindexedTextLines.forEach((textLine) => {
        newState[textLine.id] = { id: textLine.id, value: textLine.value };
      });

      return newState;
    });
  };

  // Handle file change and update the image preview
  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEntries((prevEntries) =>
          prevEntries.map((entry, i) =>
            i === index ? { ...entry, imagePreview: reader.result } : entry
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes for personnelName and position
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        [name]: value, // Set the input value for the correct index
      };
      return updatedEntries;
    });
  };

  // Add a new entry with a corresponding image object
  const handleAddNewEntry = () => {
    const newId = Date.now(); // Generate unique ID for new entry and image
    setEntries((prevEntries) => [
      ...prevEntries,
      {
        id: newId,
        imagePreview: null,
        personnelName: "",
        position: "",
      },
    ]);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col border rounded-lg shadow-lg min-w-80 min-h-80">
        <div className="text-2xl font-bold p-4">Create Form Content</div>
        <form className="flex flex-col p-3 gap-2">
          {name === "Blog" ? (
            ""
          ) : (
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
          )}
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="Title">Title</label>
              <Textline
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
                type={"text"}
                placeholder={"Enter Title"}
                value={TextLine.title}
                name={"title"}
                onChange={handleTextLineChange}
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
                value={TextLine.description}
                name={"description"}
                onChange={handleTextLineChange}
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="flex  flex-col w-full">
                <label htmlFor="Description">Contact</label>
                <Textline
                  className={
                    "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                  }
                  type={"number"}
                  placeholder={"Enter Contact"}
                  value={TextLine.contact}
                  name={"contact"}
                  onChange={handleTextLineChange}
                />
              </div>
              <div className="flex  flex-col w-full">
                <label htmlFor="Description">Email</label>
                <Textline
                  className={
                    "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                  }
                  type={"email"}
                  placeholder={"Enter Email"}
                  value={TextLine.email}
                  name={"email"}
                  onChange={handleTextLineChange}
                />
              </div>
              <div className="flex  flex-col w-full">
                <label htmlFor="Description">Service Type</label>
                <Textline
                  className={
                    "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                  }
                  type={"text"}
                  placeholder={"Enter Email"}
                  value={TextLine.service}
                  name={"service"}
                  onChange={handleTextLineChange}
                />
              </div>
            </div>
            <div className="flex  flex-col w-full">
              <label htmlFor="Description">Location</label>
              <Textline
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
                type={"text"}
                placeholder={"Enter Google Map link"}
                value={TextLine.location}
                name={"location"}
                onChange={handleTextLineChange}
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
              {/* 
              const sanitizedContent = DOMPurify.sanitize(editorContent);
              <div
                dangerouslySetInnerHTML={{ __html: editorContent }}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginTop: "10px",
                }}
              /> */}
            </div>
            <div className="flex  flex-col w-full">
              <label htmlFor="Image">Image Title</label>
              <div className="flex flex-wrap  max-w-full gap-1">
                {/* Default Textline */}
                <div className="flex gap-2 min-w-full">
                  <div className="w-full">
                    <Textline
                      className="min-w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      type="text"
                      placeholder={"Enter Image link (Required)"}
                      value={TextLine.image}
                      name={"image"}
                      onChange={handleTextLineChange}
                      required={true}
                    />
                  </div>
                </div>

                {/* Conditionally render the dynamically added Textlines only if at least one has been added */}
                {TextLine.image.length > 0 && (
                  <div className=" min-w-full ">
                    {addTextLine.map((textLine, index) => (
                      <div key={textLine.id} className="flex w-full gap-1 mt-2">
                        <div className="w-full">
                          <Textline
                            className="min-w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            type="text"
                            placeholder={`Enter Image link (Optional)`}
                            value={textLine.value}
                            onChange={(e) =>
                              handleTextlineChange(textLine.id, e.target.value)
                            }
                            required={false}
                          />
                        </div>
                        <div className="flex justify-center ">
                          <Button
                            icon={
                              <FontAwesomeIcon
                                icon={
                                  textLine.id < addTextLine.length
                                    ? faMinus
                                    : faAdd
                                }
                                className="border p-3 mt-2 rounded-lg hover:bg-blue-500 hover:text-white"
                                onClick={
                                  textLine.id < addTextLine.length
                                    ? () => handleDeleteTextline(textLine.id)
                                    : handleAddLink
                                } // Add new Textline on button click
                              />
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {name === "Business" && (
              <div className="flex flex-col w-full">
                <label htmlFor="personel">Personnel </label>
                <div className="grid grid-cols-3 gap-2">
                  {entries.map((entry, index) => (
                    <div className="px-5" key={entry.id}>
                      <div>
                        <UploadImage
                          imagePreview={entry.imagePreview}
                          handleFileChange={(e) => handleFileChange(index, e)}
                        />
                      </div>
                      <Textline
                        className="w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        type="text"
                        placeholder="Personnel Name"
                        name="personnelName"
                        value={entry.personnelName}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      <Textline
                        className="w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        type="text"
                        placeholder="Position"
                        name="position"
                        value={entry.position}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  ))}
                  {entries.length < 10 && (
                    <div className="flex p-5">
                      <Button
                        icon={<FontAwesomeIcon icon={faAdd} />}
                        className={
                          "border-2 border-dashed min-w-[20vw] min-h-80 rounded-lg"
                        }
                        onClick={handleAddNewEntry}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
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
