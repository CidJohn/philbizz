import React from "react";
import Image from "../../components/Image/Image";
import { contactDetails } from "./FooterData";
import Link from "../../components/Link/Link";

function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-4">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-0 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <Image src={"philbizz.png"} style={{ width: "200px" }} />
            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              consequuntur amet culpa cum itaque neque.
            </p>
          </div>
          <ul className="flex items-center">
            <li>
              <div className="text-lg hover:text-gray-900">Contact : </div>
            </li>
            {contactDetails.map((item, index) => (
              <li key={index} className="  h-full max-h-24">
                <Link to={item.link} className={" me-4 md:me-6"}>
                  <div className="  transform transition-transform duration-500 hover:scale-110">
                    {item.images}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 my-4" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Philippine Business Zone
            </a>
            . All Rights Reserved.
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
