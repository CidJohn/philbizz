import React from "react";

const isValidUrl = (src) => {
  try {
    new URL(src);
    return true;
  } catch (e) {
    return false;
  }
};

const GoogleMapEmbed = ({
  src,
  width = "800",
  height = "450",
  className = "",
  ...props
}) => {
  return isValidUrl(src) ? (
    <iframe
      src={src}
      width={width}
      height={height}
      className={`border-solid border-4 rounded-md border-blue-400 ${className}`}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      {...props}
    ></iframe>
  ) : (
    <div
      className={`border-0 ${className}`}
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      NO DATA
    </div>
  );
};

export default GoogleMapEmbed;
