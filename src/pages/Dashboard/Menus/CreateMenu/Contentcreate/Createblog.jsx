import React, { useEffect, useState } from "react";
import Textline from "../../../../../components/Textline/Textline";
import TextEditor from "../../../../../components/Texteditor/Texteditor";
import UploadImage from "../../../../../components/UploadImage/UploadImage";
import Button from "../../../../../components/Button/Button";
import { usePostBlogContent } from "../../../../../helper/database/useBlogSettings";
import restAPI from "../../../../../helper/database/restAPI";

function Createblog(props) {
  const imagelink = restAPI();
  const { name, path, title, blogContent } = props;
  const { fetchPostBlog, result, postloading } = usePostBlogContent();
  const [editorContent, setEditorContent] = useState("");
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePost = () => {
    const initials = {
      header: { text: textline, image: imageInsert.imagePreview },
      content: editorContent,
    };
    fetchPostBlog(initials);
    console.log(initials);
    console.log(result);
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
    console.log(initials);
    console.log(result);
  };

  return (
    <div className="flex w-full h-full ">
      <div className="border rounded-lg shadow-lg bg-gray-100 min-w-80 min-h-80 p-2">
        <h1 className="text-2xl font-bold">{name} Form</h1>
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
              />
            </div>
          </div>
          <div className="flex p-2  justify-center">
            <UploadImage
              handleFileChange={(e) => handleUploadChange(e)}
              imagePreview={imageInsert.imagePreview}
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
              "border p-2 bg-white rounded-lg hover:bg-green-700 hover:text-white"
            }
            onClick={title ? handleUpdate : handleSavePost}
          />
        </div>
      </div>
    </div>
  );
}

export default Createblog;
