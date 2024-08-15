import React, { useState } from "react";
import Textline from "../../../../components/Textline/Textline";
import UploadImage from "../../../../components/UploadImage/UploadImage";
import Button from "../../../../components/Button/Button";
import useAlert from "../../../../helper/alert/useAlert";
import { useBlogPost } from "../../../../helper/database/useBlogSettings";

const BlogPost = (props) => {
  const { handleOpen, userdata } = props;
  const initialData = {
    userid: userdata.id,
    title: "",
    image: null,
    description: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [dataArray, setDataArray] = useState([]);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const { fetchBlogTitle, fetchBlogDesc } = useBlogPost();
  const showAlert = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    const { userid, title, image, description } = formData;
    if (description && image) {
      setDataArray((prevArray) => [
        ...prevArray,
        { userid, title, description, image },
      ]);

      setFormData({
        ...initialData,
        userid: userdata.id,
        title: formData.title, // Preserve title
      });
      setIsTitleVisible(false);
      setImagePreview(null);
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      showAlert("Warning", "Make sure your Image is not Empty!", "warning");
    }
  };
  const handleBackClick = () => {
    if (currentStep > 0) {
      const previousData = dataArray[currentStep - 1];
      setDataArray((prevArray) => prevArray.slice(0, -1));
      setFormData({
        title: previousData.title,
        description: previousData.description,
        image: previousData.image,
        userid: previousData.userid,
      });

      if (previousData.image) {
        setImagePreview(URL.createObjectURL(previousData.image));
      } else {
        setImagePreview(null);
      }
      setCurrentStep((prevStep) => prevStep - 1);
      setIsTitleVisible(currentStep - 1 === 0);
    }
  };

  const handleUploadClick = async () => {
    try {
      const updatedDataArray = [...dataArray, formData];
      await uploadData(updatedDataArray);
      showAlert("Success", "Blog uploaded successfully!", "success");
      setDataArray([]);
      setFormData(initialData);
      setImagePreview(null);
      setCurrentStep(0);
    } catch (error) {
      console.error("Error uploading data:", error);
      showAlert("Warning", "Failed to upload data.", "warning");
    }
  };

  const uploadData = async (data) => {
    console.log(data);
    const titleProps = data.slice(0, 1);
    const descProps = data.slice(1);

    try {
      await fetchBlogTitle(titleProps);
      await fetchBlogDesc(descProps);
      handleOpen();
    } catch (error) {
      console.error("Error uploading blog:", error);
      showAlert("Warning", "Failed to upload blog data.", "warning");
    }
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
                {currentStep === 0 ? "Title Page" : `Image #${currentStep}`}
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
                    labelclass={""}
                    type={"text"}
                    name="title"
                    className={"border rounded p-2 min-w-full"}
                    placeholder={"Title Page"}
                    value={formData.title}
                    onChange={handleChange}
                  />
                )}

                <UploadImage
                  imagePreview={imagePreview}
                  handleFileChange={handleFileChange}
                />
                <Textline
                  textarea={true}
                  label={"Image Description"}
                  type={"text"}
                  name="description"
                  className={"border rounded p-2 min-w-full"}
                  placeholder={"Description"}
                  value={formData.description}
                  onChange={handleChange}
                />
                <div className="flex justify-end space-x-4">
                  {currentStep > 0 && (
                    <Button
                      text={"Edit Previous"}
                      className={
                        "text-gray-200 py-1 px-3 bg-gray-700 rounded transform transition-transform duration-500 hover:scale-105"
                      }
                      onClick={handleBackClick}
                      type="button"
                    />
                  )}
                  <Button
                    text={"Add"}
                    className={
                      "text-gray-200 py-1 px-3 bg-blue-700 rounded transform transition-transform duration-500 hover:scale-105"
                    }
                    type="submit"
                  />
                  {dataArray.length > 0 && (
                    <Button
                      text={"Upload"}
                      className={
                        "text-gray-200 py-1 px-3 bg-green-700 rounded transform transition-transform duration-500 hover:scale-105"
                      }
                      onClick={handleUploadClick}
                      type="button"
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
