import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import List from "../List/List";
import Dateformat from "../Dateformat/Dateformat";

const Listedcard = (props) => {
  const { section, title, listclass, listclasses, listItems, cardItems } =
    props;
  const { t } = useTranslation();
  const [getlink, setLink] = useState("");

  useEffect(() => {
    const link = listItems ? listItems.map((item) => item.descname) : "";
    setLink(link);
  }, [listItems]);
  const links = Array.isArray(getlink) ? getlink.slice(0, 1) : [];
  const getSize = (index) => {
    const sizes = ["small", "medium", "large"];
    return sizes[index % sizes.length];
  };

  return (
    <div>
      <section id={section} className="">
        <div className="flex items-center justify-center mt-5 md:mt-1">
          <div className="flex flex-col gap-1">
            <hr
              className={`w-24 h-[2px] border-0 rounded ${
                title === "Food"
                  ? "bg-blue-700"
                  : title === "Ktv/Jtv"
                  ? "bg-red-700"
                  : title === "Beauty"
                  ? "bg-gray-700"
                  : ""
              }`}
            />
            <hr
              className={`w-24 h-[2px] border-0 rounded ${
                title === "Food"
                  ? "bg-blue-700"
                  : title === "Ktv/Jtv"
                  ? "bg-red-700"
                  : title === "Beauty"
                  ? "bg-gray-700"
                  : ""
              } `}
            />
          </div>
          <h1 className="text-4xl font-serif mx-2">{t(title)}</h1>
          <div className="flex flex-col gap-1">
            <hr
              className={`w-24 h-[2px]  border-0 rounded ${
                title === "Food"
                  ? "bg-blue-700"
                  : title === "Ktv/Jtv"
                  ? "bg-red-700"
                  : title === "Beauty"
                  ? "bg-gray-700"
                  : ""
              }`}
            />
            <hr
              className={`w-24 h-[2px] border-0 rounded ${
                title === "Food"
                  ? "bg-blue-700"
                  : title === "Ktv/Jtv"
                  ? "bg-red-700"
                  : title === "Beauty"
                  ? "bg-gray-700"
                  : ""
              } `}
            />
          </div>
        </div>

        <div className="flex flex-col  py-5 items-center  ">
          {cardItems
            ? cardItems.map((item) => (
                <Card
                  key={item.title}
                  src={item.images}
                  title={item.title}
                  hidden={true}
                  link={item.title}
                  style={{ width: "900px" }}
                />
              ))
            : ""}
        </div>
        <div className="flex flex-col max-w-96 ">
          {listItems
            ? listItems.map((item, index) => (
                <div className="" key={index}>
                  <List
                    key={item.title}
                    image={item.images}
                    title={item.title}
                    titleClass={listclass}
                    desc={<Dateformat dateString={item.created_at} />}
                    className={listclasses}
                    size={getSize(index)}
                    link={item.title}
                    style={{ height: "100px" }}
                    imgstyle={{ width: "100px", height: "70px" }}
                  />
                </div>
              ))
            : ""}
        </div>
        <div className="mt-5 text-center">
          <a
            href={`/${links}`}
            className=" p-2  text-gray-700 border  hover:bg-blue-500 hover:text-gray-100 rounded-lg"
          >
            View More {`>>`}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Listedcard;
