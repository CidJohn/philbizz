import React, { useState, useEffect } from "react";
import Images from "../Image/Images";
import { FaMapMarkerAlt } from "react-icons/fa";

const Imagecarousel = ({ images, style }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);
  return (
    <div
      id="controls-carousel"
      className="relative w-full"
      data-carousel="static"
    >

      <div
        className="relative h-56 overflow-hidden  md:h-96 w-full"
        style={style}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
            data-carousel-item={activeIndex === index ? "active" : ""}
          >
            {/* Image */}
            <Images
              src={image.images || image.image || image.title_image}
              alt={image.title}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 cover"
            />

            {/* Title and Description */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-black/50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 text-white">
              <h2 className="text-xl font-bold fira-sans-condensed-bold">
                {image.title}
              </h2>
              <p className="text-sm mt-2 fira-sans-condensed-regular flex items-center">
                {image.description}
                <FaMapMarkerAlt className="ml-2" />
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Imagecarousel;
