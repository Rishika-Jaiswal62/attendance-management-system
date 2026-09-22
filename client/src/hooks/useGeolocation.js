import { useState } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'Geolocation is not supported by this browser';
        setLocationError(err);
        reject(err);
        return;
      }

      setLoadingLocation(true);
      setLocationError('');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(coords);
          setLoadingLocation(false);
          resolve(coords);
        },
        (error) => {
          let message = 'Unable to fetch location';
          if (error.code === error.PERMISSION_DENIED) {
            message = 'Location permission denied. Please allow location access.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            message = 'Location information unavailable';
          } else if (error.code === error.TIMEOUT) {
            message = 'Location request timed out';
          }
          setLocationError(message);
          setLoadingLocation(false);
          reject(message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  return { location, locationError, loadingLocation, getLocation };
};

export default useGeolocation;