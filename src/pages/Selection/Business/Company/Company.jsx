import React, { useEffect, useRef, useState } from "react";
import Carousel from "../../../../components/Carousel/Carousel";
import ContactForm from "../../../../components/ContactUs/ContactUs";
import { Link, useLocation } from "react-router-dom";
import Images from "../../../../components/Image/Images";
import GoogleMapEmbed from "../../../../components/GoogleMapEmbed/GoogleMapEmbed";
import { useCompanyView } from "../../../../helper/database/useBusinessData";
import Maintenance from "../../../../components/Maintenance/Maintenance";
import Spinner from "../../../../components/Spinner/Spinner";
import Horizontal from "../../../../components/Horizontal/Horizontal";
import Swal from "sweetalert2";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { FaTelegram } from "react-icons/fa";

const Company = (props) => {
  const { CompanyData } = props;
  const { state } = useLocation();
  const { title, content } = state || { title: null, content: null };
  const contentRef = useRef(null);
  const [getContentInfo, setContentInfo] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [getCompanyImages, setCompanyImages] = useState([]);
  const [getCompanyProduct, setCompanyProduct] = useState([]);
  const [getSocial, setSocial] = useState([]);
  const [getpersonnel, setPersonnel] = useState([]);
  const { viewData, viewloading } = useCompanyView(companyName);
  const { info, images, socials, personnels, product } = viewData;

  useEffect(() => {
    if (!content && content) {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    content.card_info.map((item) => setContentInfo(item));
    const socialLinks = getContentInfo.social_links
      ? getContentInfo.social_links
      : [];
    const personInvolve = getContentInfo.people_involved
      ? getContentInfo.people_involved
      : [];
    setSocial(socialLinks);
    setPersonnel(personInvolve);
  }, [viewloading, viewData, content, getContentInfo]);

  // useEffect(() => {
  //   const cardname = CompanyData
  //     ? CompanyData?.find((item) => item.title === title)?.title || ""
  //     : "";
  //   const getCompanyInfo = CompanyData
  //     ? CompanyData.find((item) => item.title === cardname)
  //     : [];

  //   const getImage = images ? images.map((item) => item) : [];
  //   const getProduct = product ? product.map((item) => item) : [];
  //   const getSocial = socials ? socials.map((item) => item) : [];
  //   const getPerson = personnels ? personnels.map((item) => item) : [];
  //   const infos = info ? info[0] : [];

  //   setCompanyInfo(infos);
  //   setPersonnel(getPerson);
  //   setCompanySocial(getSocial);
  //   setCompanyImages(getImage);
  //   setCompanyProduct(getProduct);
  //   setCompanyInfo(infos);
  //   setCompanyName(cardname);
  // }, [CompanyData, info, images, socials, personnels, product, title]);

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Maintenance />
      </div>
    );
  }
  // if (!content) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // const website = getCompanySocial ? getCompanySocial[0] : [];
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const viewkeys = Object.keys(getContentInfo);
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
  const handleCopyTalk = (link) =>
    copyToClipboard("09928599984", "Kakao Talk Number");
  const handleCopyTelegram = () =>
    copyToClipboard("09943514205", "Telegram Number");
  console.log(getpersonnel);
  return (
    <div
      className="px-[30rem] w-full py-10 flex items-start justify-center flex-col "
      ref={contentRef}
    >
      <h1 className="fira-sans-bold text-[#013A63] font-bold text-3xl text-start mb-3">
        {content.title}
      </h1>
      <div className="flex flex-wrap">
        <p className="mb-3 text-lg text-slate-500 fira-sans-condensed-regular text-wrap  ">
          {content.address}
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
      <div className="flex flex-col">
        <div className="p-3 flex  justify-center">
          <Images src={getContentInfo.icon_image} />
        </div>
      </div>
      <section id="about">
        <div className="flex flex-wrap max-w-screen-lg">
          <div className="p-3 gap-3 flex    ">
            <div className="flex ">
              <div
                dangerouslySetInnerHTML={{ __html: getContentInfo.content }}
                style={{
                  padding: "10px",
                  marginTop: "10px",
                }}
                className="min-w-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="products">
        <div className="flex max-w-screen-lg ">
          <div className="flex flex-wrap justify-center">
            {/* {getCompanyProduct &&
              getCompanyProduct.map((item, index) => (
                <div key={index}>
                  <figure className=" p-4 transform transition-transform duration-500 hover:scale-105">
                    <Images
                      className="rounded-lg border-2"
                      src={item.productImage}
                      alt="Hair salon interior"
                      style={{ width: "300px", height: "300px" }}
                    />
                    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      {item.productName}
                    </figcaption>
                  </figure>
                </div>
              ))} */}
          </div>
        </div>
      </section>
      {getpersonnel ? (
        <section id="personnel">
          <div className="text-2xl font-bold mt-5 p-2">Personnel</div>
          <div className=" w-[45vw]  ">
            <Carousel items={getpersonnel} />
          </div>
        </section>
      ) : (
        ""
      )}

      <Horizontal />
      <div className="bg-[#f4f1de]">
        <div className="bg-[#e63946] fira-sans-bold text-white font-bold text-3xl text-start mt-5 p-5">
          Location
        </div>
        <div className="flex justify-center">
          <GoogleMapEmbed
            src={getContentInfo ? getContentInfo.location_image : ""}
          />
        </div>

        <div className="flex items-start px-6 py-6 gap-2 flex-col">
          {/* <Table tblheader={tblheader} tblrow={tblrow} tbldata={tbldata} /> */}
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              {capitalizeWords(viewkeys[1])} :
            </span>
            {getContentInfo.name}
          </p>
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              {capitalizeWords(viewkeys[2])} :
            </span>
            {getContentInfo.contact}
          </p>
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              {capitalizeWords(viewkeys[3])} :
            </span>
            {getContentInfo.email}
          </p>
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              Address :
            </span>
            {content.address}
          </p>
          {getSocial.length > 0
            ? getSocial.map((item, index) =>
                item.social_media === "Website" ? (
                  <p className="fira-sans-condensed-regular text-lg text-gray-600">
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
                    <p className="fira-sans-condensed-regular text-lg text-gray-600">
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

      <section id="contact" className="max-w-screen-md">
        <ContactForm
          email={getContentInfo.email}
          company={getContentInfo.name}
        />
      </section>
    </div>
  );
};

export default Company;
