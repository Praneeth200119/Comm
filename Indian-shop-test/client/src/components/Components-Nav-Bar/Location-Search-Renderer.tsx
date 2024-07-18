import React, { useState, useEffect } from "react";
import LocationConverter from "./Location-Converter";
import { TextField } from "@mui/material";

const LocationSearchRenderer: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude : "",
    longitude: "",
  });
  const [currectCity,setCurrentCity]=useState("");

  const fetchLocation = async (latitude:string,longitude:string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      console.log(data.address.city);
      return data.address.city;
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Unknown City";
    }
  };
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          
          const { latitude, longitude } = position.coords;
          // Here you can use latitude and longitude to fetch location details using reverse geocoding API
          const city=await fetchLocation(latitude.toString(),longitude.toString())
          setCurrentCity(city);
          setCurrentLocation({ latitude: latitude.toString(), longitude: longitude.toString() });
        },
        (error) => {
          console.error("Error getting location:", error);
          setCurrentLocation({ latitude: "", longitude: "" });
          setCurrentCity("Unknown City");
        }
      );
    } else {
      setCurrentLocation({ latitude: "", longitude: "" });
      setCurrentCity("Unknown City");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {/* <LocationConverter
        latitude={currentLocation?.latitude}
        longitude={currentLocation?.longitude}
      /> */}
      <TextField
      id="location-search"
      variant="standard"
      fullWidth
      value={currectCity}
      disabled
    />
    </div>
  );
};

export default LocationSearchRenderer;
