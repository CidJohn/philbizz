import React, { useEffect, useState } from "react";
import Textline from "../../../../../components/Textline/Textline";
import TextEditor from "../../../../../components/Texteditor/Texteditor";
import UploadImage from "../../../../../components/UploadImage/UploadImage";
import Button from "../../../../../components/Button/Button";
import {
  useBlogPost,
  usePostBlogContent,
  useUpdateBlogContent,
} from "../../../../../helper/database/useBlogSettings";
import restAPI from "../../../../../helper/database/restAPI";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import blog_category from "../../../../../content/blog_categories.json";
import { useToast } from "../../../../../components/Sonner/Sonner";
import useAlert from "../../../../../helper/alert/useAlert";
import Spinner from "../../../../../components/Spinner/Spinner";

function Createblog(props) {
  const imagelink = restAPI();
  const toastify = useToast();
  const { name, path, title, blogContent } = props;
  const { fetchBlogUpdate, resultBlogUpdate, blogLoading } =
    useUpdateBlogContent();
  const { postBlog, resultPost, blogPostLoading } = useBlogPost();
  const [timerLoader, setTimerLoader] = useState(true);
  const [editorContent, setEditorContent] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [dropdownChildValue, setDropdownChildValue] = useState("");
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogCategoryChild, setBlogCategoryChild] = useState([]);
  const [fileImage, setFileImage] = useState(null);

  const [imageInsert, setImageInsert] = useState([
    {
      id: Date.now(),
      imagePreview: null,
    },
  ]);

  const [textline, setTextLine] = useState({
    title: "",
    description: "",
  });
  const showAlert = useAlert();

  useEffect(() => {
    if (blogContent) {
      setTextLine({
        id: blogContent.blogToken,
        title: blogContent.title ? blogContent.title : "",
        description: blogContent.description ? blogContent.description : "",
      });
      setImageInsert({
        imagePreview: blogContent.image2
          ? blogContent.image2
          : blogContent.image1
          ? imagelink.image + blogContent.image1
          : "",
      });
    }
    if (blogContent.images) {
      blogContent.images.map((item) => {
        setEditorContent(item.content);
      });
    }
  }, [blogContent]);

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
  useEffect(() => {
    setTimerLoader(true);
    const timer = setTimeout(() => {
      if (resultPost) {
        toastify("New Blog is Created!", "success");
        showAlert(
          "Successfull",
          `${resultPost.title} is Create Successfully!`,
          "success",
          "",
          false,
          "Ok",
          "",
          "blue",
          ""
        ).then((res) => {
          if (res.isConfirmed) {
            setTextLine({ title: "", description: "" });
            setEditorContent("");
            setImageInsert({});
          }
        });
      }
      setTimerLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resultPost]);

  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setTextLine((prevText) => ({
      ...prevText,
      [name]: value,
    }));
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
    }
  };

  const handleSavePost = () => {
    const initialData = {
      title: textline.title,
      description: textline.description,
      image: fileImage,
      content: editorContent,
      comment: [],
    };
    postBlog(initialData, imageInsert.imagePreview);
  };

  const handleUpdate = () => {
    const initials = {
      header: {
        oldTitle: title,
        text: textline,
        image: imageInsert.imagePreview,
      },
      content: editorContent,
    };
    if (fetchBlogUpdate(initials)) {
      try {
        console.log(initials);
        toastify(`Blog Updated!`, "success");
      } catch (error) {
        toastify("Failed to Updates your blog", "error");
      }
    }
  };

  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setDropdownValue(value);
  };
  const handleChangeChildCategory = (e) => {
    const { value } = e.target;
    setDropdownChildValue(value);
  };
  if (timerLoader) {
    return (
      <div className="w-[40vw] text-2xl font-bold flex items-center justify-center mx-auto">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex w-full h-full ">
      <div className="border rounded-lg shadow-lg bg-gray-100 min-w-80 min-h-80 p-2">
        <div className="flex gap-3">
          <h1 className="text-2xl font-sans font-bold">{name} Form</h1>
          <div className="flex">
            <Dropdown
              value={dropdownValue}
              options={blogCategory}
              placeholder={
                dropdownValue ? dropdownValue : "Select Parent Category"
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
        <div className="flex ">
          <div className="flex flex-col w-[60vw]">
            <div className="flex flex-col p-2 ">
              <Textline
                label={"Title"}
                placeholder={"Enter Title"}
                className={
                  "w-full  text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-14 p-2  "
                }
                name={"title"}
                value={textline.title}
                onChange={handleTextChange}
              />
            </div>
            <div className="flex flex-col p-2 w-full ">
              <Textline
                label={"Description"}
                placeholder={"Enter Title"}
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-14 p-2  "
                }
                name={"description"}
                value={textline.description}
                onChange={handleTextChange}
                textarea={true}
                style={{ height: "15vh" }}
              />
            </div>
          </div>
          <div className="flex p-2  justify-center">
            <UploadImage
              handleFileChange={(e) => handleUploadChange(e)}
              imagePreview={imageInsert.imagePreview}
              style={{ width: "15vw" }}
            />
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
              className={"min-h-full bg-white p-4 shadow-sm rounded-lg border"}
            />
          </div>
        </div>
        <div className="flex justify-center p-2 ">
          <Button
            text={title ? "Update Post" : "Create New Post"}
            className={
              title
                ? "border p-2 bg-white rounded-lg hover:bg-green-700 hover:text-white"
                : "border p-2 bg-white rounded-lg hover:bg-blue-700 hover:text-white"
            }
            onClick={title ? handleUpdate : handleSavePost}
          />
        </div>
      </div>
    </div>
  );
}

export default Createblog;
