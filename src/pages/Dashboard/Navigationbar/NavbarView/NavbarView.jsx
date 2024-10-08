import React, { useEffect, useState } from "react";
import UploadImage from "../../../../components/UploadImage/UploadImage";
import Textline from "../../../../components/Textline/Textline";
import Button from "../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function NavbarView(props) {
  const { name, path, image } = props;
  const [textline, setTextLine] = useState({ name: "", path: "", image: null });

  useEffect(() => {
    setTextLine({
      name: name || "",
      path: path || "",
      image: image || "",
    });
  }, [name, path, image]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTextLine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNavbarImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTextLine((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    setTextLine({
      name: "",
      path: "",
      image: null,
    });
  };

  const handleAdd = () => {
    const { name, path, image } = textline;
    if (!name || !path || !image) {
      alert("field required!");
      return;
    }
    alert(`${name} is create successfully!`);
  };

  const handleUpdate = () => {};

  return (
    <>
      <div className={"flex p-5  w-[50vw]"}>
        <div className="flex flex-col p-5 border-4 border-dashed rounded-lg w-[50vw] justify-center gap-2">
          <div className="flex justify-between p-5 border-4 rounded-lg  items-center ">
            <div className="flex">
              <h1 className="text-2xl">
                {textline.name ? "Update" : "Create New"} Navigation Bar
              </h1>
            </div>
            <Button
              icon={
                <FontAwesomeIcon
                  icon={faAdd}
                  className="text-2xl border rounded-full text-gray-300 border-gray-900 text-gray-900  py-2 px-3 transform  transition-transform duration-500 hover:scale-105 hover:bg-green-500 hover:text-white hover:border-none"
                />
              }
              className={""}
              onClick={() => handleCreate()}
            />
          </div>
          <div className="flex w-full justify-center ">
            <UploadImage
              handleFileChange={(e) => handleNavbarImageChange(e)}
              imagePreview={textline.image}
              className="w-[15vw]"
            />
          </div>
          <div className="flex justify-center w-full">
            <div className="flex flex-col w-[15vw] justify-center   gap-2 ">
              <Textline
                type={"text"}
                placeholder={"Enter Navbar Title"}
                value={textline.name}
                name="name"
                onChange={handleOnChange}
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
              />
              <Textline
                type={"text"}
                placeholder={"Enter Navbar Path"}
                value={textline.path}
                name="path"
                onChange={handleOnChange}
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
              />
              <Button
                text={textline.name === name ? "Update" : "Create"}
                className={
                  textline.name
                    ? "px-5 py-2 rounded-lg hover:bg-green-500 hover:text-white border"
                    : "px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white border"
                }
                onClick={textline.name === name ? handleUpdate : handleAdd}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarView;
