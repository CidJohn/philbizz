// src/components/Carousel.js
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Card from "../Card/Card"; // Make sure this path is correct

const CarouselWrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 200px;
  margin: 0 10px;
`;

const Carousel = ({ items }) => {
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const totalItems = items.length;
  const itemsToShow = 10;
  const duplicateItems = items.concat(items);

  useEffect(() => {
    let currentIndex = 0;
    const itemWidth = 200 + 20; // 200px width + 20px margin

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        currentIndex += 1;
        if (trackRef.current) {
          const offset = -currentIndex * itemWidth;
          trackRef.current.style.transition = "transform 0.5s ease-in-out";
          trackRef.current.style.transform = `translateX(${offset}px)`;

          if (currentIndex >= totalItems) {
            setTimeout(() => {
              trackRef.current.style.transition = "none";
              trackRef.current.style.transform = `translateX(0px)`;
              currentIndex = 0;
            }, 500); // Match this duration to the transition duration
          }
        }
      }, 2000); // Adjust the interval time as needed
    };

    startAutoScroll();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [totalItems]);

  return (
    <CarouselWrapper className=" mx-auto ">
      <CarouselTrack ref={trackRef}>
        {duplicateItems.slice(0, itemsToShow * 2).map((item, index) => (
          <CarouselItem key={index} className="p-10">
            <Card
              title={item.title || item.name}
              link={item.title}
              desc={item.desc || item.position}
              src={item.image}
              hidden={true}
              style={{ width: "200px", height: "300px" }}
            />
          </CarouselItem>
        ))}
      </CarouselTrack>
    </CarouselWrapper>
  );
};

export default Carousel;
