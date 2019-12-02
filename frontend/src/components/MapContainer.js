import React from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import config from '../config'

// Style for a map, map will always take the entire container
const mapStyles = {
    width: '100%',
    height: '100%'
};

/**
 * A container that displaying a google map
 * @param props properties of the component
 *              props.center is the coordinates of the starting center of the map as a object
 * @returns A map component
 */
export const MapContainer = (props) => {
    console.log("center", props.center);

    /**
     * Highlights a list-item on the search results page when a Marker is clicked
     * @param item the id of the list-item to be highlighted
     */
    // const handleClick = (item) =>{
    //     const listItems = document.getElementsByClassName("list-item");
    //     /*
    //     Traverses through all list item,
    //      the list-item with id = item is highlighted, the rest are given another colour
    //      */
    //     for(let i = 0; i < listItems.length; i++){
    //         if(listItems.item(i).id === item) listItems.item(i).style.backgroundColor = "white";
    //         else listItems.item(i).style.backgroundColor = "#547ec2";
    //     }
    // };


    return (
        //Google Maps Component centered at the passed in property of center
        <Map google={props.google} zoom={10} style={mapStyles} center={props.center} initialCenter={props.center}>
            {props.marker && props.marker.map(item => {//takes the marker prop (list of area objects) and creates a marker from every lat and longitude
                return <Marker position={{lat: item.coordinates.latitude, lng: item.coordinates.longitude}}/>
            })}

        </Map>

    );
};

export default GoogleApiWrapper({
    apiKey: config.GOOGLE.API_KEY
})(MapContainer);
