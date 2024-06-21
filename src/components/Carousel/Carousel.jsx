import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the interval as needed
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full">
      <div className="relative h-full overflow-hidden rounded-lg md:h-96 mb-20">
        {images.map((item, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transform transition-transform duration-700 ease-in-out   ${
              index === currentImageIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
                <div className=" flex justify-center items-center h-full ">
                    <Card src={item.images} title={item.title} desc={item.desc} key={index} hidden={true} />
                    <Card src={item.images} title={item.title} desc={item.desc} key={index} hidden={true} />
                    <Card src={item.images} title={item.title} desc={item.desc} key={index} hidden={true} />
                </div>
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            aria-current={index === currentImageIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentImageIndex(index)}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevImage}
      >
        {/* Left arrow icon */}
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNextImage}
      >
        {/* Right arrow icon */}
      </button>
    </div>
  );
};

export default Carousel;
