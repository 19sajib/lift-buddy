import React from 'react'
import { withScriptjs } from "react-google-maps";
import Map from './Map'

const Directions = ({ origin, destination }) => {

    const MapLoader = withScriptjs(props => <Map {...props} />);

  return (

<div className="App">
  <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDt9br636Un8x819x8DyqF-eIS1pgO-xMs"
      loadingElement={<div style={{ height: `100%` }} />}
      origin={origin}
      destination={destination}
  />
</div>
  );
}

export default Directions
