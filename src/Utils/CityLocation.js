import axios from "axios";

export async function getCityFromGeolocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  return new Promise((resolve, reject) => {
    function success(pos) {
      const crd = pos.coords;
      const lat = crd.latitude.toString();
      const lng = crd.longitude.toString();
      const coordinates = [lat, lng];
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      getCity(coordinates)
        .then((city) => resolve(city))
        .catch((error) => reject(error));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      reject(err);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}

async function getCity(coordinates) {
  const lat = coordinates[0];
  const lng = coordinates[1];

  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LAT_TO_CITY}&lat=${lat}&lon=${lng}&format=json`
    );
    const city = response.data.address.county;
    const parts = city.split(" ");
    const i = parts[0];
    return i;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
