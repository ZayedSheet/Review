import React from 'react';
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import './results.css'

//Components within the results page
import MapContainer from "./MapContainer";
import ListItem from "./Submission/ListItem";

/**
 * Toggles map view in mobile version of the results page
 */
const toggleMap = () => {
    document.querySelector(".toggle-switch").classList.toggle('toggle-map');
    document.querySelector(".map-view").classList.toggle('map-view-enable');
};

/**
 * Page that displays search results
 * @param props properties of the component
 *              props.location.locationProps is used by the searchBar to center the map if searched by location
 * @returns A Results Component
 */
const Results = (props) => {
    const location = useLocation();
    const [results, setResults] = useState(null);

    useEffect(() => {
        if(location.state.searchResults){
            console.log("Results", location.state.searchResults);
            setResults(location.state.searchResults);
        }
    },[location.state.searchResults]);




    return (
        //Empty container for all elements as JSX does not allow adjacent elements
        <>
            {/*Container for the list view of the search results*/}
            <div id="list-view">

                {/* Each element in the list is a search result displayed as a ListItem Component*/}
                <ul>
                    {results && results.map(item => {
                        return <ListItem to={"../Area/" + item.name} stars={5} title={item.name}>
                            {item.overview}
                        </ListItem>
                    })}
                </ul>
            </div>

            {/*Container for the map view of the search results, displayed using Google Maps API
            The map is centered at the users location if they search by location, or a default location otherwise*/}
            <div className="map-view">
                <MapContainer center={location.state.centerCoords ? location.state.centerCoords :{lat: 43.0896, lng: -79.0849}}/>
            </div>

            {/* Toggle switch to toggle between map and list view on mobile */}
            <div id="toggle-background">
                <p className="toggle noselect">LIST</p>
                {/*When toggle button is clicked, the map-view is toggled via toggleMap function*/}
                <div className="toggle" onClick={toggleMap}>
                    <div className="toggle-switch">
                    </div>
                </div>
                <p className="toggle noselect">MAP</p>
            </div>

        </>
    );
};

export default Results;