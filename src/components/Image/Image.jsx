import React from 'react';

const Image = ({ src, alt, className }) => {
    console.log(src, alt)
  return (
    <>
    <img src={require(`../../assets/img/${src}`)} alt={alt} className={className} />

    </>
  );
};

export default Image;
