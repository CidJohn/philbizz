import React, { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useCardPath } from "../../../helper/database/useCardPath";
import { useLocation } from "react-router-dom";
import { ImageLink } from "../../../components/Image/ImageLink";
import List from "../../../components/List/List";
import sampleItem from "../../../content/sampleItem";
import Button from "../../../components/Button/Button";
import { Gmail, Kakaotalk, Telegram } from "../../../components/svg/Icons";
import Swal from "sweetalert2";
import useCardInfo from "../../../helper/database/useCardInfo";

const Food = () => {
  const [getTitle, setTitle] = useState();
  const [getCard, setCard] = useState();
  const { cardpath, load } = useCardPath();
  const locationName = useLocation();
  const { getData, loadData } = useCardInfo(getTitle);

  const gmailUrl = "philtong15@gmail.com";
  const talk = "09928599984";
  const tel = "09943514205";

  useEffect(() => {
    const decodedPathname = decodeURIComponent(locationName.pathname);
    const path = cardpath
      ? cardpath.map(
          (item) => `/${item.title}` === decodedPathname && item.title
        )
      : "";
    setCard(path);
    if (cardpath) {
      cardpath.forEach((item) => {
        if (`/${item.title}` === decodedPathname) {
          setTitle(item.title);
        }
      });
    }
  }, [cardpath, locationName.pathname]);

  if (load) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      </div>
    );
  }

  const copyToClipboard = (text, message) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: `${message} copied to clipboard! ${text}`,
          icon: "success",
          customClass: {
            popup: "small-swal-popup",
          },
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleCopyClick = () => {
    copyToClipboard(gmailUrl, "Gmail Address");
  };

  const handleCopyTalk = () => {
    copyToClipboard(talk, "Kakao Talk Number");
  };

  const handleCopyTelegram = () => {
    copyToClipboard(tel, "Telegram Number");
  };

  return (
    <div className="container mx-auto mt-10">
      {loadData ? (
        <Spinner />
      ) : getData ? (
        getData.map((item, index) => (
          <div className="mx-auto flex flex-col items-center justify-center">
            <h1 className="font-mono font-bold text-3xl">"{getCard}"</h1>
            <div className="flex flex-wrap">
              <p className="mb-3 text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero.
              </p>
            </div>
            <div className="mx-auto">
              <ImageLink src={item.icon_image} alt={"Vegas KTV Karaoke"} />
            </div>

            <div className="flex flex-wrap">
              <div className="mt-5 ">
                <h1 className="font-mono font-bold text-3xl text-center">
                  Menus
                </h1>
                <div className="flex justify-center items-center">
                  <ImageLink src={item.image1} />
                </div>
                <h1 className="font-mono font-bold text-3xl text-center mt-5">
                  Food to Serve
                </h1>
                <div className="flex flex-wrap ">
                  <ImageLink
                    src={item.image2}
                    className={
                      "p-2 border hover:border-x-2 hover:border-gray-500"
                    }
                  />
                  <ImageLink
                    src={item.image3}
                    className={
                      "p-2 border shadow hover:border-x-2 hover:border-gray-500"
                    }
                  />
                  <ImageLink
                    src={item.image4}
                    className={
                      "p-2 border hover:border-x-2 hover:border-gray-500"
                    }
                  />
                </div>
              </div>
            </div>

            <div className=" mt-5 flex flex-col mx-auto items-center">
              <h1 className="text-lg font-bold">Contact us</h1>
              <div className="flex">
                <Button onClick={handleCopyTalk} icon={<Kakaotalk />} />
                <Button onClick={handleCopyClick} icon={<Gmail />} />
                <Button onClick={handleCopyTelegram} icon={<Telegram />} />
              </div>
            </div>
          </div>
        ))
      ) : (
        ""
      )}
    </div>
  );
};

export default Food;
