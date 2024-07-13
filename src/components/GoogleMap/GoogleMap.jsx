import React from "react";

const GoogleMap = ({ location }) => {
  const apiKey = "YOUR_API_KEY";
  const mapSrc = `https://www.google.com/maps/place/Mom's+Kitchen+Korean+Restaurant/@14.2014325,121.1284579,1117m/data=!3m1!1e3!4m14!1m7!3m6!1s0x33bd63b11caa2c63:0x51e79148ca1193dc!2sMom's+Kitchen+Korean+Restaurant!8m2!3d14.2014325!4d121.1310328!16s%2Fg%2F11vj3w_97k!3m5!1s0x33bd63b11caa2c63:0x51e79148ca1193dc!8m2!3d14.2014325!4d121.1310328!16s%2Fg%2F11vj3w_97k?entry=ttu`;

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapSrc}
        allowFullScreen
        aria-hidden="false"
        tabIndex="0"
        title="Google Map"
      />
    </div>
  );
};

export default GoogleMap;
