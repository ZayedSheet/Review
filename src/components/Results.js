import React from 'react';
import './results.css'
import MapContainer from "./MapContainer";

const Home = () => {

    return (
        <>
            <div id="list-view">
                {/*        Each element in the list is a search result*/}
                <ul>
                    <li className="list-item" onClick="window.location.href='object.html'">
                        <div className="item-image" id="item1"></div>
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
                    <li className="list-item">
                        <div className="item-image" id="item2"></div>
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
                    <li className="list-item">
                        <div className="item-image" id="item3"></div>
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
                    <li className="list-item">
                        <div className="item-image" id="item4"></div>
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
                    <li className="list-item">
                        <div className="item-image" id="item4"></div>
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
                    <li className="list-item">
                        <div className="item-image" id="item4"></div>
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