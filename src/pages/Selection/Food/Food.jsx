import React, { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useCardPath } from "../../../helper/database/useCardPath";
import { useLocation } from "react-router-dom";
import { ImageLink } from "../../../components/Image/ImageLink";
import Button from "../../../components/Button/Button";
import { Gmail, Kakaotalk, Telegram } from "../../../components/svg/Icons";
import Swal from "sweetalert2";
import {
  useCardInfo,
  useImgCardURL,
} from "../../../helper/database/useCardInfo";
import Image from "../../../components/Image/Image";
import Horizontal from "../../../components/Horizontal/Horizontal";

const isValidUrl = (src) => {
  try {
    new URL(src);
    return true;
  } catch (e) {
    return false;
  }
};

const Food = () => {
  const [getTitle, setTitle] = useState();
  const [getCard, setCard] = useState();
  const { cardpath, load } = useCardPath();
  const locationName = useLocation();
  const { getData, loadData } = useCardInfo(getTitle);
  const { getImage, loadImage } = useImgCardURL(getTitle);

  const gmailUrl = "philtong15@gmail.com";
  const talk = "09928599984";
  const tel = "09943514205";
  const loc = "Ciudad de Calamba Rd, Calamba, 4027 Laguna";
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
  const handleCopyLocation = () => {
    copyToClipboard(loc, "Address");
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
              <p className="mb-3 text-gray-500 text-wrap max-w-screen-md ">
                {item.desc}
              </p>
            </div>
            <div className="mx-auto">
              {isValidUrl(item.icon_image) ? (
                <ImageLink src={item.icon_image} alt={"Vegas KTV Karaoke"} />
              ) : (
                <Image src={item.icon_image} style={{ width: "500px" }} />
              )}
            </div>
            <div className="flex flex-wrap  ">
              <Horizontal />
              <div className="mt-5 ">
                <h1 className="font-mono font-bold text-3xl text-center mt-5">
                  Food to Serve
                </h1>
                <div className="flex flex-wrap justify-center  ">
                  <div className="grid md:grid-cols-3">
                    {loadImage ? (
                      <Spinner />
                    ) : getImage ? (
                      getImage.map((items, id) =>
                        items.imageURL ? (
                          isValidUrl(items.imageURL) ? (
                            <ImageLink
                              src={items.imageURL}
                              alt={"Vegas KTV Karaoke"}
                            />
                          ) : (
                            <div key={id} className="flex mx-auto max-w-64 ">
                              <div className="flex flex-wrap justify-center  p-2 border border-gray-100 rounded hover:border-gray-500">
                                <Image
                                  src={items.imageURL}
                                  style={{ width: "300px", height: "300px" }}
                                />
                              </div>
                            </div>
                          )
                        ) : (
                          ""
                        )
                      )
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </div>
                <Horizontal />
                <h1 className="font-mono font-bold text-3xl text-center my-5">
                  Menus
                </h1>
                <div className="flex justify-center items-center">
                  {isValidUrl(item.menu_image) ? (
                    <ImageLink
                      src={item.menu_image}
                      alt={"Vegas KTV Karaoke"}
                    />
                  ) : (
                    <Image src={item.menu_image} style={{ width: "500px" }} />
                  )}
                </div>
                <Horizontal />
                <div className="font-mono font-bold text-3xl text-center mt-5 p-5  ">
                  Location
                </div>
                <div className="flex justify-center ">
                  {item.location_image ? (
                    isValidUrl(item.location_image) ? (
                      <ImageLink
                        src={item.location_image}
                        alt={"Vegas KTV Karaoke"}
                      />
                    ) : (
                      <button onClick={handleCopyLocation}>
                        <Image
                          src={item.location_image}
                          style={{ width: "900px" }}
                          className={"border-4 hover:border-gray-900"}
                        />
                      </button>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className=" mt-5 flex flex-col mx-auto items-center">
              <h1 className="text-3xl font-bold p-2">Contact us</h1>
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
