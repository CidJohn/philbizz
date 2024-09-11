import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useCardInfo,
  useImgCardURL,
} from "../../../helper/database/useCardInfo";
import Spinner from "../../../components/Spinner/Spinner";
import Images from "../../../components/Image/Images";
import Horizontal from "../../../components/Horizontal/Horizontal";
import Button from "../../../components/Button/Button";
import { Gmail, Kakaotalk, Telegram } from "../../../components/svg/Icons";
import Swal from "sweetalert2";
import GoogleMapEmbed from "../../../components/GoogleMapEmbed/GoogleMapEmbed";
import MaintenancePage from "../../../components/Maintenance/Maintenance";
import DOMPurify from "dompurify";

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
  }, [cardpath, title]);

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
    <div className="container mx-auto mt-10 max-w-screen-md">
      <h1 className="font-mono font-bold text-3xl text-center">{getCard}</h1>
      {loadData ? (
        <Spinner />
      ) : (
        getData.map((item, index) => (
          <div
            key={index}
            className="mx-auto flex flex-col items-center justify-center"
          >
            <div className="flex flex-wrap">
              <p className="mb-3 text-gray-500 text-wrap max-w-screen-md">
                {item.desc}
              </p>
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
                <h1 className="font-mono font-bold text-3xl text-center mt-5">
                  {item.type}
                </h1>
                <div className="flex flex-wrap justify-center">
                  <div className="grid md:grid-cols-3 gap-2">
                    {loadImage ? (
                      <Spinner />
                    ) : (
                      getImage.map((items, id) => (
                        <Images
                          src={items.imageURL}
                          style={{ width: "300px", height: "300px" }}
                          className={
                            "transform transition-transform duration-500 hover:scale-95"
                          }
                        />
                      ))
                    )}
                  </div>
                </div>

                <Horizontal />
                <h1 className="font-mono font-bold text-3xl text-center my-5">
                  Menus
                </h1>
                <div className="flex justify-center items-center">
                  <Images src={item.menu_image} style={{ width: "500px" }} />
                </div>
                <Horizontal />
                <div className="font-mono font-bold text-3xl text-center mt-5 p-5">
                  Location
                </div>
                <div className="flex justify-center">
                  <GoogleMapEmbed src={getURL} />
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col mx-auto items-center">
              <h1 className="text-3xl font-bold p-2">Contact us</h1>
              <div className="flex">
                <Button onClick={handleCopyTalk} icon={<Kakaotalk />} />
                <Button onClick={handleCopyClick} icon={<Gmail />} />
                <Button onClick={handleCopyTelegram} icon={<Telegram />} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Defaultpage;
