import React from 'react'
import salon from "../../../assets/img/Salon.jpeg"

export default function Salon({header, paragraph}) {

  return (
     <div className=" flex flex-row items-right  px-2 grid gap-4 md:grid-cols-2 mt-10 " >
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-6xl mb-4 font-serif">{header}</h1>
            <p className="text-left  mb-4">{paragraph}</p>
          </div>
          <figure className="max-w-md">
            <img className="rounded-lg" src={salon} alt="image description" />
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Latiara Hair Salon</figcaption>
          </figure>
        </div>
  )
}
