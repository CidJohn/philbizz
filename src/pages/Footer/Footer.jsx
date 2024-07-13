import React, { useEffect, useState } from "react";
import { footerContent } from "../../content/footerContent";
import { useLocation } from "react-router-dom";
import { FoodTreeView } from "../../content/FoodTreeView";
import treeViewContent from "../../content/treeViewContent";
import navbarContent from "../../content/navbarContent";
import Image from "../../components/Image/Image";
import {
  Facebook,
  Kakaotalk,
  Messenger,
  Telegram,
} from "../../components/svg/Icons";
import Link from "../../components/Link/Link";

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-4 p-1">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-5">
        <div className="sm:flex sm:items-center sm:justify-between h-full max-h-24 ">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse hover:px-3 "
          >
            <Image src={"philbizz.png"} style={{ width: "200px" }} />
          </a>
          <div className="flex flex-col">
            <ul className="flex flex-wrap  items-center  text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <div className="text-lg hover:text-gray-900">Contact : </div>
              </li>
              <li className="  h-full max-h-24">
                <Link
                  to={"https://www.messenger.com/"}
                  className={" me-4 md:me-6"}
                >
                  <div className=" hover:py-3">
                    <Messenger width={"50"} />
                  </div>
                </Link>
              </li>
              <li className="  h-full max-h-24">
                <Link
                  to={
                    "https://www.kakaocorp.com/page/service/service/KakaoTalk?lang=en"
                  }
                  className={" me-4 md:me-6"}
                >
                  <div className=" hover:py-3">
                    <Kakaotalk width={"50"} />
                  </div>
                </Link>
              </li>
              <li className="  h-full max-h-24">
                <Link
                  to={
                    "https://www.kakaocorp.com/page/service/service/KakaoTalk?lang=en"
                  }
                  className={" me-4 md:me-6"}
                >
                  <div className=" hover:py-3">
                    <Telegram width={"50"} />
                  </div>
                </Link>
              </li>
              <li className="  h-full max-h-24">
                <a
                  href="https://web.telegram.org/a/"
                  className="hover:underline me-4 md:me-6"
                >
                  <div className=" hover:py-3"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-1" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Philippine Zone
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
