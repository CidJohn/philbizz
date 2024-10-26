import React, { useEffect, useState } from "react";
import Textline from "../../components/Textline/Textline";
import Button from "../../components/Button/Button";
import { useRegistration } from "../../helper/auth/useAuthentication";
import useAlert from "../../helper/alert/useAlert";
import UploadImage from "../../components/UploadImage/UploadImage";

export const Registration = ({ handleRegistrationClose, handleLoginOpen }) => {
  const initialData = {
    imgurl: "http://example.com/image.jpg",
    //imgurl: null,
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    mobile_number: "",
    password: "",
    confirmPassword: "",
    access_level: "CUSTOMER",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const { fetchRegistration, response, error, loadData } = useRegistration();
  const showAlert = useAlert();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "Firstname is required.";
    if (!formData.middlename) newErrors.middlename = "Middle name is required.";
    if (!formData.lastname) newErrors.lastname = "Lastname is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.mobile_number) {
      newErrors.mobile_number = "Number is required.";
    } else if (!/^09\d{9}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Number format is invalid. Use '09*********'.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //console.log(formData);
      fetchRegistration(formData);
    }
  };

  useEffect(() => {
    if (response) {
      showAlert("Success", "Registration successful!", "success");
      handleRegistrationClose();
      handleLoginOpen();
    }
  }, [response, showAlert, handleRegistrationClose, handleLoginOpen]);

  useEffect(() => {
    if (error) {
      const newErrors = {};
      if (error.includes("tblusers.number_UNIQUE"))
        newErrors.number = "Number is already being used";
      if (error.includes("tblusers.username"))
        newErrors.username = "Username is already being used";
      if (error.includes("tblusers.email"))
        newErrors.email = "Email is already being used";
      setErrors(newErrors);
    }
  }, [error]);

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imgurl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-[40vw] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create your Account
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleRegistrationClose}
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
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex  justify-center">
                  <UploadImage
                    handleFileChange={(e) => handleUploadChange(e)}
                    imagePreview={formData.imgurl}
                    style={{ width: "15vw" }}
                  />
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <Textline
                      type="text"
                      name="firstname"
                      id="firstname"
                      className={`bg-gray-50 border ${
                        errors.firstname ? "border-red-500" : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                      placeholder="John "
                      label={"Firstname"}
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                    {errors.firstname && (
                      <p className="text-red-500 text-sm">{errors.firstname}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <Textline
                      type="text"
                      name="middlename"
                      id="middlename"
                      className={`bg-gray-50 border ${
                        errors.middlename ? "border-red-500" : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                      placeholder="C"
                      label={"Middle name"}
                      value={formData.middlename}
                      onChange={handleChange}
                    />
                    {errors.middlename && (
                      <p className="text-red-500 text-sm">
                        {errors.middlename}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Textline
                      type="text"
                      name="lastname"
                      id="lastname"
                      className={`bg-gray-50 border ${
                        errors.lastname ? "border-red-500" : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                      placeholder="Doe"
                      label={"Lastname"}
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-sm">{errors.lastname}</p>
                    )}
                  </div>
                </div>
                <div className="flex w-full gap-3 ">
                  <div className=" w-full">
                    <Textline
                      type="email"
                      name="email"
                      id="email"
                      className={`bg-gray-50 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                      placeholder="name@company.com"
                      label={"Email"}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className=" w-full">
                    <Textline
                      type="tel"
                      name="mobile_number"
                      id="mobile_number"
                      pattern="^09\d{9}$"
                      className={`bg-gray-50 border ${
                        errors.number ? "border-red-500" : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                      placeholder="09*********"
                      label={"Number"}
                      value={formData.mobile_number}
                      onChange={handleChange}
                    />
                    {errors.mobile_number && (
                      <p className="text-red-500 text-sm">
                        {errors.mobile_number}
                      </p>
                    )}
                  </div>
                </div>
                <Textline
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  label={"Password"}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <Textline
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  label={"Confirm password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  text={"Create Account"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
