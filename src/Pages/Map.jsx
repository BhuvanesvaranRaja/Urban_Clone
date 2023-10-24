/* global google */
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "../App.css";

const Map = ({ centers, service, selectedService, index }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [mapRef, setMapRef] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (centers && centers.length) {
      const newMarkers = centers[0]?.service_categories[service]?.map(
        (center, index) => ({
          id: index,
          lat: center.latitude,
          lng: center.longitude,
          address: center.address,
          imageUrl: center.image,
          name: center.name,
        })
      );
      setMarkers(newMarkers);
    }
  }, [centers, service]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        // const location = { lat: 11.078128784112577, lng: 76.99973851549666 };
        setCurrentLocation(location);

        // Center the map on the user's location
        if (mapRef) {
          mapRef?.panTo(location);
        }
      });
    }
  }, [mapRef]);

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const handleMarkerClick = (id, lat, lng, address, imageUrl, name) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address, imageUrl, name });
    setIsOpen(true);
  };
  useEffect(() => {
    if (selectedService !== null && typeof selectedService === "object") {
      const id = index;
      const lat = selectedService.latitude;
      const lng = selectedService.longitude;
      const address = selectedService.address;
      const imageUrl = selectedService.image;
      const name = selectedService.name;
      handleMarkerClick(id, lat, lng, address, imageUrl, name);
    }
  }, [selectedService]);

  return (
    <div className="Map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          zoom={12}
          center={currentLocation}
          onClick={() => setIsOpen(false)}>
          {markers.map(({ lat, lng, address, imageUrl, id, name }) => (
            <Marker
              key={id}
              position={{ lat, lng }}
              //   icon={{
              //     url: imageUrl,
              //     scaledSize: new window.google.maps.Size(60, 50),
              //   }}
              icon={{
                url: require("../assets/marker.png"),
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => {
                handleMarkerClick(id, lat, lng, address, imageUrl, name);
              }}>
              {isOpen && infoWindowData?.id === id && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}>
                  <div>
                    <h1
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "2px",
                      }}>
                      {infoWindowData.name}
                    </h1>
                    <h3>{infoWindowData.address}</h3>
                    {infoWindowData.imageUrl && (
                      <img
                        src={infoWindowData.imageUrl}
                        alt={infoWindowData.address}
                      />
                    )}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}

          {currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: require("../assets/map-marker-home.png"),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => {
                console.log("my location");
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
