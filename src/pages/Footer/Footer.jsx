import React from "react";
import Image from "../../components/Image/Image";
import {
  Gmail,
  Kakaotalk,
  Messenger,
  Telegram,
} from "../../components/svg/Icons";
import Link from "../../components/Link/Link";

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-4 p-1 max-w-5xl  md:mx-auto ">
      <div className="  p-4 md:py-5 ">
        <div className="flex flex-wrap items-center justify-between h-full max-h-24 max-w-screen-xl">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3  ">
            <Image src={"philbizz.png"} style={{ width: "200px" }} />
          </a>
          <div className="flex flex-col">
            <ul className="flex flex-wrap items-center  text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <div className="text-lg hover:text-gray-900">Contact : </div>
              </li>
              <li className="  h-full max-h-24">
                <Link
                  to={"https://www.messenger.com/"}
                  className={" me-4 md:me-6"}
                >
                  <div className="  transform transition-transform duration-500 hover:scale-110">
                    <Messenger width={"50"} />
                  </div>
                </Link>
              </li>
              <li className="  h-full max-h-24">
                <Link
                  to={"https://open.kakao.com/o/Philbizz"}
                  className={" me-4 md:me-6"}
                >
                  <div className="  transform transition-transform duration-500 hover:scale-110">
                    <Kakaotalk width={"50"} />
                  </div>
                </Link>
              </li>
              <li className="  h-full max-h-24">
                <Link to={"https://t.me/cidjohn31"} className={" me-4 md:me-6"}>
                  <div className="  transform transition-transform duration-500 hover:scale-110">
                    <Telegram width={"50"} />
                  </div>
                </Link>
              </li>
              <li className="  h-full max-h-24">
                <Link to={"/contact"} className={" me-4 md:me-6"}>
                  <div className="  transform transition-transform duration-500 hover:scale-110">
                    <Gmail width={"50"} />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-10 md:mt-0">
          <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 " />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Philippine Business Zone
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
