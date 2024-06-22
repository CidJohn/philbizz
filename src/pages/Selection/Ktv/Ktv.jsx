import React from 'react'
import Image from '../../../components/Image/Image';
import Card from '../../../components/Card/Card';
import selectionContent from '../../../content/selectionContent';
import sampleItem from '../../../content/sampleItem';
import ContactForm from '../../../components/ContactUs/ContactUs';
import { ImageLink } from '../../../components/Image/ImageLink';
function Ktv() {

   return (
     <div className='flex flex-col'>
       {selectionContent.map((item, index) => (
        item.businessType === "KTV" && (
          <React.Fragment key={index}>
            {item.business.map((itemBusiness, businessIndex) => (
              <div className="px-2 grid gap-4 md:grid-cols-2 mt-10" key={businessIndex}>
                <div className="flex flex-col">
                  <h1 className="text-4xl md:text-6xl mb-4 font-serif">{itemBusiness.header}</h1>
                  <p className="text-left mb-4">{itemBusiness.paragraph}</p>
                </div>
                <figure className="max-w-md">
                  <ImageLink className="rounded-lg" src={itemBusiness.image} alt="Hair salon interior" />
                  <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{itemBusiness.header}</figcaption>
                </figure>
              </div>
            ))}
             <div className="flex flex-wrap mt-5">
            {item.cardSetting.map((card, cardIndex) => (
              <div className="bg-cover" key={cardIndex}>
              <Card
                src={card.images}
                title={card.title}
                desc={card.desc}
              />
            </div>
            ))}
            </div>
          </React.Fragment>
        )
      ))}
     {/* <div className="flex flex-wrap mt-5">
      {cardContent.map((item, index) => (
        <div className="" key={index}>
          <Card
            src={item.images}
            title={item.title}
            desc={item.desc}
            style={{ backgroundSize: '300px' }}
          />
        </div>
      ))}
    </div> */}
       <div className="flex flex-row mt-5 px-2 grid gap-4 md:grid-cols-2  ">
        <div className="container ">
             <h1 className="text-2xl font-bold mb-4">Item List</h1>
              <ul className="space-y-4 ">
                {sampleItem.map(item => (
                  <li key={item.id} className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
        </div>
          <figure className="max-w-md p-4">
            <Image className="rounded-lg" src={"ktv2.jpg"} alt="Hair salon interior" />
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Sample Header</figcaption>
          </figure>
        </div>
        <ContactForm />
     </div>
   )
}

export default Ktv