import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Dateformat from "../Dateformat/Dateformat";
import Images from "../Image/Images";
import { useNavigate } from "react-router-dom";
import List from "../List/List";

const Listedcard = (props) => {
  const { section, title, listclass, listclasses, listItems, cardItems } =
    props;
  const { t } = useTranslation();
  const [getlink, setLink] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    const link = listItems ? listItems.map((item) => item.descname) : "";
    setLink(link);
  }, [listItems]);
  const links = Array.isArray(getlink) ? getlink.slice(0, 1) : [];

  const handleLink = (data) => {
    nav(`/${data}`, { state: { title: data } });
  };

  return (
    <div className=" ">
      <section id={section} className="">
        <div className="flex   md:mt-1">
          <h1 className="text-4xl  mx-2 font-bold">{t(title)}</h1>
        </div>
        <div className=" ">
          {listItems
            ? listItems.map((item, index) => (
                <div key={index} className=" border-b-2 rounded-lg ">
                  <List
                    onLink={() => handleLink(item.title)}
                    title={item.title}
                    desc={item.description}
                    image={item.images}
                    datetime={item.created_at}
                    imgstyle={{ width: "10vw", height: "10vh" }}
                    className={
                      "w-full border-none shadow-none hover:bg-slate-100 "
                    }
                  />
                </div>
              ))
            : ""}
        </div>
        {/* <div className="mt-5 text-center">
          <a
            href={`/${links}`}
            className=" p-2  text-gray-700 border  hover:bg-blue-500 hover:text-gray-100 rounded-lg"
          >
            View More {`>>`}
          </a>
        </div> */}
      </section>
    </div>
  );
};

export default Listedcard;
