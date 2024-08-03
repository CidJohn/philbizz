// BinaryImageDisplay.js
import React from "react";
import Images from "./Images";

const ImageBinary = ({ binaryData, style }) => {
  // Convert binary data to base64 string
  const binaryArray = new Uint8Array(binaryData);
  const base64String = btoa(String.fromCharCode.apply(null, binaryArray));

  // Create data URL
  const dataUrl = `data:image/png;base64,${base64String}`;

  return (
    <div>
      <Images
        src={dataUrl}
        alt="Binary Image"
        style={style}
      />
    </div>
  );
};

export default ImageBinary;
