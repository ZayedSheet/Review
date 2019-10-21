import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    handleClick(item){
        const listitems = document.getElementsByClassName("list-item");
        for(let i = 0; i < listitems.length; i++){
            if(listitems.item(i).id === item) listitems.item(i).style.backgroundColor = "white";
            else listitems.item(i).style.backgroundColor = "#547ec2";
        }
    };
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{
                    lat: 43.256531,
                    lng: -79.874420
                }}>
                <Marker
                    position={{ lat: 43.256531,      lng: -79.874420}}
                    onClick={() => this.handleClick("item2")}/>
                <Marker
                    position={{ lat: 43.0896, lng: -79.0849}}
                    onClick={() => this.handleClick("item1")}/>
                <Marker
                    position={{ lat: 44.3894, lng: -79.6903}}
                    onClick={() => this.handleClick("item3")}/>
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDZ-7P4_Z6trtzAZgL3s_Oq3SEY_Q8TKzw'
})(MapContainer);