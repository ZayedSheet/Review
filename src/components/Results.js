import React from 'react';
import './results.css'
import MapContainer from "./MapContainer";
import ListItem from "./Submission/ListItem";

const toggleMap = () => {
    document.querySelector(".toggle-switch").classList.toggle('toggle-map');
    document.querySelector(".map-view").classList.toggle('map-view-enable');
};

const Home = (props) => {

    console.log(props.location.locationProp);

    return (
        <>
            <div id="list-view">
                {/*        Each element in the list is a search result*/}
                <ul>
                    <ListItem to="../Area" id="item1" stars={4} title={"Niagara Region"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, optio!
                    </ListItem>
                    <ListItem to="../Area" id="item2" stars={4} title={"Hamilton"}>
                        Hamilton features many types of factories.
                        Big factories, small factories, and even medium
                        factories.
                    </ListItem>
                    <ListItem to="../Area" id="item3" stars={4} title={"Barrie"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, perspiciatis!
                    </ListItem>
                    <ListItem to="../Area" id="item4" stars={4} title={"Barrie"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque esse placeat suscipit.
                    </ListItem>
                    <ListItem to="../Area" id="item5" stars={4} title={"Barrie"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, provident!
                    </ListItem>
                    <ListItem to="../Area" id="item6" stars={4} title={"Barrie"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, magnam.
                    </ListItem>
                </ul>
            </div>

            <div className="map-view">
                <MapContainer center={props.location.locationProp}/>
            </div>

            <div id="toggle-background">
                <p className="toggle noselect">LIST</p>
                <div className="toggle" onClick={toggleMap}>
                    <div className="toggle-switch">
                    </div>
                </div>
                <p className="toggle noselect">MAP</p>
            </div>

        </>
    );
};

export default Home;