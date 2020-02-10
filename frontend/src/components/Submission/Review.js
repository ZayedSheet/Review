import React from 'react';
import Star from "./Star";

const Review = (props) => {

    console.log("date props", props.date);
    console.log(new Date(props.date));

    let picStyle = {
        height: "50px",
        width: "50px",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "50%",
        display: "inline-block",
    };

    let date = new Date(props.date);
    date = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();

    return(
        <li>
            <h4 style={{display:"inline"}}>{props.title}</h4>
            {props.stars && <Star value={props.stars}/>}
            <p>{props.children}</p>
            {/*<span style={picStyle}/>*/}
            <h5>{props.username} | {date}</h5>
        </li>
    )
};

export default Review
