import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "../Dropdown/Dropdown";
import timeZone from "../../content/content.json";

function DigitalClock() {
  const [currentTimePHT, setCurrentTimePHT] = useState("");
  const [currentDatePHT, setCurrentDatePHT] = useState("");
  const [currentDayPHT, setCurrentDayPHT] = useState("");
  const [currentTimeKST, setCurrentTimeKST] = useState("");
  const [currentDateKST, setCurrentDateKST] = useState("");
  const [currentDayKST, setCurrentDayKST] = useState("");
  const [currentTimeJST, setCurrentTimeJST] = useState("");
  const [currentDateJST, setCurrentDateJST] = useState("");
  const [currentDayJST, setCurrentDayJST] = useState("");

  const [selectedOption, setSelectedOption] = useState("Philippines");
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const phtTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Manila",
      });
      const phtDate = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Manila",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const phtDay = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Manila",
        weekday: "long",
      });

      setCurrentTimePHT(phtTime);
      setCurrentDatePHT(phtDate);
      setCurrentDayPHT(phtDay);

      const kstTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Seoul",
      });
      const kstDate = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const kstDay = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Seoul",
        weekday: "long",
      });

      setCurrentTimeKST(kstTime);
      setCurrentDateKST(kstDate);
      setCurrentDayKST(kstDay);

      const jstTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Tokyo",
      });
      const jstDate = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const jstDay = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Tokyo",
        weekday: "long",
      });

      setCurrentTimeJST(jstTime);
      setCurrentDateJST(jstDate);
      setCurrentDayJST(jstDay);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderClock = () => {
    switch (selectedOption) {
      case "Philippines":
        return (
          <div className=" rounded py-4 text-center bg-blue-900 min-h-[25vh]">
            <div className=" py-7 ">
              <div className="text-sm md:text-[2vw] font-bold text-gray-100 font-mono">
                {currentTimePHT}
              </div>
              <div className="flex justify-center gap-1 text-sm my-2">
                <div className="block text-gray-100">{currentDayPHT}</div>
                <div className="block text-gray-100 ">{currentDatePHT}</div>
              </div>
              <div className="flex justify-center">
                <span className="text-xs block text-gray-100 border border-white rounded-full p-1">
                  {t("Philippines")}
                </span>
              </div>
            </div>
          </div>
        );
      case "Korea":
        return (
          <div className=" rounded py-4 text-center bg-blue-900 min-h-[25vh]">
            <div className="py-7">
              <span className="text-sm md:text-[2vw] font-bold text-gray-100 font-mono">
                {currentTimeKST}
              </span>
              <div className="flex justify-center gap-1  text-sm my-2 ">
                <div className="block text-gray-100">{currentDayKST}</div>
                <div className="block text-gray-100">{currentDateKST}</div>
              </div>
              <div className="flex justify-center">
                <span className="text-xs block text-gray-100 border border-white rounded-full p-1">
                  {t("Korea")}
                </span>
              </div>
            </div>
          </div>
        );
      case "Japan":
        return (
          <div className=" rounded py-4 text-center bg-blue-900 min-h-[25vh]">
            <div className="py-7">
              <span className="text-sm md:text-[2vw] font-bold text-gray-100 font-mono">
                {currentTimeJST}
              </span>
              <div className="flex justify-center gap-1  text-sm my-2">
                <div className="block text-gray-100">{currentDayJST}</div>
                <div className="block text-gray-100">{currentDateJST}</div>
              </div>
              <div className="flex justify-center">
                <span className="text-xs block text-gray-100 border border-white rounded-full p-1">
                  {t("Japan")}
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-5 min-h-80 bg-white rounded flex flex-col justify-center ">
      {renderClock()}
      <div className="flex py-2">
        <div className="mx-auto flex">
          <Dropdown
            name={"selection"}
            options={timeZone.DigitalClock}
            value={selectedOption}
            onChange={handleChange}
            placeholder={selectedOption}
          />
        </div>
      </div>
    </div>
  );
}

export default DigitalClock;
