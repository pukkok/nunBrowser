import React from "react";

function ImgBox ({src='', alt='', addClass, handleClick}) {

    return(
        <div className={addClass ? addClass : "img-box"}>
            <img src={src} alt={alt} onClick={handleClick}/>
        </div>
    )
}

export default ImgBox