import React from "react";
import Button from "../Button/Button";
import i18n from "../../i18n/i18n";

const Translation = ({ IsOpenMenu }) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // Save the language in localStorage
  };
  return (
    <div
      className={IsOpenMenu ? "flex flex-col gap-2" : "flex flex-wrap gap-2"}
    >
      <Button
        onClick={() => changeLanguage("en")}
        text={"English"}
        className={
          IsOpenMenu
            ? "flex items-start justify-start border rounded p-4 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
            : " border rounded p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />

      <Button
        onClick={() => changeLanguage("ko")}
        text={"Korean"}
        className={
          IsOpenMenu
            ? "flex items-start justify-start border rounded p-4 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
            : " border rounded p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />
      <Button
        onClick={() => changeLanguage("ja")}
        text={"Japanese"}
        className={
          IsOpenMenu
            ? "flex items-start justify-start border rounded p-4 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
            : " border rounded p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />
    </div>
  );
};

export default Translation;
