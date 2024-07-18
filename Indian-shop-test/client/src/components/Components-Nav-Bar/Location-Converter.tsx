import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
interface LocationProps {

    latitude: string,
    longitude: string
  
}
const LocationConverter = ({ latitude , longitude}: LocationProps) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Function to fetch location based on latitude and longitude
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        console.log(data.address.city);
        setLocation(data.display_name);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();

    // Clean up function
    return () => setLocation(null);
  }, [latitude, longitude]);

  return (
    <TextField
      id="location-search"
      variant="outlined"
      fullWidth
      value={
        location ? <p>Location: {location}</p> : <p>Loading location...</p>
      }
      // disabled
    />
  );
};

export default LocationConverter;
