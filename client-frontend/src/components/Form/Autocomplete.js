import React, { useState } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const Autocomplete = () => {
    const [place, setPlace] = useState()

    geocodeByAddress('Montevideo, Uruguay')
      .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>
            console.log('Successfully got latitude and longitude', { lat, lng })
        );
    return (
        <GooglePlacesAutocomplete
        apiKey="AIzaSyDt9br636Un8x819x8DyqF-eIS1pgO-xMs"
        autocompletionRequest={{
            componentRestrictions: {
            country: ['bd'],
            }
          }}
          selectProps={{
            value: place,
            onChange: setPlace,
          }}
        />
    )
}

export default Autocomplete;