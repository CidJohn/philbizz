import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function AdvertisementSlider({ slides }) {
  return (
    <Swiper
      spaceBetween={5}
      centeredSlides={false}
      autoplay={{
        delay: "5000",
      }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {slides && slides.length > 0
        ? slides?.map((item, index) => <SwiperSlide key={item.id || index}>{item}</SwiperSlide>)
        : "no data..."}
    </Swiper>
  );
}
