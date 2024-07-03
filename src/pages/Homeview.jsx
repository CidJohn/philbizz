import React, { useEffect, useState } from "react";

import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import CarouselContent from "../content/CarouselContent";
import Carousel from "../components/Carousel/Carousel";
import sampleItem from "../content/sampleItem";
import Image from "../components/Image/Image";
import ContactForm from "../components/ContactUs/ContactUs";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";
import { useUserData } from "../helper/database/useUserData";
import { useTranslation } from "react-i18next";

function Homeview() {
  const { data, loading } = useUserData();
  const { t } = useTranslation();

  return (
    <>
      <div className="container shadow w-full mx-auto  mt-5">
        <HeroBanner />
        <h1 className="text-5xl font-serif mt-10">{t("Business")}</h1>

        {/* <div className="App">
          {loading ? (
            <Spinner />
          ) : data ? (
            <div className="text-6xl">{data.map((item) => item.name)}</div>
          ) : (
            <Spinner />
          )}
        </div> */}
        <div className="flex flex-row">
          <Carousel images={CarouselContent} />
        </div>
        <div className="flex flex-row p-4">
          <div className=" container">
            <h1 className="text-2xl font-bold mb-4">Item List</h1>
            <ul className="space-y-4">
              {sampleItem.map((item) => (
                <li
                  key={item.id}
                  className="bg-white shadow-md rounded-lg p-4 flex items-center"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <figure className="max-w-md p-4">
            <Image
              className="rounded-lg"
              src={"ktv2.jpg"}
              alt="Hair salon interior"
            />
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Sample Header
            </figcaption>
          </figure>
        </div>
        <ContactForm />
      </div>
    </>
  );
}

export default Homeview;
