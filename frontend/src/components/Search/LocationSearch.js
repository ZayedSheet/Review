// import PlacesAutocomplete, {geocodeByAddress, geocodeByPlaceId, getLatLng,} from 'react-places-autocomplete';
import React, {useState} from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const LocationSearchInput = (props) => {

    const [address, setAddress] = useState('');

    const handleChange = address => {
        setAddress( address );
    };

    const handleSelect = address => {
        document.querySelector("input[name='address']").value = address;
        setAddress(address);
        geocodeByAddress(address)
            .then(results => {
                let addressComponents = {};
                results[0].address_components.map(item => {
                    addressComponents[item.types[0]] = {long_name: item.long_name, short_name: item.short_name};
                    return item;
                });
                setValues(addressComponents);
                return getLatLng(results[0])})
            .then(latLng => console.log('Success', setCoordinates(latLng)))
            .catch(error => console.error('Error', error));
    };

    const setValues = (addressComponents) => {
        document.querySelector("input[name='city']").value = addressComponents.locality.long_name;
        document.querySelector("select[name='country']").value = addressComponents.country.short_name;
        props.setInputs(
            inputs => ({...inputs, city: addressComponents.locality.long_name,
                country: addressComponents.country.short_name})
        );
    }

    const setCoordinates = (latLng) => {

        document.querySelector("input[name='longitude']").value = latLng.lng;
        document.querySelector("input[name='latitude']").value = latLng.lat;
        props.setInputs(
            inputs => ({...inputs, latitude: latLng.lat, longitude: latLng.lng})
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