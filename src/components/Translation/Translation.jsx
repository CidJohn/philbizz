import React from "react";
import Button from "../Button/Button";
import i18n from "../../i18n/i18n";
import Images from "../Image/Images";

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
        icon={<Images src={"flagIcon/english.png"} style={{width: "20px"}} />}
        className={
          IsOpenMenu
            ? "flex items-start justify-start border rounded p-4 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
            : " border rounded-full p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />

      <Button
        onClick={() => changeLanguage("ko")}
        icon={<Images src={"flagIcon/korean.png"} style={{width: "20px"}} />}
        className={
          IsOpenMenu
            ? "flex items-start justify-start border rounded p-4 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
            : " border rounded-full p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />
      <Button
        onClick={() => changeLanguage("ja")}
        icon={<Images src={"flagIcon/japanese.png"} style={{width: "20px"}} />}
        className={
          IsOpenMenu
            ? "flex items-start justify-start border rounded p-4 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
            : " border rounded-full p-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
        }
      />
    </div>
  );
};

export default Translation;
