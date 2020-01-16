import React, {useState} from 'react'

const Image = (props) => {

    const [isEnlarge, setEnlarge] = useState(false);

    let largeStyle = isEnlarge ?
        {position: "fixed" ,
            top: "0px", left: "0px", width: "100vw", height: "100vh",
            zIndex: "100",
            ...props.style
        } : props.style;

    return(
        <div onClick={isEnlarge ? null : ()=>setEnlarge(true)}
             className={props.className} style={largeStyle}>
            {isEnlarge ?
                <span style={{position: "fixed", zIndex: "101"}} onClick={()=>setEnlarge(false)} className="close"/>
                : props.children}
        </div>
    )
};

export default Image;