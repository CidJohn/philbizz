import React, { useState } from "react";
import Textline from "../../../../components/Textline/Textline";
import UploadImage from "../../../../components/UploadImage/UploadImage";
import Button from "../../../../components/Button/Button";
import useAlert from "../../../../helper/alert/useAlert";
import { useBlogPost } from "../../../../helper/database/useBlogSettings";
import { useLocation, useNavigate } from "react-router-dom";
import TextEditor from "../../../../components/Texteditor/Texteditor";

const BlogPost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id, username } = state || { id: null, username: null };
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

  const { fetchBlogTitle, fetchBlogDesc } = useBlogPost();
  const showAlert = useAlert();

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
  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleUpdate = () => {};
  const handleSavePost = () => {
    const initialData = {
      id: id,
      header: { text: textline, image: imageInsert.imagePreview },
      content: editorContent,
    };
    console.log(initialData)
  };

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
                        className={
                          "min-h-full bg-gray-100 p-4 shadow-sm rounded-lg border"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-center p-2 ">
                    <Button
                      text={"Create New Post"}
                      className={
                        username
                          ? "border  px-12 py-3 bg-[#390099] shadow-lg rounded-lg transform transition-transform duration-500 hover:scale-105 text-gray-200"
                          : "border  px-12 py-3 bg-[#390099] shadow-lg rounded-lg transform transition-transform duration-500 hover:scale-105 text-gray-200"
                      }
                      onClick={handleSavePost}
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
