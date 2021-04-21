import React, { useEffect, useState } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} from "react-google-maps";

const MapDirection = ({ origin, destination }) => {
    const [directions, setDirections] = useState(null)

    useEffect(() => {
        const google = window.google
        const directionsService = new google.maps.DirectionsService();
 
    //  const origin = { lat: 23.6238, lng: 90.5000};
    //  const destination = { lat: 23.8103, lng:  90.4125 }
 
     directionsService.route(
         {
            // origin: origin,
            // destination: destination,
            origin: new google.maps.LatLng(23.6238, 90.5000),
            destination: new google.maps.LatLng(23.8103, 90.4125),
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
    const MapLoader = withScriptjs(
        withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 23.8103, lng:  90.4125 }}
                defaultZoom={7}
                defaultOptions={{
                    streetViewControl: true, 
                    fullscreenControl: true, 
                    mapTypeControl: false,
                    zoomControl: true,           
             }}
            >
            {directions && <DirectionsRenderer directions={directions}/>}
            </GoogleMap> )
    ) )

  return (

<div className="App">
<MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDt9br636Un8x819x8DyqF-eIS1pgO-xMs"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px`, width: "500px" }} />}
      mapElement={<div style={{ height: `100%` }} />}
  />
</div>
  );
}

export default MapDirection
