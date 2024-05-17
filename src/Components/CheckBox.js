import React from "react";

function checkbox ({ addClass, inputRef, inputValue, handleClick, innerP }) {
    
    return(
        <label className={addClass ? addClass : 'label-input-box'}>
            <input ref={inputRef} type="checkbox" value={inputValue} onClick={handleClick} />
            <p>{innerP}</p>
        </label>
    )
}

export default checkbox