import React from 'react'

function Card({title, img, desc}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 grid-cols-3">
      <Card
        title={title}
        imageSrc={img}
        description={desc}
      />
      
    </div>
  )
}

export default Card