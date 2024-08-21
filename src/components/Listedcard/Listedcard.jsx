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
  const getSize = (index) => {
    const sizes = ["small", "medium", "large"];
    return sizes[index % sizes.length];
  };

  return (
    <div className="min-w-full ">
      <section id={section} className="min-w-full">
        <div className="flex items-center  p-5 md:mt-1">
          <h1 className="text-4xl font-serif mx-2">{t(title)}</h1>
        </div>
        <div className="flex flex-col min-w-80 ">
          {listItems
            ? listItems.map((item, index) => (
                <div
                  href={`/${item.title}`}
                  className="flex items-center border-b-2 rounded-lg items-center transform transition-transform duration-500 hover:scale-105"
                >
                  <a href={`/${item.title}`} className="flex p-5 min-w-full ">
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
                // <div className="min-w-80" key={index}>
                //   <List
                //     key={item.title}
                //     image={item.images}
                //     title={item.title}
                //     titleClass={listclass}
                //     desc={<Dateformat dateString={item.created_at} />}
                //     className={listclasses}
                //     size={getSize(index)}
                //     link={item.title}
                //     style={{ height: "100px" }}
                //     imgstyle={{ width: "100px", height: "70px" }}
                //   />
                // </div>
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
