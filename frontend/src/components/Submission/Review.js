import React from 'react';
import Star from "./Star";

const Review = (props) => {
    return(
        <li>
            <span>{props.username}</span>
            {props.stars && <Star value={props.stars}/>}
            <p>{props.children}</p>
        </li>
    )
};

export default Review
