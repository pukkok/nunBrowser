import React from "react";

function Container ({width=1280 ,children}) {
    const containerStyle = {
        width: width+'px',
        margin: '0 auto'
    }

    return(
        <div style={containerStyle}>
            {children}
        </div>
    )
}

export default Container