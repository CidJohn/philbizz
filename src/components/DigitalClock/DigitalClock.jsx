import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "../Dropdown/Dropdown";

function DigitalClock() {
  const [currentTimePHT, setCurrentTimePHT] = useState("");
  const [currentTimeKST, setCurrentTimeKST] = useState("");
  const [currentTimeJST, setCurrentTimeJST] = useState("");
  const [selectedOption, setSelectedOption] = useState("Philippines");
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTimePHT(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Manila" })
      );
      setCurrentTimeKST(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Seoul" })
      );
      setCurrentTimeJST(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo" })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = [
    { value: "Philippines", label: "Philippines" },
    { value: "Korea", label: "Korea" },
    { value: "Japan", label: "Japan" },
  ];

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const selectResult = selectedOption ? selectedOption : "";

  return (
    <div>
      <div className=" p-5 min-h-80">
        <h1 className=" text-4xl font-serif m-2 font-bold">Digital Clock</h1>

        <div
          className={`${
            selectResult === "Philippines" ? "block" : "hidden"
          } border-4 border-gray-500 rounded-lg px-10 py-5 text-center   `}
        >
          <span className="text-sm md:text-2xl font-bold text-gray-900">
            {currentTimePHT}
          </span>
          <span className="block text-gray-700  font-bold">
            {t("Philippines")}
          </span>
        </div>
        <div
          className={`${
            selectResult === "Korea" ? "block" : "hidden"
          } border-4 border-gray-500 rounded-lg px-10 py-5 text-center   `}
        >
          <span className="text-sm md:text-2xl font-bold text-gray-900">
            {currentTimeKST}
          </span>
          <span className="block text-gray-700 font-bold">{t("Korea")}</span>
        </div>
        <div
          className={`${
            selectResult === "Japan" ? "block" : "hidden"
          } border-4 border-gray-500 rounded-lg px-10 py-5  text-center   `}
        >
          <span className="text-sm md:text-2xl font-bold text-gray-900">
            {currentTimeJST}
          </span>
          <span className="block text-gray-700 font-bold">{t("Japan")}</span>
        </div>
        <div className=" flex py-2 ">
          <div className="mx-auto flex ">
            <Dropdown
              name={"selection"}
              options={options}
              value={selectedOption}
              onChange={handleChange}
              placeholder={selectedOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalClock;
