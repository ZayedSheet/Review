import React from 'react';
import "./SearchBar.css";
import {NavLink} from "react-router-dom";

const SearchBar = () => {
    let locationToggled = false;
    let longitude = false;
    let latitude = false;

    const isToggled = () => {
        if (navigator.geolocation && !locationToggled){
            navigator.geolocation.getCurrentPosition(getPosition);
        }
        else{
            document.querySelector(".search .fa-location-arrow").style.color = "#cccccc";
            locationToggled = false;
        }
    };

    function getPosition(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        document.querySelector(".search .fa-location-arrow").style.color = "#0b7dda";
        locationToggled = true;
    }

    return(
        <form className={"search"}>
            <input type="text" placeholder="Search.." name="search" />
            <div onClick={isToggled} title="Click me to toggle search by location!" className={"search-location-button"}>
                <i className="fas fa-location-arrow"/>
            </div>
                <NavLink className="search-button" to="/Results" type="button">
                    <i className="fa fa-search"/>
                </NavLink>
        </form>
    );
};

export default SearchBar;