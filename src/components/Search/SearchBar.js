import React, {useState} from 'react';
import "./SearchBar.css";

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
    let [locationToggled, updateToggle] = useState(false);
    let [coords, updateLongitude] = useState({lat: false, lng: false});

    /**
     * Toggles to colour on the location search option in the search bar depending on if it is selected
     * Sets locationToggled to true if the option is enabled
     * Initializes the coordinates of the user via the getPosition function
     */
    const isToggled = () => {
        if (navigator.geolocation && !locationToggled){
            navigator.geolocation.getCurrentPosition(getPosition);
        }
        else{
            document.querySelector(".search .fa-location-arrow").style.color = "#cccccc";
            updateToggle(false);
            updateLongitude( {lat:false, lng:false});
        }
    };

    /**
     * Initializes the coordinates of the user, and displays them to the user
     * @param position The longitude and latitude of the user,
     * obtained from the geoLoaction api.
     */
    function getPosition(position) {
        updateLongitude( {lat:position.coords.latitude, lng:position.coords.longitude});
        document.querySelector(".search .fa-location-arrow").style.color = "#0b7dda";
        updateToggle(true);
    }

    return(
        //Container for the entire search bar
        <form className={"search"}>
            {/*Input text field*/}
            <input type="text" placeholder="Search.." name="search" />
            {/*Container for the search by location button,
            when clicked it toggles search by location and sets the coords*/}
            <div onClick={isToggled} title="Click me to toggle search by location!" className={"search-location-button"}>
                <i className="fas fa-location-arrow"/>
            </div>
            {/*Search button*/}
            <NavLink className="search-button" to={{
                pathname: '/Results',
                locationProp: {
                    lat: coords.lat,
                    lng: coords.lng
                }
            }} type="button">
                <i className="fa fa-search"/>
            </NavLink>
        </form>
    );
};

export default SearchBar;