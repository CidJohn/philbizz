import React, { useEffect, useRef, useState } from "react";
import { useBlogContent } from "../../../../helper/database/useBlogSettings";
import Images from "../../../../components/Image/Images";
import { useLocation } from "react-router-dom";
import restAPI from "../../../../helper/database/restAPI";
import Spinner from "../../../../components/Spinner/Spinner";
import Swal from "sweetalert2";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { FaTelegram } from "react-icons/fa";

const BlogContent = (props) => {
  const { blogdata } = props;
  const contentRef = useRef();
  const { state } = useLocation();
  const { title, user } = state || { title: null, user: null };
  const [getidblog, setIdBlog] = useState({
    title: title,
    user: user,
  });
  const [blogImage, setBlogImage] = useState([]);
  const { content, contentload } = useBlogContent(getidblog);
  const imagelink = restAPI();

  useEffect(() => {
    if (content) {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [content]);

  useEffect(() => {
    const imageblog = content.images ? content.images.map((item) => item) : [];

    setBlogImage(imageblog);
  }, [blogdata, content, title]);

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

  if (contentload) {
    return (
      <div className="flex items-center justify-center h-[70vh] ">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="px-[30rem] w-full py-10 flex items-start justify-center flex-col "
      ref={contentRef}
    >
      <h1 className="fira-sans-bold text-[#390099] font-bold text-3xl text-start mb-3">
        {content.title}
      </h1>
      <div className=" flex flex-wrap">
        <p className="mb-3 text-lg text-slate-500 fira-sans-condensed-regular text-wrap ">
          {content.description}
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
          <Images
            src={
              content.image2 ? content.image2 : imagelink.image + content.image1
            }
          />
        </div>
      </div>
      <div className="flex flex-wrap max-w-screen-md">
        <div className="p-3 gap-3 flex flex-wrap justify-center  ">
          {blogImage &&
            blogImage.map((item, index) =>
              item.imageURL ? (
                <div key={index} className="flex items-center p-10">
                  <figure className=" p-4 mx-auto ">
                    <Images
                      className="rounded-lg border-2"
                      src={imagelink.image + item.imageURL}
                      style={{ width: "500px", height: "400px" }}
                    />
                    <figcaption className="mt-2 text-sm text-center text-lg text-slate-500 fira-sans-condensed-regular">
                      {item.contentDESC}
                    </figcaption>
                  </figure>
                </div>
              ) : (
                ""
              )
            )}
          {blogImage &&
            blogImage.map((item) => (
              <>
                <div
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  style={{
                    padding: "10px",
                    marginTop: "10px",
                  }}
                  className="min-w-full text-center "
                />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
