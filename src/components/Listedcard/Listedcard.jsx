import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import List from "../List/List";
import Dateformat from "../Dateformat/Dateformat";
import Images from "../Image/Images";

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

  return (
    <div className=" ">
      <section id={section} className="">
        <div className="flex items-center   md:mt-1">
          <h1 className="text-4xl font-serif mx-2 font-bold">{t(title)}</h1>
        </div>
        <div className="flex flex-col  gap-3 ">
          {listItems
            ? listItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border-b-2 rounded-lg items-center hover:bg-slate-100 "
                >
                  <a href={`/${item.title}`} className="flex p-5  ">
                    <Images
                      src={item.images}
                      style={{ width: "100px", height: "70px" }}
                    />
                    <div className="p-2">
                      <h1 className="text-lg font-bold">{item.title}</h1>
                      <span className="text-sx">
                        <Dateformat dateString={item.created_at} />
                      </span>
                    </div>
                  </a>
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
