import React from 'react'

const Description = ({header, paragraph}) => {
  return (
    <div>
        <h1 className='text-4xl'>{header}</h1>
        <p>{paragraph}</p>
    </div>
  )
}

export default Description