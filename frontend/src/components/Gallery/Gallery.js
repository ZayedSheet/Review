import React, {useState, useEffect} from 'react'

const Gallery = (props) => {
    const [isOpen, setOpen] = useState(-1);
    let i = 0;
    const [images, setImages] = useState(
        props.children.map((img) => {return {...img, props: {...img.props, setOpen: setOpen, open: isOpen, key: i++}}})
    );
    useEffect(() => {i = 0;
    setImages(
        props.children.map((img) => {return {...img, props: {...img.props, setOpen: setOpen, open: isOpen, key: i++}}})
    )}, [isOpen]);

    const changeImage = (imgKey) => {
        setOpen(imgKey);
    };

    let nextImageBtn =
        (<span style={{position: "fixed", zIndex: "101", right:"15px", top:"50%"}} onClick={() => changeImage(isOpen+1)} className="close"/>)
        ;
    let prevImageBtn =
        (<span style={{position: "fixed", zIndex: "101", left:"15px", top:"50%"}} onClick={() => changeImage(isOpen-1)} className="close"/>)
        ;

    return(
        <>
            {isOpen > -1 && isOpen < images.length - 1 && nextImageBtn}
            {images}
            {isOpen > 0 && prevImageBtn}
        </>
    );
};

export default Gallery;