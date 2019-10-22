import React from 'react';

const Star = (props) => {
    let a = [];
    for (let i = 0; i < props.value; i++) {
        a.push(<i className="fas fa-star star"/>);
    }
    return (
        <>{a}</>
    );
};

export default Star;