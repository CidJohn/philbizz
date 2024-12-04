import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import Images from "../../../components/Image/Images";
import Horizontal from "../../../components/Horizontal/Horizontal";
import Swal from "sweetalert2";
import GoogleMapEmbed from "../../../components/GoogleMapEmbed/GoogleMapEmbed";
import MaintenancePage from "../../../components/Maintenance/Maintenance";
import { MapData } from "./MapData";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { FaTelegram } from "react-icons/fa";
import Imagecarousel from "../../../components/Carousel/Imagecarousel";
import { useGlobalContext } from "../../../helper/context/useContext";

function Defaultpage(props) {
  const { cardpath, load } = props;
  const { setUuid, contentInfo, infoLoader } = useGlobalContext();
  const [getSocial, setSocial] = useState([]);
  const [imageMenus, setImageMenus] = useState([]);
  const [getContent, setContent] = useState({});
  const { state } = useLocation();
  const { pageContent } = state || { pageContent: null };

  useEffect(() => {
    const socialLinks = contentInfo.social_links
      ? contentInfo.social_links
      : [];
    const imageMenus = contentInfo.images ? contentInfo.images : [];
    setImageMenus(imageMenus);
    setSocial(socialLinks);
    setUuid(pageContent ? pageContent.id : "");
  }, [pageContent, contentInfo, contentInfo]);

  if (infoLoader) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  if (!pageContent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MaintenancePage />
      </div>
    );
  }

  return (
    <div className="px-[30rem] w-full py-10 flex items-start justify-center flex-col ">
      <h1 className="fira-sans-bold text-[#e63946] font-bold text-3xl text-start mb-3">
        {pageContent.title}
      </h1>

      <div className="flex flex-col  justify-center  w-full ">
        <div className="flex flex-wrap">
          <p className="mb-3 text-lg text-slate-500 fira-sans-condensed-regular text-wrap  ">
            {pageContent.description}
          </p>
          <hr className="w-full " />

          <div className="w-full flex items-center justify-between rounded-md py-3 gap-3 mb-4">
            <h1 className="text-xl fira-sans-condensed-bold text-slate-600">
              Social Media Contacts:
            </h1>
            <div className="flex items-center gap-3">
              {getSocial.length > 0
                ? getSocial.map((item) =>
                    item.social_media === "KakaoTalk" ? (
                      <a
                        href={item.social_links}
                        target="_black"
                        className="flex items-center fira-sans-condensed-bold px-4 py-2 bg-yellow-500 rounded-md cursor-pointer hover:bg-yellow-400 "
                      >
                        <RiKakaoTalkFill className="text-4xl mr-2" />
                        KakaoTalk
                      </a>
                    ) : item.social_media === "Gmail" ? (
                      <>
                        <a
                          href={item.social_links}
                          target="_black"
                          className="flex items-center fira-sans-condensed-bold px-4 py-2 bg-red-500 rounded-md cursor-pointer hover:bg-red-400"
                        >
                          <SiGmail className="text-4xl mr-2 " />
                          Gmail
                        </a>
                      </>
                    ) : (
                      item.social_media === "Telegram" && (
                        <a
                          href={item.social_links}
                          target="_black"
                          className="flex items-center fira-sans-condensed-bold px-4 py-2 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-300"
                        >
                          <FaTelegram className="text-4xl mr-2 text-black" />
                          Telegram
                        </a>
                      )
                    )
                  )
                : ""}
            </div>
          </div>
          <hr className="w-full py-4 " />
        </div>
        <div className="flex flex-wrap">
          <Horizontal />
          <div className="">
            <div className="flex ">
              {contentInfo ? (
                <div
                  dangerouslySetInnerHTML={{ __html: contentInfo.content }}
                  style={{
                    padding: "10px",
                    marginTop: "10px",
                  }}
                  className="min-w-full"
                />
              ) : (
                "loading"
              )}
            </div>
            {contentInfo.servicetype ? <Horizontal /> : ""}
            <h1 className="fira-sans-bold text-[#e63946] font-bold text-3xl text-start my-5">
              {contentInfo.servicetype}
            </h1>
            <div
              className={imageMenus.map((item) =>
                item.image ? "flex justify-center items-center" : "hidden"
              )}
            >
              {imageMenus.length > 0 ? (
                <Imagecarousel
                  images={imageMenus}
                  style={{ height: "100vh" }}
                />
              ) : (
                ""
              )}
            </div>
            <Horizontal />
            <div className="bg-[#f4f1de] ">
              <div className="bg-[#e63946] fira-sans-bold text-white font-bold text-3xl text-start mt-5 p-5">
                Location Details
              </div>
              <div className="flex justify-center p-4 ">
                <GoogleMapEmbed src={contentInfo.location_image} />
              </div>

              <div className="flex items-start px-6 py-6 gap-2 flex-col">
                <p className="fira-sans-condensed-regular text-lg text-gray-600">
                  <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                    Company Name:
                  </span>
                  {pageContent.title}
                </p>
                <p className="fira-sans-condensed-regular text-lg text-gray-600">
                  <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                    Address:
                  </span>
                  {pageContent.address}
                </p>
                <p className="fira-sans-condensed-regular text-lg text-gray-600">
                  <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                    Phone Number:
                  </span>
                  {contentInfo.contact}
                </p>
                {getSocial.length > 0
                  ? getSocial.map((item, index) =>
                      item.social_media === "Website" ? (
                        <p
                          key={index}
                          className="fira-sans-condensed-regular text-lg text-gray-600"
                        >
                          <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                            Website:
                          </span>
                          <a
                            href={item.social_value}
                            className="hover:text-blue-500 hover:underline"
                            target="_blank"
                          >
                            {item.social_value}
                          </a>
                        </p>
                      ) : (
                        item.social_media === "Facebook" && (
                          <p
                            key={index}
                            className="fira-sans-condensed-regular text-lg text-gray-600"
                          >
                            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                              Facebook:
                            </span>
                            <a
                              href={item.social_value}
                              className="hover:text-blue-500 hover:underline"
                              target="_blank"
                            >
                              {item.social_value}
                            </a>
                          </p>
                        )
                      )
                    )
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Defaultpage;
