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
      <header className='flex items-center justify-between w-full px-12 lg:px-60 py-4 bg-white shadow-md z-10'>
        <div className='hidden lg:flex'>
          <a
            href='/'
            className='hidden lg:flex font-bold text-3xl text-gray-800 bg-cover w-auto mx-auto p-3'
          >
            <Image src={"philbizzLogo.png"} style={{ width: "300px" }} />
          </a>
        </div>
        <div className='w-full flex p-2 items-center justify-between '>
          <div className='w-full flex items-center justify-center gap-2 lg:gap-6'>
            <div className='hidden md:block lg:w-[45rem]'>
              <SearchBar
                onSearch={handleSearch}
                isModalOpen={isModalOpen}
                handleModalOpen={handleModalOpen}
              />
            </div>
            <div className='-ml-7 mr-2 md:m-0'>
              <Translation />
            </div>
          </div>
          <div className=''>
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
        </div>
      </header>
    </React.Fragment>
  );
}
