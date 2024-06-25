import React from 'react';
import Image from '../Image/Image';
import { ImageLink } from '../Image/ImageLink';

function Card({ title, src, desc, style, hidden }) {
  return (
    <div className="max-w-96 mx-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "  style={style}>
      <a href="#" className="block" >
        <ImageLink className="rounded-t-lg " src={src} alt=""/>
      </a>
      <div className="p-1"> 
        <a href="#" className="block">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{desc}</p>
        {!hidden && (
          <a href="#" className="block text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2">
            Read more
            <svg className="inline-block w-4 h-4 ml-2 transform rtl:scale-x-minus-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1.447.895l6-3a1 1 0 0 0 0-1.79l-6-3A1 1 0 0 0 5 5zm10 5.5a1 1 0 1 1-2 0V6.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2a1 1 0 0 1 0-2h1v-3h-1z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default Card;
