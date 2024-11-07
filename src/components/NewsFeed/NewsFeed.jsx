import React, { useState } from "react";
import Images from "../Image/Images";

const NewsFeed = ({ articles }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === articles.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? articles.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className='relative w-full  lg:px-12 '>
      <div className='overflow-hidden'>
        {articles.map((article, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? "block" : "hidden"
            } article-card flex flex-col md:flex-row mb-6 bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500`}
          >
            {article.urlToImage ? (
              <Images
                src={article.urlToImage}
                alt={article.title}
                className='article-image w-full md:w-48 h-48 md:h-auto object-cover'
              />
            ) : (
              <div className='image-placeholder w-full md:w-48 h-48 md:h-auto bg-gray-200 flex items-center justify-center text-gray-500'>
                No Image Available
              </div>
            )}
            <div className='p-4 flex flex-col justify-between'>
              <div>
                <h2 className='article-title text-xl font-bold mb-2'>
                  {article.title || "No Title Available"}
                </h2>
                <p className='article-author text-sm text-gray-500'>
                  author: {article.author || "Unknown Author"}
                </p>
                <p className='article-description text-gray-700 mt-2'>
                  {article.description || "No Description Available"}
                </p>
              </div>
              <div className='mt-4'>
                <p className='article-source text-sm text-gray-500'>
                  Source: {article.source.name || "Unknown Source"}
                </p>
                <p className='article-publishedAt text-sm text-gray-500 mt-2'>
                  Published at:{" "}
                  {new Date(article.publishedAt).toLocaleString() ||
                    "Unknown Date"}
                </p>
                <a
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='article-link inline-block text-blue-500 hover:text-blue-700 font-semibold mt-4'
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider controls */}
      <button
        onClick={prevSlide}
        className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
      >
        <span className='inline-flex items-center justify-center w-6 h-6 p-1   rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-gray-500 dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
          <svg
            className='w-3 h-3 text-gray-500 dark:text-gray-800 rtl:rotate-180'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 6 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 1 1 5l4 4'
            />
          </svg>
          <span className='sr-only'>Previous</span>
        </span>
      </button>
      <button
        onClick={nextSlide}
        className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
      >
        <span className='inline-flex items-center justify-center w-6 h-6 p-1  rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-gray-500 dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
          <svg
            className='w-3 h-3 text-gray-500 dark:text-gray-800 rtl:rotate-180'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 6 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 9 4-4-4-4'
            />
          </svg>
          <span className='sr-only'>Next</span>
        </span>
      </button>
    </div>
  );
};

export default NewsFeed;
