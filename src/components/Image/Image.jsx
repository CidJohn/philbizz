import React from "react";

const Image = ({ src, alt, className, style }) => {
  return (
    <>
      <img
        src={require(`../../assets/img/${src}`)}
        alt={alt}
        className={className}
        style={style}
      />  
    </>
  );
};

export default Image;
