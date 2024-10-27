import React, { useEffect, useState } from "react";
import Textline from "../../../../components/Textline/Textline";
import UploadImage from "../../../../components/UploadImage/UploadImage";
import Button from "../../../../components/Button/Button";
import useAlert from "../../../../helper/alert/useAlert";
import { useBlogPost } from "../../../../helper/database/useBlogSettings";
import { useLocation, useNavigate } from "react-router-dom";
import TextEditor from "../../../../components/Texteditor/Texteditor";
import blog_category from "../../../../content/blog_categories.json";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./BlogValidation";

const BlogPost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userIdentity } = state || { userIdentity: null };
  const [editorContent, setEditorContent] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [dropdownChildValue, setDropdownChildValue] = useState("");
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogCategoryChild, setBlogCategoryChild] = useState([]);
  const [imageInsert, setImageInsert] = useState([
    {
      id: Date.now(),
      imagePreview: null,
    },
  ]);
  const [fileImage, setFileImage] = useState(null);

  const [textline, setTextLine] = useState({
    title: "",
    description: "",
  });
  const { postBlog, resultPost } = useBlogPost();
  const showAlert = useAlert();

  useEffect(() => {
    if (blog_category) {
      const itemBlogParent = [
        { value: "", label: "Select Parent Category" },
        ...blog_category.map((item) => ({
          value: item.name,
          label: item.name,
        })),
      ];
      const itemBlogChild = [
        { value: "", label: "Select Children Category" },
        ...blog_category
          .filter((item) => item.name === dropdownValue)
          .flatMap((item) =>
            item.children
              ? item.children.map((child) => ({
                  value: child.name,
                  label: child.name,
                }))
              : []
          ),
      ];

      setBlogCategoryChild(itemBlogChild);
      setBlogCategory(itemBlogParent);

      if (itemBlogChild.length > 0) {
        setDropdownChildValue(itemBlogChild[0].value);
      } else {
        setDropdownChildValue("");
      }
    }
  }, [blog_category, dropdownValue]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setTextLine((prevText) => ({
      ...prevText,
      [name]: value,
    }));
    setValue(name, value);
  };

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageInsert((prev) => ({
          ...prev,
          imagePreview: reader.result,
        }));
        setFileImage(file);
      };
      reader.readAsDataURL(file);
      setValue("image", e.target.files);
    }
  };

  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleUpdate = () => {};

  const handleSavePost = () => {
    const initialData = {
      title: textline.title,
      description: textline.description,
      //image: imageInsert.imagePreview,
      //image: "http://example.com/path/to/image.jpg",
      image: fileImage,
      content: editorContent,
    };
    console.log(initialData);
    postBlog(initialData);
  };

  if (resultPost) {
    console.log(resultPost);
  }

  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setDropdownValue(value);
  };
  const handleChangeChildCategory = (e) => {
    const { value } = e.target;
    setDropdownChildValue(value);
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
    <div>
      <div className="min-w-full border  bg-[#390099]/5">
        <div className=" p-4 w-[70vw]  max-h-full overflow-hidden mx-auto ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-100 ">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Blog </h1>
                <p>Make my day by telling me a story about yourself</p>
              </div>
              <button
                type="button"
                className="text-gray-400 bg-transparent   hover:border hover:border-[#390099] hover:text-[#390099] rounded-full text-sm w-12 h-12 ms-auto inline-flex justify-center items-center "
                onClick={handleClose}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 flex justify-center bg-gray-100 ">
              <div className="flex w-full h-full ">
                <div className=" min-w-80 min-h-80 p-2">
                  <div className="flex ">
                    <div className="flex flex-col w-[60vw]">
                      <h1 className="text-sm font-sans">Category:</h1>
                      <div className="flex gap-2">
                        <div className="flex ">
                          <Dropdown
                            value={dropdownValue}
                            options={blogCategory}
                            placeholder={
                              dropdownValue
                                ? dropdownValue
                                : "Select Parent Category"
                            }
                            onChange={handleChangeCategory}
                          />
                        </div>
                        <div className="flex">
                          <Dropdown
                            value={dropdownChildValue}
                            options={
                              !dropdownValue
                                ? [
                                    {
                                      value: "",
                                      label: "Select Parent First",
                                    },
                                  ]
                                : blogCategoryChild
                            }
                            placeholder={
                              !dropdownValue
                                ? "No Children Available"
                                : dropdownChildValue
                                ? dropdownChildValue
                                : "Select Children Category"
                            }
                            onChange={handleChangeChildCategory}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-2 ">
                        <h1 className="text-sm font-sans">Title</h1>
                        <Textline
                          placeholder={"Enter Title"}
                          className={
                            "w-full  text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-14 p-2  "
                          }
                          name={"title"}
                          value={textline.title}
                          onChange={handleTextChange}
                        />
                        {errors.title && (
                          <span className="text-red-500 text-sm italic">
                            {errors.title.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col p-2 w-full ">
                        <h1 className="text-sm font-sans">Description</h1>
                        <Textline
                          placeholder={"Enter Title"}
                          className={
                            "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-14 p-2  "
                          }
                          name={"description"}
                          value={textline.description}
                          onChange={handleTextChange}
                          textarea={true}
                          style={{ height: "20vh" }}
                        />
                        {errors.description && (
                          <span className="text-red-500 text-sm italic">
                            {errors.description.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col p-2  justify-center">
                      <UploadImage
                        handleFileChange={(e) => handleUploadChange(e)}
                        imagePreview={imageInsert.imagePreview}
                      />
                      {errors.image && (
                        <span className="text-red-500 text-sm italic">
                          {errors.image.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col p-2">
                    <label htmlFor="Body" className="text-md font-bold">
                      Body Content
                    </label>
                    <div className="flex  flex-col ">
                      <TextEditor
                        value={editorContent}
                        onChange={handleContentChange}
                        placeholder="Write your content here..."
                        className={
                          "min-h-full bg-white p-4 shadow-sm rounded-lg border"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-center p-2 ">
                    <Button
                      text={"Create New Post"}
                      className={
                        userIdentity
                          ? "border  px-12 py-3 bg-[#390099] shadow-lg rounded-lg transform transition-transform duration-500 hover:scale-105 text-gray-200"
                          : "border  px-12 py-3 bg-[#390099] shadow-lg rounded-lg transform transition-transform duration-500 hover:scale-105 text-gray-200"
                      }
                      onClick={handleSubmit(handleSavePost)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
