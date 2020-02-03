import React, {useState, useEffect} from 'react'
import Radium from 'radium'

const Image = (props) => {
    const [isEnlarge, setEnlarge] = useState(false);

    const handleOpen = () => {
        console.log("open");
        setEnlarge(true);
        if(props.setOpen) props.setOpen(props.key);
    };
    const handleClose = () => {
        setEnlarge(false);
    };

    useEffect(() => {if(props.setOpen) props.open === props.key ? handleOpen(): handleClose()}, [props.open]);

    let largeStyle = isEnlarge ? {
            position: "fixed", cursor: "default", display: "block", border:"1px solid black",
            top: "0px",marginLeft:"20%", marginTop:"20vh", left: "0px", width: "60vw", height: "60vh", zIndex: "100", ...props.style}
        : props.style;

    return(
        <div onClick={isEnlarge ? null : handleOpen}
             className={props.className} style={largeStyle}>
            {isEnlarge ?
                <>
                    <span style={{position: "fixed",right:"21%", top:"22vh", zIndex: "101"}} onClick={() => {handleClose(); if(props.setOpen) props.setOpen(-1);}} className="close"/>
                </>
                : props.children
            }
        </div>
    )
};

let Gallery = (props) => {
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
        fontSize: "40px",
        zIndex: "101",
        top: "50%",
        opacity: "0.7",
        cursor: "pointer",
        ":hover": {opacity: "1"}
    };

    let nextImageBtn =
        (<i key="next" style={{...arrowStyle, right: "21%"}} onClick={() => changeImage(isOpen+1)} className="fas fa-arrow-right"/>);
    let prevImageBtn =
        (<span key="prev" style={{...arrowStyle, left: "21%"}} onClick={() => changeImage(isOpen-1)} className="fas fa-arrow-left"/>);

    return(
        <>
            {isOpen > -1 && isOpen < images.length - 1 && nextImageBtn}
            {images}
            {isOpen > 0 && prevImageBtn}
        </>
    );
};

Gallery = Radium(Gallery);

export {Gallery, Image};