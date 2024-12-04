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
    nav(`/card-page/${data.title}`, { state: { pageContent: data } });
  };

  return (
    <section id={section} className="">
      <div className="flex flex-col  md:mt-1">
        <h1 className="text-4xl  mx-2 font-bold">{t(title)}</h1>
      </div>
      <div className="w-full gap-6 mr-12 gap-3">
        {listItems
          ? listItems.map((item, index) => (
              <div
                key={index}
                className="w-full h-auto  rounded-md gap-2 py-2 cursor-pointer"
                onClick={() => handleLink(item)}
              >
                <article className="flex group overflow-hidden rounded-lg border border-gray-100 p-2 bg-[#013A63]/5 shadow-sm ">
                  <div className="flex h-auto w-52">
                    <Images
                      alt=""
                      src={item.image || item.title_image}
                      className=" w-full h-full rounded-lg object-cover  "
                    />
                  </div>
                  <div className="p-8  w-full ">
                    <div className="flex items-center justify-between ">
                      <h3 className="text-lg font-medium text-[#013A63] fira-sans-bold">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 fira-sans-condensed-regular">
                      {item.description}
                    </p>
                    <a
                      className="group mt-4 inline-flex items-center gap-1 text-sm text-[#013A63] fira-sans-condensed-bold"
                      onClick={() => handleLink(item.title)}
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
    </section>
  );
};

export default Listedcard;
