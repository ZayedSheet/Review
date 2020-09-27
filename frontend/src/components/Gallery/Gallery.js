import React, {useEffect, useRef, useState} from 'react'
import classes from './Gallery.module.css'

const Image = (props) => {
    const handleOpen = () => {
        props.setOpenImageKey(props.key);     
    };

    return(
        <div onClick={handleOpen} className={props.className} style={props.style}>
            { props.children }
        </div>
    )
};

let Gallery = (props) => {
    const [openImageKey, setOpenImageKey] = useState(null);

    const backgroundImage = props.children[openImageKey]?.props?.style?.backgroundImage ?? '';
    const imageCount = props.children.length;
    const isEnlarged = openImageKey !== null;
    const hasNextImageButton = openImageKey < imageCount - 1;
    const hasPreviousImageButton = openImageKey > 0;

    return(
        <>
            { props.children.map((img, i) => ({...img, props: {...img.props, setOpenImageKey, key: i}}))}
            {
                isEnlarged && 
                    <div className="blur-background">
                        <div className={classes.EnlargedImage} style={{backgroundImage}}>
                            { hasNextImageButton && <i key="next" className={`fas fa-arrow-right ${classes.Arrow} ${classes.LeftArrow}`} onClick={() => setOpenImageKey( openImageKey + 1 )} />}
                                <span className={classes.CloseButton} 
                                    onClick={() => setOpenImageKey(null)} 
                                    className="close"
                                />
                            { hasPreviousImageButton && <span key="prev" className={`fas fa-arrow-left ${classes.Arrow} ${classes.RightArrow}`} onClick={() => setOpenImageKey( openImageKey - 1 )}/>}
                        </div>
                    </div>
                
            }
        </>
    );
};

export {Gallery, Image};