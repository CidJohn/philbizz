import React, { useEffect, useState } from "react";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import TextEditor from "../../../../../components/Texteditor/Texteditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "../../../../../components/UploadImage/UploadImage";
import {
  useBusinessPost,
  useCompanyView,
  useUpdateCompanyContent,
} from "../../../../../helper/database/useBusinessData";
import socialmedia from "../../../../../content/socialmedia.json";
import {
  useCardPosting,
  useCreateCardContent,
  useUpdateCardContent,
} from "../../../../../helper/database/useCardSettings";
import Createblog from "./Createblog";
import {
  useCardInfo,
  useImgCardURL,
  useSocialContent,
} from "../../../../../helper/database/useCardInfo";
import { useBlogContent } from "../../../../../helper/database/useBlogSettings";
import useAlert from "../../../../../helper/alert/useAlert";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formSchema } from "./Contentvalidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import contents from "../../../../../content/content.json";
import { useToast } from "../../../../../components/Sonner/Sonner";

function Contentcreate(props) {
  const { downTree, path, category, name, title, location, blogTitle } = props;
  const showAlert = useAlert();
  const navigate = useNavigate();
  const toastify = useToast();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownChildOptions, setDropDownChild] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectChildValue, setSelectChildValue] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [addTextLine, setAddTextLine] = useState([{ id: 1, value: "" }]);
  const [newTextLine, setNewTextLine] = useState([]);
  const [parentID, setParentID] = useState(0);
  const [mainPageSelection, setMainPageSelection] = useState([]);
  const [sectionPageSelection, setSectionPageSelection] = useState([]);
  const [mainPageDropDown, setMainPageDropdown] = useState("");
  const [sectionPageDropDown, setSectionPageDropdown] = useState("");
  const { fetchBusinessContent, result, businessLoad } = useBusinessPost();
  const { fetchUpdateCompany, resultUpdate } = useUpdateCompanyContent();
  const { postCard, cardResult, cardLoading } = useCardPosting();
  const { getData, getURL, loadData } = useCardInfo(title);
  const { getImage, loadImage } = useImgCardURL(title);
  const { viewData, vieloading } = useCompanyView(title);
  const { content, contentload } = useBlogContent(blogTitle ? blogTitle : "");
  const { resSocial, load } = useSocialContent(parentID);
  const [TextLine, setTextLine] = useState({
    title: "",
    address: "",
    description: "",
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
    },
    Textline: {
      required: { ...TextLine, image: imageInsert.imagePreview },
      option: newTextLine,
      social: socialText,
    },
    Texteditor: editorContent,
  };

  const initialBusinessContent = {
    displayPosition: { mainPageDropDown, sectionPageDropDown },
    Treeview: {
      parent: selectedValue,
      child: selectChildValue,
      name: name,
      title: title,
      childloc: location,
      imageTitle: imageInsert.imagePreview,
    },
    TextLine: {
      required: { ...TextLine, image: imageInsert.imagePreview },
      option: newTextLine,
      social: socialText,
    },
    TextEditor: editorContent,
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
    if (viewData.info) {
      viewData.info.map((item) => {
        setTextLine({
          title: item.companyName,
          description: item.description,
          image: item.imgLOGO,
          contact: item.contact,
          email: item.email,
          location: item.locationURL,
          service: item.person,
          website: "",
          address: item.address,
        });
      });
    }

    if (viewData.images) {
      const imageContent = viewData.images.map((item) => item.content).join("");
      setEditorContent(imageContent);
    }

    if (viewData && Array.isArray(viewData.personnels)) {
      const personnel = viewData.personnels.map((item) => ({
        id: item.id || "",
        personnelName: item.personName || "",
        position: item.position || "",
        imagePreview: item.personPhoto || "",
      }));
      setEntries(personnel);
    }

    if (viewData?.product) {
      const product = viewData.product.map((item) => ({
        id: item.id,
        value: item.productImage || "",
      }));

      setAddTextLine(product);
      setNewTextLine(() =>
        product.reduce((acc, item) => {
          acc[item.id] = { value: item.productImage || "" };
          return acc;
        }, {})
      );
    }

    if (viewData.socials) {
      const socials = viewData.socials.map((item) => item);
      setSocialText(() => [
        ...socials.map((item) => ({
          id: item.id,
          social: item.SocialMedia,
          link: item.SocialValue,
        })),
      ]);
    }
  }, [viewData.info, viewData.images, viewData.personnels, viewData.socials]);

  useEffect(() => {
    if (getData) {
      getData.map((item) => {
        setTextLine({
          title: item.Name,
          address: item.address,
          description: item.desc,
          image: item.icon_image,
          contact: item.contact,
          email: item.email,
          service: item.type,
          location: getURL,
        });
        setImageInsert({ id: Date.now(), imagePreview: item.images || "" });
        setEditorContent(item.Content);
        setParentID(item.ParentID);
        const socials = resSocial ? resSocial.map((item) => item) : [];
        setSocialText(() => [
          ...socials.map((item) => ({
            id: item.ParentID,
            social: item.SocialMedia,
            link: item.SocialValue,
          })),
        ]);
      });
    }
    const textLink = getImage ? getImage.map((item) => item) : [];
    if (textLink.length > 0) {
      setAddTextLine(() =>
        textLink.map((url) => ({
          id: url.childID,
          value: url.imageURL || "",
        }))
      );

      setNewTextLine((prev) => ({
        ...prev,
        ...textLink.reduce((acc, url) => {
          acc[url.childID] = { id: url.childID, value: url.imageURL || "" };
          return acc;
        }, {}),
      }));
    }
  }, [getData, getURL, getImage, resSocial]);

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
    if (postCard(initialSelectionContent)) {
      if (cardResult) {
        toastify(cardResult, "success");
      } else {
        toastify(`Something Went Wrong!`, "error");
      }
    }
  };

  const handleUpdate = () => {
    if (name === "Business") {
      if (fetchUpdateCompany(initialBusinessContent)) {
        try {
          console.log(initialBusinessContent);
          toastify(` Successfully Update ${name} Content `, "success");
        } catch (error) {
          toastify("Failed to Submit Reply.", "error");
        }
      }
    } else {
      // if (fetchUpdateCard(initialSelectionContent)) {
      try {
        console.log(initialSelectionContent);
        toastify(` Successfully Update ${name} Content `, "success");
      } catch (error) {
        toastify("Failed to Submit Reply.", "error");
      }
      // }
    }
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

    setNewTextLine((prev) => {
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
                                className="border p-3  rounded-lg hover:bg-blue-500 hover:text-white"
                                onClick={
                                  textLine.id < addTextLine.length
                                    ? () => handleDeleteTextline(textLine.id)
                                    : handleAddLink
                                }
                              />
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={
                  name === "Business" ? "flex flex-col w-full" : "hidden"
                }
              >
                <label htmlFor="personel">Personnel </label>
                <div className="grid grid-cols-3 gap-2">
                  {entries.map((entry, index) => (
                    <div className="px-5 " key={entry.id}>
                      <div className="p-2">
                        <UploadImage
                          imagePreview={entry.imagePreview}
                          handleFileChange={(e) => handleFileChange(index, e)}
                          style={{ width: "15vw" }}
                        />
                        {/* {errors.image && (
                            <span className="text-red-500 text-sm italic">
                              {errors.image.message}
                            </span>
                          )} */}
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
                        {/* {errors.personnelName && (
                            <span className="text-red-500 text-sm italic">
                              {errors.personnelName.message}
                            </span>
                          )} */}
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
                        {/* {errors.position && (
                            <span className="text-red-500 text-sm italic">
                              {errors.position.message}
                            </span>
                          )} */}
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
