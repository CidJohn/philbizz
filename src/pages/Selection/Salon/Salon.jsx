import React from 'react';
import Image from '../../../components/Image/Image';

const Salon = ({ content }) => { // Accepting props here
  // Filter content for "Salon" business type
  const salonContent = content ? content.business : []; // Using props.content instead of selectionContent

  return (
    <>
      {salonContent.map((item, index) => (
        <div className="flex flex-row items-right px-2 grid gap-4 md:grid-cols-2 mt-10" key={index}>
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-6xl mb-4 font-serif">{item.header}</h1>
            <p className="text-left mb-4">{item.paragraph}</p>
          </div>
          <figure className="max-w-md">
            <Image className="rounded-lg" src={item.image} alt="Hair salon interior" />
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{item.header}</figcaption>
          </figure>
        </div>
      ))}
    </>
  );
}

export default Salon;
