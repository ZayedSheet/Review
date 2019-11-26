// import PlacesAutocomplete, {geocodeByAddress, geocodeByPlaceId, getLatLng,} from 'react-places-autocomplete';
import React, {useState} from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

let lookup = require('country-code-lookup');

const LocationSearchInput = (props) => {

    const [address, setAddress] = useState('');
    let selectedAddress;

    const handleChange = address => {
        setAddress( address );
    };

    const handleSelect = address => {
        document.querySelector("input[name='address']").value = address;
        setAddress(address);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', setValues(address, latLng)))
            .catch(error => console.error('Error', error));
    };

    const setValues = (address, latLng) => {
        selectedAddress = address.split(/\s*[-,]\s*/);
        selectedAddress[selectedAddress.length - 1] = lookup.byCountry(selectedAddress[selectedAddress.length - 1]).iso2;
        document.querySelector("input[name='longitude']").value = latLng.lng;
        document.querySelector("input[name='latitude']").value = latLng.lat;
        document.querySelector("input[name='city']").value = selectedAddress[0];
        document.querySelector("select[name='country']").value = selectedAddress[selectedAddress.length - 1];
        props.setInputs(
            inputs => ({...inputs, city: selectedAddress[0], country: selectedAddress[2],
                latitude: latLng.lat, longitude: latLng.lng})
        );
    };

    return (
        <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input name={'address'}
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}/>
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div{...getSuggestionItemProps(suggestion, {className, style,})}>
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearchInput;