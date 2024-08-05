import React, { useState } from "react";
import Textline from "../../../../components/Textline/Textline";
import UploadImage from "../../../../components/UploadImage/UploadImage";
import Button from "../../../../components/Button/Button";
import useAlert from "../../../../helper/alert/useAlert";

const BlogPost = (props) => {
  const { handleOpen } = props;

  const initialData = {
    title: "",
    image: null,
    description: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [dataArray, setDataArray] = useState([]);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const showAlert = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (file) => {
    setFormData({ ...formData, image: file });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    const { title, image, description } = formData;
    if (description && image) {
      setDataArray((prevArray) => [
        ...prevArray,
        { title, description, image },
      ]);

      setFormData(initialData);
      setIsTitleVisible(false);
      setImagePreview(null);
    }
  };

  const handleUploadClick = async () => {
    try {
      await uploadData(dataArray);
      showAlert("successfully", "Blog uploaded successfully!", "success");
      setDataArray([]);
    } catch (error) {
      console.error("Error uploading data:", error);
      showAlert("Warning", "Failed to upload data.", "warning");
    }
  };

  const uploadData = async (data) => {
    console.log("Uploading data:", data);
    handleOpen();
  };

  return (
    <div>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-screen-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Posting{" "}
                {dataArray.length === 0
                  ? "Title Page"
                  : `Image #${dataArray.length}`}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleOpen}
              >
                <svg
                  className="w-3 h-3"
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
            <div className="p-4 md:p-5 flex justify-center text-center">
              <form className="space-y-4" onSubmit={handleAddClick}>
                {isTitleVisible && (
                  <Textline
                    label={"Title Page"}
                    type={"text"}
                    name="title"
                    className={"border rounded p-2"}
                    placeholder={"Title Page"}
                    value={formData.title}
                    onChange={handleChange}
                  />
                )}

                <UploadImage
                  onUpload={handleFileUpload}
                  imagePreview={imagePreview}
                  handleFileChange={handleFileChange}
                />
                <Textline
                  textarea={true}
                  label={"Image Description"}
                  type={"text"}
                  name="description"
                  className={"border rounded p-2 w-[500px]"}
                  placeholder={"Description"}
                  value={formData.description}
                  onChange={handleChange}
                />
                <div className="flex justify-end space-x-4">
                  <Button
                    text={"Add"}
                    className={
                      "text-gray-200 py-1 px-3 bg-blue-700 rounded transform transition-transform duration-500 hover:scale-105"
                    }
                    type="submit"
                  />
                  {dataArray.length === 0 ? (
                    ""
                  ) : (
                    <Button
                      text={"Upload"}
                      className={
                        "text-gray-200 py-1 px-3 bg-green-700 rounded transform transition-transform duration-500 hover:scale-105"
                      }
                      onClick={handleUploadClick}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
