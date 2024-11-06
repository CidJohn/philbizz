import React, { useEffect, useState } from "react";
import UploadImage from "../../../../components/UploadImage/UploadImage";
import Textline from "../../../../components/Textline/Textline";
import Button from "../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { formSchema } from "./NavbarValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "../../../../components/Sonner/Sonner";
import useNavbarSettings, {
  useNavbarView,
} from "../../../../helper/database/useNavbarSettings";
import { useNavigate } from "react-router-dom";
import useAlert from "../../../../helper/alert/useAlert";

function NavbarView(props) {
  const { name, path, image, id, restrict, navbarData } = props;
  const toastify = useToast();
  const navigate = useNavigate();
  const showalert = useAlert();
  const [textline, setTextLine] = useState({ name: "", path: "", icons: null });
  const [isRestricted, setRestrict] = useState(false);
  const [navbarList, setNavbarList] = useState();
  const [getID, setID] = useState();
  const { postNavbar, putNavbar, navbarResult, navbarLoading } =
    useNavbarSettings();
  useEffect(() => {
    setTextLine({
      name: name || "",
      path: path || "",
      icons: image || "",
    });
    setRestrict(!!restrict);
    setNavbarList(navbarData);
    setID(id);
  }, [name, path, image, restrict, navbarData, id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTextLine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValue(name, value);
  };

  const handleNavbarImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTextLine((prev) => ({
          ...prev,
          icons: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setValue("image", e.target.files);
    }
  };

  const handleAdd = () => {
    setID();
    setTextLine({
      name: "",
      path: "",
      image: null,
    });
    setRestrict(false);
  };

  const handleCreate = () => {
    const { name, path, icons } = textline;
    const payload = { ...textline, restrict: isRestricted ? 19 : null };
    console.log(payload);
    if (!name || !path || !icons) {
      toastify("field required!", "error");
      return;
    }
    try {
      if (postNavbar(payload)) {
        toastify(`${name} Navigation Bar is create successfully!`, "success");
        handleReload();
      }
    } catch (error) {
      toastify(`Failed to Create New ${name} Navbar.`, "error");
    }
  };

  const handleCheckBox = (e) => {
    setRestrict(e.target.checked);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleUpdate = (appID) => {
    const { name, path, icons } = textline;
    const payload = {
      ...textline,
      id: appID,
      restrict: isRestricted ? 19 : null,
    };
    if (!name || !path || !icons) {
      toastify("field required!", "error");
      return;
    }
    try {
      if (putNavbar(payload)) {
        toastify(`${name} Navigation Bar is Update successfully!`, "success");
        handleReload();
      }
    } catch (error) {
      toastify(`Failed to Update New ${name} Navbar.`, "error");
    }
  };

  const handleReload = () => {
    navigate("/dashboard/reload");
    setTimeout(() => {
      setNavbarList(navbarData);
      navigate("/dashboard/Navigation", { state: { navbar: navbarList } });
    }, 1000);
  };

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
              onClick={() => handleAdd()}
            />
          </div>
          <div className="flex flex-col w-full items-center ">
            <UploadImage
              handleFileChange={(e) => handleNavbarImageChange(e)}
              imagePreview={textline.icons}
              className="w-[15vw]"
            />
            {errors.image && (
              <span className="text-red-500 text-sm italic ">
                {errors.image.message}
              </span>
            )}
          </div>
          <div className="flex justify-center w-full">
            <div className="flex flex-col w-[15vw] justify-center   gap-2 ">
              <Textline
                type={"text"}
                placeholder={"Enter Navbar Title"}
                value={textline.name}
                name="name"
                {...register("name")}
                onChange={handleOnChange}
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
              />
              {errors.name && (
                <>
                  <p className="text-sm text-red-500 italic">
                    {errors.name.message}
                  </p>
                </>
              )}
              <Textline
                type={"text"}
                placeholder={"Enter Navbar Path"}
                value={textline.path}
                name="path"
                {...register("path")}
                onChange={handleOnChange}
                className={
                  "w-full text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                }
              />
              {errors.path && (
                <>
                  <p className="text-sm text-red-500 italic">
                    {errors.path.message}
                  </p>
                </>
              )}
              <div className="flex items-center">
                <Textline
                  id="restricted"
                  type={"checkbox"}
                  checked={isRestricted}
                  onChange={handleCheckBox}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
                <label
                  htmlFor="restricted"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Restrict {"(Optional)"}
                </label>
              </div>
              <Button
                text={getID ? "Update" : "Create"}
                className={
                  textline.name
                    ? "px-5 py-2 rounded-lg hover:bg-green-500 hover:text-white border"
                    : "px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white border"
                }
                onClick={
                  getID
                    ? () => handleUpdate(getID)
                    : handleSubmit(() => handleCreate())
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarView;
