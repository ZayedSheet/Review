import React, {useState, useEffect} from 'react'
import Radium from 'radium'

const Gallery = (props) => {
    const [isOpen, setOpen] = useState(-1);
    let i = 0;
    const [images, setImages] = useState(
        props.children.map((img) => {return {...img, props: {...img.props, setOpen: setOpen, open: isOpen, key: i++}}})
    );
    useEffect(() => {
        i = 0;
        setImages(props.children.map((img) => {return {...img, props: {...img.props, setOpen: setOpen, open: isOpen, key: i++}}})
    )}, [isOpen, props.children]);

    const changeImage = (imgKey) => {setOpen(imgKey);};

    let arrowStyle = {
        position: "fixed",
        fontSize: "30px",
        zIndex: "101",
        top: "50%",
        opacity: "0.4",
        cursor: "pointer",
        ":hover": {opacity: "0.8"}
    };

    let nextImageBtn =
        (<i key="next" style={{...arrowStyle, right: "15px"}} onClick={() => changeImage(isOpen+1)} className="fas fa-arrow-right"/>);
    let prevImageBtn =
        (<span key="prev" style={{...arrowStyle, left: "15px"}} onClick={() => changeImage(isOpen-1)} className="fas fa-arrow-left"/>);

    return(
        <>
            {isOpen > -1 && isOpen < images.length - 1 && nextImageBtn}
            {images}
            {isOpen > 0 && prevImageBtn}
        </>
    );
};

export default Radium(Gallery);