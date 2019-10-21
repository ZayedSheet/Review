import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{
                    lat: 43.256531,
                    lng: -79.874420
                }}
            >
                <Marker position={{ lat: 43.256531, lng: -79.874420}} />
                <Marker position={{ lat: 43.0896, lng: -79.0849}} />
                <Marker position={{ lat: 44.3894, lng: -79.6903}} />
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDZ-7P4_Z6trtzAZgL3s_Oq3SEY_Q8TKzw'
})(MapContainer);