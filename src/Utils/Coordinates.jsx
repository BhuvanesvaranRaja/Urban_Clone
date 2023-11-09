import axios from "axios";

export async function getCoordinatesFromCityName(cityName) {
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${
        process.env.REACT_APP_LAT_TO_CITY
      }&q=${encodeURIComponent(cityName)}&format=json`
    );

    if (response.data.length > 0) {
      const location = response.data[0];
      return {
        lat: location.lat,
        lng: location.lon,
      };
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
