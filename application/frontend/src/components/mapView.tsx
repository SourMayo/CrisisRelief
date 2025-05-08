import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

//I added this page just to test and render Google Maps with live data from the backend
//Probably deleting soon but just so everyone can see how to use Google Maps API with React

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 37.7749, // Defaulted this to SF for testing purposes
  lng: -122.4194,
};

const MapView = () => {
  interface Place {
    name: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }

  const [places, setPlaces] = useState<Place[]>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfeXWLWeO3WA15MY8AD55aprDhvuTOKFQ",
  });

  useEffect(() => {
    // Call backend /google/places endpoint
    fetch(
      "http://crisisrelief.duckdns.org:5001/google/places?query=shelters&lat=37.7749&lng=-122.4194&type=lodging"
    )
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.results || []);
      })
      .catch((err) => {
        console.error("Error loading places:", err);
      });
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={13}
    >
      {places.map((place, index) => (
        <Marker
          key={index}
          position={{
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          }}
          title={place.name}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;
