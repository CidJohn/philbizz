import { useState, useEffect } from "react";

function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [errors, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    const showPosition = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLocation({ lat, lon });
    };

    const showError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          setError("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          setError("An unknown error occurred.");
          break;
        default:
          setError("An unknown error occurred.");
          break;
      }
    };

    getLocation();
  }, []);
  return { location, errors };
}

export default useGeolocation;
