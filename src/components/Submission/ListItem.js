import React from 'react';
import Stars from "./Star";
import {NavLink} from "react-router-dom";

const linkStyle = {
    textDecoration: 'none',
    color: 'black',
};

const ListItem = (props) => {
    return(
        <NavLink to={props.to} style={linkStyle}>
            <li id={props.id} className="list-item">
                <div className="item-image"/>
                <div>
                    <h2>{props.title}
                        <Stars value={props.stars}/>
                    </h2>
                    <p> {props.children} </p>
                </div>
            </li>
        </NavLink>
    );
};

export default ListItem;