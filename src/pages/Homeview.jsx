import React, { useState } from "react";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import CarouselContent from "../content/CarouselContent";
import Carousel from "../components/Carousel/Carousel";
import sampleItem from "../content/sampleItem";
import Image from "../components/Image/Image";
import ContactForm from "../components/ContactUs/ContactUs";
import { useTranslation } from "react-i18next";
import Card from "../components/Card/Card";
import styled from "styled-components";
import List from "../components/List/List";

function Homeview() {
  const { t } = useTranslation();
  return (
    <>
      <div className="container  w-full mx-auto  mt-5">
        <HeroBanner />
        <h1 className="text-5xl font-serif mt-10">{t("Business")}</h1>

        <div className="container"></div>
        <div className="flex flex-wrap">
          <div className="flex mt-5 p-5 flex-col-reverse md:flex-row">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-4">Sample Item list</h1>
              {sampleItem.map((item) => (
                <List
                  key={item.id}
                  title={item.name}
                  desc={item.description}
                  id={item.id}
                />
              ))}
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
          <Carousel items={CarouselContent} />
        </div>
      </div>
    </>
  );
}

export default Homeview;
