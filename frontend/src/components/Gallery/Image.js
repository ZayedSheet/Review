import React, {useState, useEffect} from 'react'

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

    let largeStyle = isEnlarge ?
        {position: "fixed" ,
            top: "0px", left: "0px", width: "100vw", height: "100vh",
            zIndex: "100",
            ...props.style,
        } : props.style;


    return(
        <div onClick={isEnlarge ? null : handleOpen}
             className={props.className} style={largeStyle}>
            {isEnlarge ?
                <>
                    <span style={{position: "fixed", zIndex: "101"}} onClick={() => {handleClose(); if(props.setOpen) props.setOpen(-1);}} className="close"/>
                </>
                : props.children
            }
        </div>
    )
};

export default Image;