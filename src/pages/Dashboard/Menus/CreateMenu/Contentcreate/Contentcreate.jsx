import React, { useEffect, useState } from "react";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import TextEditor from "../../../../../components/Texteditor/Texteditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "../../../../../components/UploadImage/UploadImage";
import {
  useUpdateCompanyContent,
} from "../../../../../helper/database/useBusinessData";
import socialmedia from "../../../../../content/socialmedia.json";
import {
  useCardPosting,
} from "../../../../../helper/database/useCardSettings";
import Createblog from "./Createblog";
import { useBlogContent } from "../../../../../helper/database/useBlogSettings";
import useAlert from "../../../../../helper/alert/useAlert";
import { useNavigate } from "react-router-dom";
import { formSchema } from "./Contentvalidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import contents from "../../../../../content/content.json";
import { useToast } from "../../../../../components/Sonner/Sonner";
import { useGlobalContext } from "../../../../../helper/context/useContext";

function Contentcreate(props) {
  const { downTree, path, name, title, location, blogTitle, viewContent } =
    props;
  const showAlert = useAlert();
  const navigate = useNavigate();
  const toastify = useToast();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownChildOptions, setDropDownChild] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectChildValue, setSelectChildValue] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [addTextLine, setAddTextLine] = useState([{ id: 1, value: "" }]);
  const [parentID, setParentID] = useState(0);
  const [mainPageSelection, setMainPageSelection] = useState([]);
  const [sectionPageSelection, setSectionPageSelection] = useState([]);
  const [mainPageDropDown, setMainPageDropdown] = useState("");
  const [sectionPageDropDown, setSectionPageDropdown] = useState("");
  const [alertData, setAlertData] = useState();
  const { fetchUpdateCompany, resultUpdate } = useUpdateCompanyContent();
  const { postCard, putCard, cardResult, cardLoading } = useCardPosting();
  const { content, contentload } = useBlogContent(blogTitle ? blogTitle : "");
  const { contentInfo, setUuid } = useGlobalContext();
  const [TextLine, setTextLine] = useState({
    title: "",
    address: "",
    description: "",
    contact: 0,
    email: "",
    location: "",
    service: "",
  });
  const [entries, setEntries] = useState([]);
  const [imageInsert, setImageInsert] = useState([
    {
      id: Date.now(),
      imagePreview: null,
    },
  ]);
  const [socialText, setSocialText] = useState([
    {
      id: 1,
      link: "",
      social: "",
    },
  ]);
  const initialSelectionContent = {
    Treeview: {
      child: !selectChildValue ? location : selectChildValue,
      name: name,
      title: title,
      imageTitle: imageInsert.imagePreview,
      uuid: viewContent ? viewContent.id : null,
    },
    Textline: {
      required: { ...TextLine, image: imageInsert.imagePreview },
      option: addTextLine,
      social: socialText,
    },
    Texteditor: editorContent,
    Personnel: { entries },
  };

  useEffect(() => {
    const { mainPageSelection, sectionPageSelection } = contents || {};
    if (mainPageSelection) {
      setMainPageSelection(
        Array.isArray(mainPageSelection) ? mainPageSelection : []
      );
    }
    if (sectionPageSelection) {
      setSectionPageSelection(
        Array.isArray(sectionPageSelection) ? sectionPageSelection : []
      );
    }
  }, [contents, mainPageSelection, sectionPageSelection]);

  useEffect(() => {
    if (viewContent) {
      console.log(viewContent);
      setUuid(viewContent.id);
      setTextLine((prev) => ({
        ...prev,
        title: viewContent.title,
        address: viewContent.address,
        description: viewContent.description,
      }));
      const childDropDown = viewContent.location;
      setSelectChildValue(childDropDown ? childDropDown : "");
      setImageInsert({ imagePreview: viewContent.title_image });
    }
    if (contentInfo) {
      setTextLine((prev) => ({
        ...prev,
        contact: contentInfo.contact,
        email: contentInfo.email,
        service: contentInfo.service,
        location: contentInfo.location_image,
      }));
      setEditorContent(contentInfo.content);
      const image_link = contentInfo.images.map((item, index) => ({
        id: index,
        uuid: item.id,
        value: item.images,
      }));
      setAddTextLine([
        ...image_link,
        { id: addTextLine.length + 1, value: "" },
      ]);
      const socials = contentInfo.social_links.map((item, index) => ({
        uuid: item.id,
        link: item.social_value,
        social: item.social_media,
      }));
      setSocialText(socials);
      const persons = contentInfo.people_involved.map((item, index) => ({
        uuid: item.id,
        imagePreview: item.image,
        personnelName: item.name,
        position: item.position,
      }));
      setEntries(persons);
    }
  }, [viewContent, contentInfo]);

  useEffect(() => {
    if (downTree) {
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

  useEffect(() => {
    if (cardResult) {
      const timer = setTimeout(() => {
        if (cardResult.message.includes("undefined")) {
          toastify("Something Went Wrong!", "error");
        } else {
          showAlert(
            "Successful",
            cardResult.message,
            "success",
            "",
            true,
            "Create New",
            "View list"
          ).then((result) => {
            if (result.isConfirmed) {
              handleReset();
            } else {
              navigate(-1);
            }
          });
        }
      });
      return () => clearTimeout(timer);
    }
  }, [cardResult, navigate]);

  const handleReset = () => {
    setEditorContent("");
    setAddTextLine([{ id: 1, value: "" }]);
    setParentID(0);
    setMainPageSelection([]);
    setSectionPageSelection([]);
    setMainPageDropdown("");
    setSectionPageDropdown("");
    setTextLine({
      title: "",
      address: "",
      description: "",
      contact: 0,
      email: "",
      location: "",
      service: "",
    });
    setEntries([
      {
        id: Date.now(),
        imagePreview: null,
        personnelName: "",
        position: "",
      },
    ]);
    setImageInsert([
      {
        id: Date.now(),
        imagePreview: null,
      },
    ]);
    setSocialText([
      {
        id: 1,
        link: "",
        social: "",
      },
    ]);
  };

  const handleParentDropdownChange = (e) => {
    const { name, value } = e.target;
    setSelectedValue(e.target.value);
    setValue(name, value);
  };

  const handleChildDropdownChange = (e) => {
    const { name, value } = e.target;
    setSelectChildValue(e.target.value);
    setValue(name, value);
  };

  const handleMainPage = (e) => {
    const value = e.target.value;
    setMainPageDropdown(value);
  };

  const handleSectionPage = (e) => {
    const value = e.target.value;
    setSectionPageDropdown(value);
  };

  const handleSave = () => {
    console.log(initialSelectionContent);
    postCard(initialSelectionContent);
  };

  const handleUpdate = () => {
    putCard(initialSelectionContent);
  };

  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleAddLink = () => {
    setAddTextLine([...addTextLine, { id: addTextLine.length + 1, value: "" }]);
  };

  const handleAddTextlineChange = (id, newValue) => {
    setAddTextLine(
      addTextLine.map((textLine) =>
        textLine.id === id ? { ...textLine, value: newValue } : textLine
      )
    );
  };

  const handleTextLineChange = (e) => {
    const { name, value } = e.target;
    setTextLine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValue(name, value);
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

    setAddTextLine((prev) => {
      const newState = {};

      reindexedTextLines.forEach((textLine) => {
        newState[textLine.id] = { id: textLine.id, value: textLine.value };
      });

      return newState;
    });
  };

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
      //setValue("image", e.target.files);
    }
  };

  const handleTitleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageInsert((prev) => ({
          ...prev,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      setValue("image", e.target.files);
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        [name]: value,
      };
      return updatedEntries;
    });
    // setValue(name, value);
  };

  const handleAddNewEntry = () => {
    const newId = Date.now();
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

  const handleSocialText = (e, index) => {
    const { name, value } = e.target;
    setSocialText((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleSocialDropDown = (selectedOption, index) => {
    setSocialText((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, social: selectedOption.target.value } : item
      )
    );
  };

  const handleAddSocial = () => {
    setSocialText((prev) => [
      ...prev,
      {
        id: Date.now(),
        social: "",
        link: "",
      },
    ]);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <div className="p-5">
      {name === "Blog" ? (
        <div className="flex min-w-full ">
          <Createblog
            name={name}
            path={path}
            title={title}
            blogContent={content}
          />
        </div>
      ) : (
        <div className="flex flex-col border rounded-lg shadow-lg   bg-gray-100">
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
                  name="parent"
                  {...register("parent")}
                  onChange={handleParentDropdownChange}
                />
                {errors.parent && (
                  <span className="text-red-500 text-sm italic">
                    {errors.parent.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="child">Child Name:</label>
                <Dropdown
                  id="child"
                  name="child"
                  placeholder={
                    !selectedValue
                      ? location
                        ? location
                        : "Select Parent First"
                      : selectChildValue
                      ? selectChildValue
                      : "Select Child"
                  }
                  value={selectChildValue}
                  options={
                    !selectedValue
                      ? [
                          {
                            value: location ? location : "",
                            label: location ? location : "Select Parent First",
                          },
                        ]
                      : dropdownChildOptions
                  }
                  {...register("child")}
                  onChange={handleChildDropdownChange}
                />
                {errors.child && (
                  <span className="text-red-500 text-sm italic">
                    {errors.child.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="child">Main Page:</label>
                <Dropdown
                  value={mainPageDropDown}
                  options={
                    mainPageSelection.length > 0 ? mainPageSelection : []
                  }
                  placeholder={mainPageDropDown || "Select Main Page"}
                  onChange={handleMainPage}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="child">Section Page:</label>
                <Dropdown
                  value={sectionPageDropDown}
                  options={
                    sectionPageSelection.length > 0 ? sectionPageSelection : []
                  }
                  placeholder={sectionPageDropDown || "Select Section Page"}
                  onChange={handleSectionPage}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex w-full ">
                <div className="flex flex-col w-full ">
                  <div className="flex flex-col w-full ">
                    <label htmlFor="Title">Title</label>
                    <Textline
                      className={
                        "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                      }
                      type={"text"}
                      placeholder={"Enter Title"}
                      value={TextLine.title}
                      name={"title"}
                      {...register("title")}
                      onChange={handleTextLineChange}
                    />
                    {errors.title && (
                      <span className="text-red-500 text-sm italic">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                  <div className="flex  flex-col w-full">
                    <label htmlFor="Description">Address</label>
                    <Textline
                      className={
                        "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                      }
                      type={"text"}
                      placeholder={"Enter Address"}
                      value={TextLine.address}
                      name={"address"}
                      {...register("address")}
                      onChange={handleTextLineChange}
                    />
                    {errors.address && (
                      <span className="text-red-500 text-sm italic">
                        {errors.address.message}
                      </span>
                    )}
                  </div>
                  <div className="flex  flex-col w-full">
                    <label htmlFor="Description">Description</label>
                    <Textline
                      className={
                        "w-full text-gray-900 focus:ring-4 h-[14vh] bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                      }
                      type={"text"}
                      placeholder={"Enter Description"}
                      value={TextLine.description}
                      name={"description"}
                      {...register("description")}
                      onChange={handleTextLineChange}
                      textarea={true}
                    />
                    {errors.description && (
                      <span className="text-red-500 text-sm italic">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-[30vw] justify-end ">
                  <div>
                    <UploadImage
                      imagePreview={imageInsert.imagePreview}
                      handleFileChange={(e) => handleTitleFileChange(e)}
                      className="flex "
                    />
                    {errors.image && (
                      <span className="text-red-500 text-sm italic">
                        {errors.image.message}
                      </span>
                    )}
                  </div>
                </div>
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
                    {...register("contact")}
                    onChange={handleTextLineChange}
                  />
                  {errors.contact && (
                    <span className="text-red-500 text-sm italic">
                      {errors.contact.message}
                    </span>
                  )}
                </div>
                <div className="flex  flex-col w-full">
                  <label htmlFor="Email">Email</label>
                  <Textline
                    className={
                      "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                    }
                    type={"email"}
                    placeholder={"Enter Email"}
                    value={TextLine.email}
                    name={"email"}
                    {...register("email")}
                    onChange={handleTextLineChange}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm italic">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex  flex-col w-full">
                  <label htmlFor="Service">Service Type</label>
                  <Textline
                    className={
                      "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                    }
                    type={"text"}
                    placeholder={"Enter Service Type"}
                    value={TextLine.service}
                    name={"service"}
                    onChange={handleTextLineChange}
                  />
                </div>
              </div>
              <div className="flex  flex-col w-full">
                <label htmlFor="Location">Location</label>
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
              </div>
              <div className="flex  flex-col w-full">
                <label htmlFor="Image">Image Link</label>
                <div className="flex flex-wrap  max-w-full gap-1">
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
                              handleAddTextlineChange(
                                textLine.id,
                                e.target.value
                              )
                            }
                            required={false}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="w-full flex mt-3">
                      <Button
                        icon={
                          <FontAwesomeIcon
                            icon={faAdd}
                            className="w-full border p-3  rounded-lg hover:bg-blue-500 hover:text-white"
                            onClick={handleAddLink}
                          />
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  name === "Company" ? "flex flex-col w-full" : "hidden"
                }
              >
                <label htmlFor="personel">Add Personnel </label>
                <div className="grid grid-cols-3 gap-2">
                  {entries.map((entry, index) => (
                    <div className="px-5 " key={entry.id}>
                      <div className="p-2">
                        <UploadImage
                          imagePreview={entry.imagePreview}
                          handleFileChange={(e) => handleFileChange(index, e)}
                          style={{ width: "15vw" }}
                        />
                      </div>
                      <div className="flex flex-col p-2">
                        <Textline
                          className="w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                          type="text"
                          placeholder="Personnel Name"
                          name="personnelName"
                          value={entry.personnelName}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </div>
                      <div className="flex flex-col p-2">
                        <Textline
                          className="w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                          type="text"
                          placeholder="Position"
                          name="position"
                          value={entry.position}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </div>
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
              <div className="flex  flex-wrap w-full p-2 gap-3">
                {socialText &&
                  socialText.map((item, index) => (
                    <div className="flex flex-col" key={index}>
                      <Dropdown
                        options={socialmedia.dropdown}
                        name="social"
                        placeholder={
                          item.social === ""
                            ? "Select Social Media"
                            : item.social
                        }
                        value={item.social}
                        onChange={(selectedOption) =>
                          handleSocialDropDown(selectedOption, index)
                        }
                      />
                      <Textline
                        className="w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        type={"text"}
                        name="link"
                        value={item.link}
                        onChange={(e) => handleSocialText(e, index)}
                        placeholder="Enter social media link (optional)"
                      />
                    </div>
                  ))}

                <div className=" flex items-center">
                  <Button
                    icon={
                      <FontAwesomeIcon
                        icon={faAdd}
                        className="border p-3 mt-2 rounded-lg hover:bg-blue-500 hover:text-white"
                      />
                    }
                    onClick={handleAddSocial}
                  />
                </div>
              </div>
              <div className="flex p-2 w-full justify-center">
                <Button
                  text={title ? "Update" : "Create"}
                  className={
                    title
                      ? "min-w-64 border p-2  rounded-lg hover:bg-green-500 hover:text-gray-100 hover:border-none"
                      : "min-w-64 border p-2  rounded-lg hover:bg-blue-500 hover:text-gray-100 hover:border-none"
                  }
                  onClick={title ? handleUpdate : handleSubmit(handleSave)}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contentcreate;
