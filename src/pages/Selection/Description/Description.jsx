import React from "react";
import { useTranslation } from "react-i18next";
import Images from "../../../components/Image/Images";
import Imagecarousel from "../../../components/Carousel/Imagecarousel";

const Description = (props) => {
  const { content, pageName, txtHeaderColor, carousel } = props;
  const { t } = useTranslation();
  return (
    <>
      {content
        ? content.map(
            (item, index) =>
              item.header === pageName && (
                <div className='' key={index}>
                  <div className=' flex mt-5'>
                    <div className='flex flex-col '>
                      <h1
                        className='text-4xl md:text-6xl mb-4 fira-sans-bold '
                        style={{ color: txtHeaderColor }}
                      >
                        {t(item.header)}
                      </h1>
                      <p className='text-left mb-2 text-sm md:text-md lg:text-lg text-slate-500 fira-sans-condensed-regular '>
                        {item.paragraph}
                      </p>
                    </div>
                    {item.image && (
                      <figure className='w-full'>
                        <Images className='rounded-lg' src={item.image} />
                        <figcaption className='mt-2 text-sm text-center text-gray-500 dark:text-gray-400'>
                          {t(item.header)}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                  <div className='w-full lg:grid lg:grid-cols-2 '>
                    <div
                      className={
                        carousel ? "flex flex-col " : "flex flex-col w-full "
                      }
                    >
                      <p className='text-left text-gray-400 text-sm lg:text-md fira-sans-condensed-regular w-full '>
                        {item.description}
                      </p>
                    </div>
                    {carousel && (
                      <>
                        <div className='p-2 border'>
                          <Imagecarousel images={carousel} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
          )
        : ""}
    </>
  );
};

export default Description;
