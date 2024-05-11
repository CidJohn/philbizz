import React from 'react'
import Image from '../../../components/Image/Image';
import cardContent from '../../../content/cardContent';
import Card from '../../../components/Card/Card';
import selectionContent from '../../../content/selectionContent';

function Ktv({content}) {

   // If "Salon" content is found, extract the "business" array, otherwise default to an empty array
  // const businessData = content ? content.business : [];
 
   return (
     <div className='flex flex-col'>
       {selectionContent.map((item, index) => (
            item.businessType === "KTV" && item.business.map((itemBusiness, index2) => (
              <div className="flex flex-row items-right px-2 grid gap-4 md:grid-cols-2 mt-10" key={index2}>
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-6xl mb-4 font-serif">{itemBusiness.header}</h1>
              <p className="text-left mb-4">{itemBusiness.paragraph}</p>
            </div>
            <figure className="max-w-md">
              <Image className="rounded-lg" src={itemBusiness.image} alt="Hair salon interior" />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{itemBusiness.header}</figcaption>
            </figure>
          </div>
            ))
     ))}
     <div className="flex flex-wrap ">
        {cardContent.map((item, index) => (
          <Card src={item.images} title={item.title} desc={item.desc} key={index} />
        ))}
      </div>
        
     </div>
   )
}

export default Ktv