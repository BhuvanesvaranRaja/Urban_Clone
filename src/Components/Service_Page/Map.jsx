import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import CenterDetailModal from "../Modal/CenterDetailModal";
import { getCoordinatesFromCityName } from "../../Utils/Coordinates";

const Map = ({ centers, service, index }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [mapRef, setMapRef] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [centerData, setCenterData] = useState({});
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [mapDataReceived, setMapDataReceived] = useState(false);
  const userLocation = useSelector((state) => state.location.address);
  const city = useSelector((state) => state.location.location);
  const method = useSelector((state) => state.location.locationMethod);
  console.log("center recieved in map", centers, service);
  // validating availability of service centers

  useEffect(() => {
    if (loadError) {
      console.log("error occured", loadError);
    } else if (isLoaded) {
      const newMarkers =
        centers &&
        centers.length >= 1 &&
        centers[0]?.service_categories[service]
          ? centers[0].service_categories[service].map((center, index) => ({
              id: index,
              lat: center.latitude,
              lng: center.longitude,
              address: center.address,
              imageUrl: center.image,
              reviews: center.reviews,
              services: center.services,
              images: center.images,
              name: center.name,
            }))
          : [];

      setMarkers(newMarkers);
      setIsInfoWindowOpen(false);
      setMapDataReceived(true);
    }
  }, [isLoaded, centers, service, userLocation, loadError]);

  useEffect(() => {
    if (mapDataReceived && mapRef) {
      const fetchData = async () => {
        let location;
        if (method === "city") {
          const cityCoordinates = await getCoordinatesFromCityName(city);
          if (cityCoordinates) {
            location = {
              lat: parseFloat(cityCoordinates.lat),
              lng: parseFloat(cityCoordinates.lng),
            };
          }
        } else {
          if (userLocation) {
            location = {
              lat: parseFloat(userLocation.lat),
              lng: parseFloat(userLocation.lng),
            };
          }
        }

        if (location) {
          mapRef.panTo(location);
          setCurrentLocation(location);
        }
      };

      fetchData();
    }
  }, [method, city, userLocation, mapDataReceived, mapRef]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const handleMarkerClick = (lat, lng) => {
    const centerData = markers.find(
      (marker) => marker.lat === lat && marker.lng === lng
    );
    setSelectedMarker({ lat, lng });
    setCenterData(centerData);
    setIsInfoWindowOpen(true);
  };

  const closeInfoWindow = () => {
    setIsInfoWindowOpen(false);
  };

  return (
    <div className="Map">
      {console.log("isLoaded:", isLoaded)}
      {!isLoaded || !mapDataReceived ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          zoom={12}
          center={currentLocation}>
          {" "}
          {markers.map(({ lat, lng, address, imageUrl, id, name }) => (
            <Marker
              key={id}
              position={{ lat, lng }}
              icon={{
                url: require("..//../assets/icons8-shop-50.png"),
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => {
                handleMarkerClick(lat, lng, address, imageUrl, name);
              }}
            />
          ))}
          {selectedMarker && isInfoWindowOpen && (
            <InfoWindow
              position={selectedMarker}
              onCloseClick={closeInfoWindow}>
              <div>
                <button
                  className="custom-info-window-close-button"
                  onClick={closeInfoWindow}>
                  X
                </button>
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    fontFamily: "monospace",
                  }}>
                  {centerData.name}
                </h1>
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "2px",
                    color: "red",
                    letterSpacing: "1px",
                    fontFamily: "monospace",
                    marginBottom: "5px",
                  }}>
                  {centerData.address}
                </h3>
                {centerData.imageUrl && (
                  <img
                    src={centerData.imageUrl}
                    alt={centerData.address}
                    width={"100%"}
                  />
                )}
                <Button
                  w={"100%"}
                  bg={"blackAlpha.500"}
                  colorScheme="blackAlpha.500"
                  mt={3}
                  color={"white"}
                  onClick={openModal}>
                  VIEW DETAILS
                </Button>
              </div>
            </InfoWindow>
          )}
          {currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: require("..//../assets/mylocation.png"),
                scaledSize: new window.google.maps.Size(70, 70),
              }}
              onClick={() => {
                console.log("my location");
              }}
            />
          )}
        </GoogleMap>
      )}
      <CenterDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center={centerData}
      />
    </div>
  );
};

export default Map;
