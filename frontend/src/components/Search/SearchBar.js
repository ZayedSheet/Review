import React, {useState, useRef, useEffect} from 'react';
import "./SearchBar.css";
import axios from 'axios';
import config from "../../config";

/*
Nav Link Component allows links to be added to change the current page.
In other words, change the component in the App.js switch statement
 */
import {NavLink, withRouter} from "react-router-dom";

/**
 * General search bar to search the website for objects
 * @returns SearchBar component
 */
const SearchBar = (props) => {

    const wrapperRef = useRef(null);

    /*
    Variables for geolocation functionality,
    coordinates set to false until user searches by location
     */
    const [centerCoords, updateCoords] = useState(false);
    const [style, locationEnabled] = useState({color: "#cccccc"});
    const [results, setResults] = useState([]); //variable for storing search results
    const [resultVisible, setVisible] = useState(false); //variable for if search results are visible or not


    const handleClickOutside = event => {
        if (wrapperRef.current && !(wrapperRef.current.contains(event.target))) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    //Search Results styling
    const resultsStyle = {
        backgroundColor: "black",
    };


    /**
     * Toggles to colour on the location search option in the search bar depending on if it is selected
     * Sets locationToggled to true if the option is enabled
     * Initializes the coordinates of
     * the user via the getPosition function
     */
    const isToggled = () => {
        if (navigator.geolocation && !centerCoords){
            navigator.geolocation.getCurrentPosition(getPosition);
        }
        else{ //if search by location is already toggled or geolocation doesn't work on this browser
            locationEnabled({color :"#cccccc"});
            updateCoords(false); //sets location back to niagara
        }
    };

    /**
     * Initializes the coordinates of the user, and displays them to the user
     * @param position The longitude and latitude of the user,
     * obtained from the geoLoaction api.
     */
    function getPosition(position) {
        updateCoords( {lat:position.coords.latitude, lng:position.coords.longitude});
        locationEnabled({color :"#0b7dda"});
    }

    /**
     * function for setting the state of search results
     */
    const searchResults = async (event) => {
        let res;
        setVisible(true); //search results become visible
        if(event.target.value !== ""){ //if search field is not empty (regex matches empty string to everything)
            try{//sends request to server to retrieve objects that match the search
                res = await axios.post(config.IP + '/objects', {name: {$regex: '^(.* +)?' + event.target.value + '.*$', $options: "i"}});
                setResults(res.data);
            }
            catch{
                setResults([]);
            }
        }else{setResults()} //if search field is empty set results to nothing
    };

    const handleKeyDown = (event) => {
        //Prevents page change when enter key is pressed
        if(event.keyCode === 13){
            event.preventDefault();
            setVisible(false);
            props.history.push({
                pathname: '/Results',
                state: { //props for the results page. This tells the page where to initially center the map
                    centerCoords: centerCoords,
                    searchResults: results
                }
            })
        }
        if(event.keyCode === 27){setVisible(false)}
    };

    return(
        <div ref={wrapperRef} style={{maxHeight: "40px"}}>
            <form className={"search"}>
                {/*Input text field*/}
                <input onKeyDown={handleKeyDown} autoComplete={"off"} onChange={searchResults} type="text" placeholder="Search.." name="search" />
                {/*Container for the search by location button,
            when clicked it toggles search by location and sets the coords*/}
                <div onClick={isToggled} title="Click me to toggle search by location!" className={"search-location-button"}>
                    <i style={style} className="fas fa-location-arrow"/>
                </div>
                {/*Search button*/}
                <NavLink onClick={()=> setVisible(false)} className="search-button" to={{
                    pathname: '/Results',
                    state: { //props for the results page. This tells the page where to initially center the map
                        centerCoords: centerCoords,
                        searchResults: results
                    }
                }} type="button">
                    <i className="fa fa-search"/>
                </NavLink>
            </form>
            <div className={"results"}>
                <div style={{transform: "translateY(-10px)"}}>
                    {/*if resultVisible is true and results is not empty, then map each object in results to be a div*/}
                    {resultVisible && results && results.map(object => {
                        return <NavLink key={object.name} className={"results-item"} onClick={() => setVisible(false)} to={"/Area/"+object.name}>{object.name}</NavLink>
                    })}
                </div>
            </div>
        </div>
        //Container for the entire search bar
    );
};

export default withRouter(SearchBar);