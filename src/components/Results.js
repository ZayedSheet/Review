import React from 'react';
import './results.css'
import MapContainer from "./MapContainer";

const Home = () => {

    return (
        <>
            <div id="list-view">
                {/*        Each element in the list is a search result*/}
                <ul>
                    <li id="item1" className="list-item" onClick="window.location.href='object.html'">
                        <div className="item-image"></div>
                        <div>
                            <h2>Niagara Region
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                            </h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad delectus fugit in ipsam
                                officiis, repellendus? Asperiores consequuntur deserunt ea id.</p>
                        </div>
                    </li>
                    <li id="item2"className="list-item">
                        <div className="item-image"></div>
                        <div>
                            <h2>Hamilton
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                            </h2>
                            <p> Hamilton features many types of factories.
                                Big factories, small factories, and even medium
                                factories.</p>
                        </div>
                    </li>
                    <li id="item3" className="list-item">
                        <div className="item-image"></div>
                        <div>
                            <h2>Barrie
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                            </h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad delectus fugit in ipsam
                                officiis, repellendus? Asperiores consequuntur deserunt ea id.</p>
                        </div>
                    </li>
                    <li id="item4" className="list-item">
                        <div className="item-image"></div>
                        <div>
                            <h2>Barrie
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                            </h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad delectus fugit in ipsam
                                officiis, repellendus? Asperiores consequuntur deserunt ea id.</p>
                        </div>
                    </li>
                    <li id="item4" className="list-item">
                        <div className="item-image"></div>
                        <div>
                            <h2>Barrie
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                            </h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad delectus fugit in ipsam
                                officiis, repellendus? Asperiores consequuntur deserunt ea id.</p>
                        </div>
                    </li>
                    <li  id="item5" className="list-item">
                        <div className="item-image"></div>
                        <div>
                            <h2>Barrie
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                                <i className="fas fa-star star"></i>
                            </h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad delectus fugit in ipsam
                                officiis, repellendus? Asperiores consequuntur deserunt ea id.</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="map-view">
                <MapContainer></MapContainer>
            </div>

            <div id="toggle-background">
                <p className="toggle noselect">LIST</p>
                <div className="toggle">
                    <div className="toggle-switch">
                    </div>
                </div>
                <p className="toggle noselect">MAP</p>
            </div>

        </>
    );
}

export default Home;