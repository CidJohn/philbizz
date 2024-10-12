import React, { useState } from "react";
import Image from "../Image/Image";
import SearchBar from "../Searchbar/Searchbar";
import Translation from "../Translation/Translation";
import LoginButton from "./HeaderComponents/LoginButton";
import { useTranslation } from "react-i18next";

export default function Header({ hidden }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistration, setRegistration] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const { t } = useTranslation();

  const handleSearch = () => {};

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRegistrationOpen = () => {
    setRegistration(!isRegistration);
    setIsModalOpen(false);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsModalOpen(!isModalOpen);
  };

  const handleForgotPasswordClose = () => {
    setIsForgotPassword(false);
  };

  return (
    <React.Fragment>
      <header className="flex items-center justify-between w-full px-60 py-4 bg-white shadow-md z-10">
        <div className="">
          <a
            href="/"
            className="font-bold text-3xl text-gray-800 flex bg-cover w-auto mx-auto p-3"
          >
            <Image src={"philbizz.png"} style={{ width: "200px" }} />
          </a>
        </div>
        <div className="w-full flex p-2 items-center justify-between ">
          <div className="w-full flex items-center justify-center gap-6">
            <div className="w-[45rem]">
              <SearchBar
                onSearch={handleSearch}
                isModalOpen={isModalOpen}
                handleModalOpen={handleModalOpen}
              />
            </div>
            <div className="">
              <Translation />
            </div>
          </div>
          <LoginButton
            translation={t}
            hidden={hidden}
            handleForgotPassword={handleForgotPassword}
            handleRegistrationOpen={handleRegistrationOpen}
            isRegistration={isRegistration}
            isForgotPassword={isForgotPassword}
            isModalOpen={isModalOpen}
            handleModalOpen={handleModalOpen}
            handleForgotPasswordClose={handleForgotPasswordClose}
          />
        </div>
      </header>
    </React.Fragment>
  );
}
