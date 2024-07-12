import React from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useLocation } from "react-router-dom";
import { useCardPath } from "../../../helper/database/useCardPath";
import { ImageLink } from "../../../components/Image/ImageLink";
import List from "../../../components/List/List";
import sampleItem from "../../../content/sampleItem";
import {
  Facebook,
  Gmail,
  Kakaotalk,
  Messenger,
  Telegram,
} from "../../../components/svg/Icons";
import Swal from "sweetalert2";
import GmailLink from "../../../components/Gmaillink/Gmaillink";
import Button from "../../../components/Button/Button";

const KtvandJtv = () => {
  const { cardpath, load } = useCardPath();
  const locationName = useLocation();
  const decodedPathname = decodeURIComponent(locationName.pathname);
  const path = cardpath
    ? cardpath.map((item) => `/${item.title}` === decodedPathname && item.title)
    : "";

  if (load) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      </div>
    );
  }
  const gmailUrl = "philtong15@gmail.com";
  const talk = "09928599984";
  const tel = "09943514205";

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
      <div className="mx-auto flex flex-col items-center justify-center">
        <h1 className="font-mono font-bold text-3xl">"{path}"</h1>
        <div className="flex flex-wrap">
          <p className="mb-3 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero.
          </p>
        </div>
        <div className="mx-auto">
          <ImageLink
            src={
              "https://www.reviewjournal.com/wp-content/uploads/2020/08/13291484_web1_RJ-MAG-KAMU_-72320cs_008.jpg?w=980"
            }
            alt={"Vegas KTV Karaoke"}
          />
        </div>

        <div className="flex flex-wrap">
          <div className="mt-5 ">
            <h1 className="font-mono font-bold text-3xl text-center">
              Information
            </h1>
            {sampleItem.map((item) => (
              <List
                key={item.id}
                title={item.name}
                desc={item.description}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div className="text-2xl font-bold p-2 mt-5">Services Offer</div>
        <div class=" relative overflow-x-auto mt-2  ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border border-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Color
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">White</td>
                <td class="px-6 py-4">Laptop PC</td>
                <td class="px-6 py-4">$1999</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$99</td>
              </tr>
            </tbody>
          </table>
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
    </div>
  );
};

export default KtvandJtv;
