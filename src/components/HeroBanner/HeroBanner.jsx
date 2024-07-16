import { useEffect, useState } from "react";
import city from "../../assets/img/manilanight.jpg";
import { useTranslation } from "react-i18next";
import Card from "../Card/Card";

export const HeroBanner = ({ darkMode }) => {
  const [currentTimePHT, setCurrentTimePHT] = useState("");
  const [currentTimeKST, setCurrentTimeKST] = useState("");
  const [currentTimeJST, setCurrentTimeJST] = useState("");
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
  return (
    <div
      className={`lg:flex items-center justify-center    ${darkMode && "dark"}`}
    >
      {" "}
      <div className="flex flex-col-reverse lg:flex-row lg:w-[1024px] gap-8">
        <div className="  flex  p-10 justify-center  lg:w-[200px] lg:block px-3">
          <Card
            src={
              "https://lh3.googleusercontent.com/p/AF1QipMlprtNkiskp0-5IV_3_sKrIDneoRDwraoYfLHD=s680-w680-h510"
            }
            title={"Advertisement"}
            hidden={true}
          />
          <Card
            src={
              "https://lh3.googleusercontent.com/p/AF1QipMlprtNkiskp0-5IV_3_sKrIDneoRDwraoYfLHD=s680-w680-h510"
            }
            title={"Advertisement"}
            hidden={true}
          />
        </div>
        <div
          className="relative md:w-full bg-no-repeat bg-cover   md:h-[540px] md:max-w-screen-md rounded-lg"
          style={{ backgroundImage: `url(${city})` }}
        >
          <div className="md:absolute inset-0 bg-black bg-opacity-50 rounded-lg">
            <div className="md:absolute inset-0 flex flex-col rounded-lg justify-center items-center text-center text-white">
              <div className="md:max-w-lg w-full md:w-auto">
                <h1 className="text-lg md:text-5xl font-black mb-2 md:mb-4 font-serif">
                  {t("phil")}
                </h1>
                <h2 className="text-sm md:text-3xl font-serif">
                  필리핀 정보통(Philippines information network)
                </h2>
              </div>
              <div className="flex justify-center mt-8 space-x-8">
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
        <Card
          src={
            "https://www.rockstarktvmanila.com/wp-content/uploads/2022/12/deluxe-1-maroon-5-600x600.jpg"
          }
          alt="Left Image"
          className="w-auto h-full object-cover"
          hidden={true}
          title={"Advertisement"}
        />
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
    </div>
  );
};
