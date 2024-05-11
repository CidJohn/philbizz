import React from 'react'

import { HeroBanner } from '../components/HeroBanner/HeroBanner'
import Card from '../components/Card/Card'
import cardContent from '../content/cardContent'


function Homeview() {
  return (
    <>
      <div className="w-full mx-auto max-w-screen-xl">
         <HeroBanner /> 
        <div className="flex flex-row  ">
        {cardContent.map((item, index) => (
          <Card src={item.images} title={item.title} desc={item.desc} key={index} />
        ))}
        </div>
        {/* <Footer /> */}
      </div>

    </>
       
  )
}

export default Homeview