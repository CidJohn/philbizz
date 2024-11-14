import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
      <div className='w-full flex items-center justify-center px-4 gap-4 mt-4'>
        <div className='text-sm text-[#013A63] fira-sans-bold'>
          {clockData[selectedOption].date}
        </div>
        <div className='text-sm'>
          <div className='text-[#013A63] fira-sans-condensed-bold'>
            {clockData[selectedOption].time}
          </div>
        </div>
        <div className='text-[#013A63] text-sm fira-sans-condensed-bold'>
          {clockData[selectedOption].day}
        </div>
      </div>
    );
  };

  return (
    <div className='w-full p-2 bg-[#013A63]/5 rounded flex flex-col justify-center '>
      {renderClock()}
      <div className='w-full flex py-2 '>
        {/* <div className='w-full'>
          <Dropdown
            name={"selection"}
            options={timeZone.DigitalClock}
            value={selectedOption}
            onChange={handleChange}
            placeholder={selectedOption}
          />
        </div> */}
      </div>
    </div>
  );
}

export default DigitalClock;
