import React from "react";
import Button from "../Button/Button";
import i18n from "../../i18n/i18n";

const Translation = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // Save the language in localStorage
  };
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => changeLanguage("en")}
        text={"English"}
        className={
          "flex items-center justify-center border rounded p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />

      <Button
        onClick={() => changeLanguage("ko")}
        text={"Korean"}
        className={
          "flex items-center justify-center border rounded p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />
      <Button
        onClick={() => changeLanguage("ja")}
        text={"Japanese"}
        className={
          "flex items-center justify-center border rounded p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />
    </div>
  );
};

export default Translation;
