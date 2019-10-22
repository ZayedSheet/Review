import React from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export const MapContainer = (props) => {
    const handleClick = (item) =>{
        const listitems = document.getElementsByClassName("list-item");
        for(let i = 0; i < listitems.length; i++){
            if(listitems.item(i).id === item) listitems.item(i).style.backgroundColor = "white";
            else listitems.item(i).style.backgroundColor = "#547ec2";
        }
    };
        return (
            <Map
                google={props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{
                    lat: 43.256531,
                    lng: -79.874420
                }}>
                <Marker
                    position={{ lat: 43.256531, lng: -79.874420}}
                    onClick={() => handleClick("item2")}/>
                <Marker
                    position={{ lat: 43.0896, lng: -79.0849}}
                    onClick={() => handleClick("item1")}/>
                <Marker
                    position={{ lat: 44.3894, lng: -79.6903}}
                    onClick={() => handleClick("item3")}/>

            </Map>

        );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDZ-7P4_Z6trtzAZgL3s_Oq3SEY_Q8TKzw'
})(MapContainer);