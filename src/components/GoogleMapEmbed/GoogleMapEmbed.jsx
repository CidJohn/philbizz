import React from "react";

const GoogleMapEmbed = ({
  src,
  width = "800",
  height = "450",
  className = "",
  ...props
}) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      className={`border-0 ${className}`}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      {...props}
    ></iframe>
  );
};

export default GoogleMapEmbed;
