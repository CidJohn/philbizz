import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import Weather from "../Weather/Weather";
import useGeolocation from "../../helper/fetchAPI/useGeolocation";

const Herobanners = () => {
  const [currentTimePHT, setCurrentTimePHT] = useState("");
  const [currentTimeKST, setCurrentTimeKST] = useState("");
  const [currentTimeJST, setCurrentTimeJST] = useState("");
  const [selectedOption, setSelectedOption] = useState("Philippines");

  const { t } = useTranslation();
  const { locations, weather, error } = useGeolocation();

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
    { value: "phil", label: "Philippines" },
    { value: "korea", label: "Korea" },
    { value: "japan", label: "Japan" },
  ];

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const selectResult = selectedOption ? selectedOption : "";

  return (
    <div>
      <Weather locations={locations} weather={weather} error={error} />
      <div className="flex flex-wrap">
        <div className="">
          <Card
            src={
              "https://www.rockstarktvmanila.com/wp-content/uploads/2022/12/deluxe-1-maroon-5-600x600.jpg"
            }
            alt="Left Image"
            className="w-auto h-full object-cover"
            hidden={true}
            title={"Advertisement"}
          />
        </div>
        <div className="flex flex-col py-5 items-center border">
          <div
            className={`${
              selectResult === "Philippines" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950 transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimePHT}
            </span>
            <span className="block text-gray-300 font-bold">
              {t("Philippines")}
            </span>
          </div>
          <div
            className={`${
              selectResult === "Korea" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950 transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimeKST}
            </span>
            <span className="block text-gray-300 font-bold">{t("Korea")}</span>
          </div>
          <div
            className={`${
              selectResult === "Japan" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950 transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimeJST}
            </span>
            <span className="block text-gray-300 font-bold">{t("Japan")}</span>
          </div>
          <div className="flex p-2">
            <div className="z-50 flex transform transition-transform duration-500 hover:scale-105 block">
              <Dropdown
                name={"selection"}
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder={selectedOption}
                width="200px"
                selectWidth={"200px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herobanners;
