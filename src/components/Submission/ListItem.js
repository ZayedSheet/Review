import React from 'react';
import Stars from "./Star";

const ListItem = (props) => {
    return(
        <li id={props.id} className="list-item" onClick="window.location.href='object.html'">
            <div className="item-image"/>
            <div>
                <h2>{props.title}
                    <Stars value={props.stars}/>
                </h2>
                <p> {props.children} </p>
            </div>
        </li>
    );
};

export default ListItem;