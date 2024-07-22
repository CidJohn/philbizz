import { useEffect, useState } from "react";
import city from "../../assets/img/manilanight.jpg";
import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Images from "../Image/Images";

export const HeroBanner = ({ darkMode }) => {
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
    <div
      className={`lg:flex items-center justify-center    ${darkMode && "dark"}`}
    >
      {" "}
      <div className="flex flex-col-reverse lg:flex-row lg:w-[1024px] gap-8">
        <div className="  flex  p-10 justify-center  lg:w-[200px] lg:block px-3 ">
          <div className="transform transition-transform duration-500 hover:scale-105">
            <Card
              src={
                "https://lh3.googleusercontent.com/p/AF1QipMlprtNkiskp0-5IV_3_sKrIDneoRDwraoYfLHD=s680-w680-h510"
              }
              title={"Advertisement"}
              hidden={true}
            />
          </div>
          <div className="transform transition-transform duration-500 hover:scale-105">
            <Card
              src={
                "https://lh3.googleusercontent.com/p/AF1QipMlprtNkiskp0-5IV_3_sKrIDneoRDwraoYfLHD=s680-w680-h510"
              }
              title={"Advertisement"}
              hidden={true}
            />
          </div>
        </div>
        <div
          className="relative md:w-full bg-no-repeat bg-cover  h-[300px] md:h-[540px] md:max-w-screen-md rounded-lg "
          style={{ backgroundImage: `url(${city})` }}
        >
          <div className="md:absolute inset-0 bg-black bg-opacity-50 rounded-lg ">
            <div className="md:absolute inset-0 flex flex-col rounded-lg justify-center items-center text-center text-white  h-[300px] md:h-[540px]">
              <div className="md:max-w-lg w-full md:w-auto">
                <h1 className="text-lg md:text-5xl font-black mb-2 md:mb-4 font-serif">
                  {t("phil")}
                </h1>
                <h2 className="text-sm md:text-3xl font-serif">
                  필리핀 정보통(Philippines information network)
                </h2>
              </div>
              <div className="flex justify-center mt-8 space-x-8 md:hidden">
                <div className=" rounded-full px-6 py-2">
                  <span className="text-sm md:text-lg">{currentTimePHT}</span>
                  <span className="block">{t("Philippines")}</span>
                </div>
                <div className=" rounded-full px-6 py-2">
                  <span className="text-sm md:text-lg">{currentTimeKST}</span>
                  <span className="block">{t("Korea")}</span>
                </div>
                <div className=" rounded-full px-6 py-2">
                  <span className="text-sm md:text-lg">{currentTimeJST}</span>
                  <span className="block">{t("Japan")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  justify-center  lg:block p-10 lg:px-3  lg:w-[200px]">
        <div className=" flex flex-col py-5 items-center ">
          <div
            className={`${
              selectResult === "Philippines" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950  transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimePHT}
            </span>
            <span className="block text-gray-300  font-bold">
              {t("Philippines")}
            </span>
          </div>
          <div
            className={`${
              selectResult === "Korea" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950  transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimeKST}
            </span>
            <span className="block text-gray-300 font-bold">{t("Korea")}</span>
          </div>
          <div
            className={`${
              selectResult === "Japan" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950  transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimeJST}
            </span>
            <span className="block text-gray-300 font-bold">{t("Japan")}</span>
          </div>
          <div className="flex p-2 ">
            <div className=" z-50 flex transform transition-transform duration-500 hover:scale-105 block ">
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
        <div className="flex transform transition-transform duration-500 hover:scale-105">
          <Card
            src={
              "https://www.rockstarktvmanila.com/wp-content/uploads/2022/12/deluxe-1-maroon-5-600x600.jpg"
            }
            alt="Left Image"
            className="w-auto h-full object-cover "
            hidden={true}
            title={"Advertisement"}
          />
        </div>
      </div>
    </div>
  );
};
