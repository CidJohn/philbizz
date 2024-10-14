import React from "react";

const isValidUrl = (src) => {
  try {
    new URL(src);
    return true;
  } catch (e) {
    return false;
  }
};

const Images = (props) => {
  const { src, style, className, alt } = props;
  return (
    <div>
      {src ? (
        isValidUrl(src) ? (
          <img className={className} src={src} alt={alt} style={style} />
        ) : (
          <img
            src={require(`../../assets/img/${src}`)}
            alt={alt}
            className={className}
            style={style}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Images;
