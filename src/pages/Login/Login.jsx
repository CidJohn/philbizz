import React, { useEffect, useState } from "react";
import Textline from "../../components/Textline/Textline";
import Button from "../../components/Button/Button";
import { useLogin } from "../../helper/auth/useAuthentication";
import useAlert from "../../helper/alert/useAlert";
import { useAuth } from "../../helper/auth/useAuthContext";

export const Login = ({
  handleModalOpen,
  handleRegistrationOpen,
  handleForgotPassword,
}) => {
  const initializeData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initializeData);
  const [errors, setErrors] = useState([]);
  const {
    fetchingLogin,
    access_token,
    refresh_token,
    loginLoad,
    accountId,
    error,
  } = useLogin();
  const { login, setRememberMe } = useAuth();

  const showAlert = useAlert();

  const handleValidation = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
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
    if (handleValidation()) {
      fetchingLogin(formData);
    }
  };

  const handleCheckBox = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    if (!isChecked) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (access_token && refresh_token) {
      showAlert(
        "Welcome",
        `Login Successfully!`,
        "success",
        "",
        false,
        "Okay",
        "",
        "#3085d6"
      );
      handleModalOpen();
      login(access_token, refresh_token, accountId);
    }
  }, [access_token, refresh_token, loginLoad, accountId]);

  useEffect(() => {
    if (error) {
      const newErrors = {};
      if (error.includes("Incorrect password"))
        newErrors.password = "You Enter Wrong Password!";
      if (error.includes("Cannot find user"))
        newErrors.username = "Cannot find user!";
      setErrors(newErrors);
    }
  }, [error]);

  return (
    <div className="">
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full z-60">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleModalOpen}
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
              <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                <div>
                  <Textline
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="name@company.com"
                    label={"Email"}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-red-300 italic font-bold text-sm">
                  {errors.username}
                </div>
                <div>
                  <Textline
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={
                      errors.password
                        ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    }
                    label={"Password"}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-red-300 italic font-bold text-sm">
                  {errors.password}
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Textline
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        onChange={handleCheckBox}
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <Button
                    className="text-blue-700 hover:underline dark:text-blue-500"
                    text={"Forgot Password"}
                    onClick={handleForgotPassword}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <Button
                    className="text-blue-700 hover:underline dark:text-blue-500"
                    text={"Create account"}
                    onClick={handleRegistrationOpen}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
