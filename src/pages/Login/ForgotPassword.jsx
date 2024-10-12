import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "../../components/Sonner/Sonner";
import Textline from "../../components/Textline/Textline";
import Button from "../../components/Button/Button";
import { IoClose } from "react-icons/io5";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Field must be email")
    .required("Email is Required"),
});

export const ForgotPassword = ({ handleForgotPasswordClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const toastify = useToast();

  const onSubmit = (value) => {
    try {
      console.log(value);
      toastify("Reset link submitted.", "success");
      reset();
    } catch (error) {
      toastify("Failed to submit reset link.", "error");
    }
  };

  return (
    <div className="">
      <div
        id="forgot-password-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-[40rem] ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-start flex-col p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleForgotPasswordClose}
              >
                <IoClose className="text-2xl text-[#013A63]" />
                <span className="sr-only">Close modal</span>
              </button>
              <h3 className="text-xl font-semibold fira-sans-bold text-[#013A63] dark:text-white">
                Forgot Password
              </h3>
              <p className="fira-sans-condensed-regular text-slate-700">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <Textline
                  name="email"
                  className={`bg-gray-50 border text-gray-900 fira-sans-condensed-regular text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  placeholder="name@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
                <Button
                  type="submit"
                  className="flex fira-sans-regular items-center bg-[#013A63] w-full px-16 py-3 text-md text-white justify-center border rounded-md hover:bg-[#013A63]/95"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
