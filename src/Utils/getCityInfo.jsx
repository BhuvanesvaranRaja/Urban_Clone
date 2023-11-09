import axios from "axios";
async function getCityName(lat, lng) {
  try {
    const url = `https://us1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LAT_TO_CITY}&lat=${lat}&lon=${lng}&format=json`;
    const response = await axios.get(url);
    const data = response.data;
    let cityName = data.address.state_district;
    if (cityName.endsWith(" District")) {
      cityName = cityName.slice(0, -9);
    }
    return cityName;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { getCityName };
