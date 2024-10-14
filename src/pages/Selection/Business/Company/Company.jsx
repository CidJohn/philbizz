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
  const { title } = state || { title: null };
  const contentRef = useRef(null);
  const [getCompanyInfo, setCompanyInfo] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [getCompanyImages, setCompanyImages] = useState([]);
  const [getCompanyProduct, setCompanyProduct] = useState([]);
  const [getCompanySocial, setCompanySocial] = useState([]);
  const [getpersonnel, setPersonnel] = useState([]);
  const { viewData, viewloading } = useCompanyView(companyName);
  const { info, images, socials, personnels, product } = viewData;

  useEffect(() => {
    if (!viewloading && viewData) {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [viewloading, viewData]);

  useEffect(() => {
    const cardname = CompanyData
      ? CompanyData?.find((item) => item.title === title)?.title || ""
      : "";
    const getCompanyInfo = CompanyData
      ? CompanyData.find((item) => item.title === cardname)
      : [];

    const getImage = images ? images.map((item) => item) : [];
    const getProduct = product ? product.map((item) => item) : [];
    const getSocial = socials ? socials.map((item) => item) : [];
    const getPerson = personnels ? personnels.map((item) => item) : [];
    const infos = info ? info[0] : [];

    setCompanyInfo(infos);
    setPersonnel(getPerson);
    setCompanySocial(getSocial);
    setCompanyImages(getImage);
    setCompanyProduct(getProduct);
    setCompanyInfo(infos);
    setCompanyName(cardname);
  }, [CompanyData, info, images, socials, personnels, product, title]);

  if (!getCompanyInfo.companyName) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Maintenance />
      </div>
    );
  }
  if (viewloading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const website = getCompanySocial ? getCompanySocial[0] : [];
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const viewkeys = Object.keys(getCompanyInfo);

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

  return (
    <div
      className="px-[30rem] w-full py-10 flex items-start justify-center flex-col "
      ref={contentRef}
    >
      <h1 className="fira-sans-bold text-[#013A63] font-bold text-3xl text-start mb-3">
        {getCompanyInfo.companyName}
      </h1>
      <div className="flex flex-wrap">
        <p className="mb-3 text-lg text-slate-500 fira-sans-condensed-regular text-wrap  ">
          {getCompanyInfo.description}
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
      <div className="flex flex-col">
        <div className="p-3 flex  justify-center">
          <Images src={getCompanyInfo.imgLOGO} />
        </div>
      </div>
      <section id="about">
        <div className="flex flex-wrap max-w-screen-md">
          <div className="p-3 gap-3 flex  justify-center  ">
            {getCompanyImages &&
              getCompanyImages.map((item, index) => (
                <div className="" key={index}>
                  <Images
                    src={item.companyImage}
                    style={{ width: "500px", height: "400px" }}
                    className="transform transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: item.content }}
                    style={{
                      padding: "10px",
                      marginTop: "10px",
                    }}
                    className="min-w-full text-center"
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
      <section id="products">
        <div className="text-2xl font-bold mt-5 p-2 text-center">
          Sample Products
        </div>
        <div className="flex max-w-screen-md ">
          <div className="flex flex-wrap justify-center">
            {getCompanyProduct &&
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
              ))}
          </div>
        </div>
      </section>
      {getpersonnel ? (
        <section id="personnel">
          <div className="text-2xl font-bold mt-5 p-2">Personnel</div>
          <div className=" w-[45vw] border  p-3">
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
          <GoogleMapEmbed src={getCompanyInfo.locationURL} />
        </div>

        <div className="flex items-start px-6 py-6 gap-2 flex-col">
          {/* <Table tblheader={tblheader} tblrow={tblrow} tbldata={tbldata} /> */}
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              {capitalizeWords(viewkeys[0])} :
            </span>
            {getCompanyInfo.companyName}
          </p>
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              {capitalizeWords(viewkeys[3])} :
            </span>
            {getCompanyInfo.contact}
          </p>
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              {capitalizeWords(viewkeys[4])} :
            </span>
            {getCompanyInfo.email}
          </p>
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              {capitalizeWords(viewkeys[5])} :
            </span>
            {getCompanyInfo.address}
          </p>
          <p className="fira-sans-condensed-regular text-lg text-gray-600">
            <span className="fira-sans-condensed-bold mr-2 py-2 text-[#e63946]">
              Website :
            </span>
            {website.SocialValue}
          </p>
        </div>
        <div className="">
          {getCompanySocial
            ? getCompanySocial.map((item) => (
                <div className="">
                  <div className=""></div>
                </div>
              ))
            : ""}
        </div>
      </div>

      <section id="contact" className="max-w-screen-md">
        <ContactForm
          email={getCompanyInfo.email}
          company={getCompanyInfo.companyName}
        />
      </section>
    </div>
  );
};

export default Company;
