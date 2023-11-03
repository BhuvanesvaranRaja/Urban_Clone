import axios from "axios";

export async function getCoordinatesFromCityName(cityName) {
  const apiKey = "pk.41795673e6c8216eb3aac4201a4801f1";

  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
        cityName
      )}&format=json`
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

// Example usage:
getCoordinatesFromCityName("New York")
  .then((coordinates) => {
    console.log(`Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
