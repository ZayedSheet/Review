import React, {useState} from 'react';
import "./SearchBar.css";
import axios from 'axios';

/*
Nav Link Component allows links to be added to change the current page.
In other words, change the component in the App.js switch statement
 */
import {NavLink} from "react-router-dom";

/**
 * General search bar to search the website for objects
 * @returns SearchBar component
 */
const SearchBar = () => {

    /*
    Variables for geolocation functionality,
    coordinates set to false until user searches by location
     */
    const [locationToggled, updateToggle] = useState(false);
    const [centerCoords, updateLongitude] = useState({ lat: 43.0896, lng: -79.0849}); //set initial location to niagara falls
    const [style, locationEnabled] = useState({color: "#cccccc"});
    const [results, setResults] = useState(null);


    /**
     * Toggles to colour on the location search option in the search bar depending on if it is selected
     * Sets locationToggled to true if the option is enabled
     * Initializes the coordinates of the user via the getPosition function
     */
    const isToggled = () => {
        if (navigator.geolocation && !locationToggled){
            navigator.geolocation.getCurrentPosition(getPosition);
        }
        else{ //if search by location is already toggled or geolocation doesn't work on this browser
            let searchByGeoElement = document.querySelectorAll(".search .fa-location-arrow"); //sets search by location icon back to grey
            locationEnabled({color :"#cccccc"});
            updateToggle(false);
            updateLongitude( { lat: 43.0896, lng: -79.0849}); //sets location back to niagara
        }
    };

    const searchResults = async (event) => {
        let res;
        try{
            res = await axios.post('http://localhost:5000/objects', {name: {$regex: '^(.* +)?' + event.target.value + '.*$'}});
            setResults(res.data.map((object) => <div>{object.name}</div>));
            // setResults(res.data);
        }
        catch{
            setResults([]);
        }
    };
    console.log(results);

    /**
     * Initializes the coordinates of the user, and displays them to the user
     * @param position The longitude and latitude of the user,
     * obtained from the geoLoaction api.
     */
    function getPosition(position) {
        updateLongitude( {lat:position.coords.latitude, lng:position.coords.longitude});
        locationEnabled({color :"#0b7dda"});
        updateToggle(true);
    }

    return(
        //Container for the entire search bar
        <form className={"search"}>
            {/*Input text field*/}
            <input onChange={searchResults} type="text" placeholder="Search.." name="search" />
            {/*Container for the search by location button,
            when clicked it toggles search by location and sets the coords*/}
            <div onClick={isToggled} title="Click me to toggle search by location!" className={"search-location-button"}>
                <i style={style} className="fas fa-location-arrow"/>
            </div>
            {/*Search button*/}
            <NavLink className="search-button" to={{
                pathname: '/Results',
                state: { //props for the results page. This tells the page where to initially center the map
                    centerCoords: centerCoords
                }
            }} type="button">
                <i className="fa fa-search"/>
            </NavLink>
            <div className={"results"}>{results}</div>
        </form>
    );
};

export default SearchBar;