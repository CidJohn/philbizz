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
    <section id={section} className="">
      <div className="flex   md:mt-1">
        <h1 className="text-4xl  mx-2 font-bold">{t(title)}</h1>
      </div>
      <div className="w-full gap-6 mr-12">
        {listItems
          ? listItems.map((item, index) => (
              <div
                key={index}
                className="w-full h-auto mb-6 border border-[#013A63]/15 bg-[#013A63]/5 rounded-md p-4"
              >
                <article className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm ">
                  <img
                    alt=""
                    src={item.images || item.image}
                    className="h-56 w-full rounded-lg object-cover  "
                  />
                  <div className="p-8 bg-[#013A63]/5">
                    <div className="flex items-center justify-between ">
                      <h3 className="text-lg font-medium text-[#013A63] fira-sans-bold">
                        {item.title}
                      </h3>
                      <span class="whitespace-nowrap rounded-full bg-transparent border border-[#013A63] px-3.5 py-1.5 fira-sans-condensed-bold text-sm text-[#013A63]">
                        <Dateformat dateString={item.created_at} />
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 fira-sans-condensed-regular">
                      {item.description}
                    </p>
                    <a
                      className="group mt-4 inline-flex items-center gap-1 text-sm text-[#013A63] fira-sans-condensed-bold"
                      href={item.title}
                    >
                      Find out more
                      <span
                        aria-hidden="true"
                        className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                      >
                        &rarr;
                      </span>
                    </a>
                  </div>
                </article>
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
  );
};

export default Listedcard;
