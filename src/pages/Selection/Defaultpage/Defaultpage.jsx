import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useCardInfo,
  useImgCardURL,
} from "../../../helper/database/useCardInfo";
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

function Defaultpage(props) {
  const { cardpath, load } = props;
  const [getTitle, setTitle] = useState("");
  const [getCard, setCard] = useState("");
  const [getContent, setContent] = useState({});
  const { state } = useLocation();
  const { title } = state || { title: null };
  const { getData, getURL, loadData } = useCardInfo(getTitle);
  const { getImage, loadImage } = useImgCardURL(getTitle);

  useEffect(() => {
    const path = cardpath?.find((item) => item.title === title)?.title || "";
    const content = getData ? getData.map((item) => item.Content) : [];
    setContent(content);
    setCard(path);
    setTitle(path);
  }, [cardpath, title, getData]);

  const copyToClipboard = (text, message) => {
    navigator.clipboard
      .writeText(text)
      .then(() =>
        Swal.fire({
          title: "Good job!",
          text: `${message} copied to clipboard! ${text}`,
          icon: "success",
          customClass: { popup: "small-swal-popup" },
        })
      )
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleCopyClick = () =>
    copyToClipboard("philtong15@gmail.com", "Gmail Address");
  const handleCopyTalk = () =>
    copyToClipboard("09928599984", "Kakao Talk Number");
  const handleCopyTelegram = () =>
    copyToClipboard("09943514205", "Telegram Number");

  if (load) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  if (getData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MaintenancePage />
      </div>
    );
  }
  return (
    <div className="px-[30rem] w-full py-10 flex items-start justify-center flex-col ">
      <h1 className="fira-sans-bold text-[#e63946] font-bold text-3xl text-start mb-3">
        {getCard}
      </h1>
      {loadData ? (
        <Spinner />
      ) : (
        getData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center  w-full "
          >
            <div className="flex flex-wrap">
              <p className="mb-3 text-lg text-slate-500 fira-sans-condensed-regular text-wrap  ">
                {item.desc}
              </p>
              <hr className="w-full " />

              <div className="w-full flex items-center justify-between rounded-md py-3 gap-3 mb-4">
                <h1 className="text-xl fira-sans-condensed-bold text-slate-600">
                  Social Media Contacts:
                </h1>
                <div className="flex items-center gap-3">
                  <div
                    onClick={handleCopyTalk}
                    className="flex items-center fira-sans-condensed-bold px-4 py-2 bg-yellow-500 rounded-md cursor-pointer hover:bg-yellow-400 "
                  >
                    <RiKakaoTalkFill className="text-4xl mr-2" />
                    KakaoTalk
                  </div>
                  <div
                    onClick={handleCopyClick}
                    className="flex items-center fira-sans-condensed-bold px-4 py-2 bg-red-500 rounded-md cursor-pointer hover:bg-red-400"
                  >
                    <SiGmail className="text-4xl mr-2 " />
                    Gmail
                  </div>
                  <div
                    onClick={handleCopyTelegram}
                    className="flex items-center fira-sans-condensed-bold px-4 py-2 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-300"
                  >
                    <FaTelegram className="text-4xl mr-2 text-black" />
                    Telegram
                  </div>
                </div>
              </div>
              <hr className="w-full py-4 " />
            </div>
            <div className="mx-auto ">
              <Images src={item.icon_image} alt={getCard} />
            </div>
            <div className="flex flex-wrap">
              <Horizontal />
              <div className="">
                <div className="flex ">
                  {getContent ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: getContent }}
                      style={{
                        padding: "10px",
                        marginTop: "10px",
                      }}
                      className="min-w-full text-center"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <h1 className="fira-sans-bold text-[#e63946] font-bold text-3xl text-start my-5">
                  {item.type}
                </h1>
                <div className="w-full  flex flex-wrap justify-center">
                  <div className="grid md:grid-cols-3 gap-2">
                    {loadImage ? (
                      <Spinner />
                    ) : (
                      getImage.map((items) => (
                        <Images
                          key={item.id}
                          src={items.imageURL}
                          style={{
                            width: "100%",
                            height: "300px",
                            borderRadius: 6,
                          }}
                          className={
                            "transform transition-transform duration-500 hover:scale-95"
                          }
                        />
                      ))
                    )}
                  </div>
                </div>
                <Horizontal />
                <h1 className="fira-sans-bold text-[#e63946] font-bold text-3xl text-start my-5">
                  Menus
                </h1>
                <div className="flex justify-center items-center">
                  <Images src={item.menu_image} style={{ width: "500px" }} />
                </div>
                <Horizontal />
                <div className="bg-[#f4f1de] ">
                  <div className="bg-[#e63946] fira-sans-bold text-white font-bold text-3xl text-start mt-5 p-5">
                    Location Details
                  </div>
                  <div className="flex justify-center p-4 ">
                    <GoogleMapEmbed src={getURL} />
                  </div>
                  {MapData?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start px-6 py-6 gap-2 flex-col"
                    >
                      <p className="fira-sans-condensed-regular text-lg text-gray-600">
                        <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                          Address
                        </span>
                        {item.address}
                      </p>
                      <p className="fira-sans-condensed-regular text-lg text-gray-600">
                        <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                          Phone Number:
                        </span>
                        {item.number}
                      </p>
                      <p className="fira-sans-condensed-regular text-lg text-gray-600">
                        <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                          Open Hours:
                        </span>
                        {item.hours}
                      </p>
                      <p className="fira-sans-condensed-regular text-lg text-gray-600">
                        <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                          Website:
                        </span>
                        {item.web}
                      </p>
                      <p className="fira-sans-condensed-regular text-lg text-gray-600">
                        <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
                          Facebook:
                        </span>
                        {item.facebook}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Defaultpage;
