import React from "react";
import Images from "./Images";

const ImageBinary = ({ binaryData, style }) => {
  // Convert binary data to base64 string
  const binaryArray = new Uint8Array(binaryData);
  const base64String = btoa(
    binaryArray.reduce((data, byte) => data + String.fromCharCode(byte), "")
  );

  // Create data URL
  const dataUrl = `data:image/png;base64,${base64String}`;
  const dataUrl2 = `${base64String}`;
  return <Images src={dataUrl || dataUrl2} alt="Binary Image" style={style} />;
};

export default ImageBinary;
