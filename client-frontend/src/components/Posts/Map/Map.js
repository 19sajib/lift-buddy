import React, { useEffect, useState } from "react";
import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";

function Map({ origin, destination })  {
    const [directions, setDirections] = useState(null)

   useEffect(() => {
    const google = window.google
    const directionsService = new google.maps.DirectionsService();

   // const origin = { lat: 23.6238, lng: 90.5000};
    //const destination = { lat: 23.8103, lng:  90.4125 }

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(result)
                setDirections(result)
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
   }, [])

    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={{ lat: 23.8103, lng:  90.4125 }}
            defaultZoom={17}
            defaultOptions={{
                streetViewControl: true, 
                fullscreenControl: true, 
                mapTypeControl: false,
                zoomControl: true,           
         }}
        >
            <DirectionsRenderer
                directions={directions}
            />
        </GoogleMap>
    ));

    return (
        <div>
            <GoogleMapExample
                containerElement={<div style={{ height: `400px`, width: "500px" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>


       );
    }

export default Map;