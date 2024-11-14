import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import i18n from "../../i18n/i18n";

const Translation = ({ IsOpenMenu }) => {
  const [activeLanguage, setActiveLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    setActiveLanguage(lng);
  };

  useEffect(() => {
    setActiveLanguage(localStorage.getItem("i18nextLng") || "en");
  }, []);

  return (
    <div className='flex gap-2 '>
      <Button
        onClick={() => changeLanguage("en")}
        className={
          activeLanguage === "en"
            ? "border border-[#013A63] bg-[#013A63] text-white fira-sans-regular px-4 p-2 rounded-md hover:bg-[#013A63]/95 hover:text-slate-100"
            : "border border-[#013A63] bg-transparent text-black fira-sans-regular px-4 p-2 rounded-md hover:bg-[#013A63]/95 hover:text-slate-100"
        }
      >
        ENG
      </Button>

      <Button
        onClick={() => changeLanguage("ko")}
        className={
          activeLanguage === "ko"
            ? "border border-[#013A63] bg-[#013A63] text-white fira-sans-regular px-4 p-2 rounded-md hover:bg-[#013A63]/95 hover:text-slate-100"
            : "border border-[#013A63] bg-transparent text-black fira-sans-regular px-4 p-2 rounded-md hover:bg-[#013A63]/95 hover:text-slate-100"
        }
      >
        KOR
      </Button>
      <Button
        onClick={() => changeLanguage("ja")}
        className={
          activeLanguage === "ja"
            ? "border border-[#013A63] bg-[#013A63] text-white fira-sans-regular px-4 p-2 rounded-md hover:bg-[#013A63]/95 hover:text-slate-100"
            : "border border-[#013A63] bg-transparent text-black fira-sans-regular px-4 p-2 rounded-md hover:bg-[#013A63]/95 hover:text-slate-100"
        }
      >
        JPN
      </Button>
    </div>
  );
};

export default Translation;
