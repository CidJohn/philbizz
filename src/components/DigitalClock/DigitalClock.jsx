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
    const clockData = {
      Philippines: {
        time: currentTimePHT,
        date: currentDatePHT,
        day: currentDayPHT,
        label: t("Philippines"),
      },
      Korea: {
        time: currentTimeKST,
        date: currentDateKST,
        day: currentDayKST,
        label: t("Korea"),
      },
      Japan: {
        time: currentTimeJST,
        date: currentDateJST,
        day: currentDayJST,
        label: t("Japan"),
      },
    };

    return (
      <div className='rounded py-4 text-center bg-[#013A63] min-h-[25vh]'>
        <div className='py-7 gap-4'>
          <div className='text-sm md:text-[2vw] font-bold text-gray-100 font-mono mt-4'>
            {clockData[selectedOption].time}
          </div>
          <div className='flex justify-center gap-1 text-sm my-3'>
            <div className='block text-gray-100 fira-sans-condensed-regular'>
              {clockData[selectedOption].day}
            </div>
            <div className='block text-gray-100 fira-sans-condensed-regular'>
              {clockData[selectedOption].date}
            </div>
          </div>
          <div className='flex justify-center'>
            <span className='text-xs block text-gray-100 border border-white rounded-full px-4 py-2 fira-sans-condensed-regular'>
              {clockData[selectedOption].label}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full p-5 min-h-80 bg-[#013A63]/5 rounded flex flex-col justify-center '>
      {renderClock()}
      <div className='w-full flex py-2 '>
        <div className='w-full'>
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
