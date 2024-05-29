import React from "react";

function Container ({width=1240 ,children}) {
    const containerStyle = {
        width: width+'px',
        margin: '0 auto'
    }

    return(
        <div className="container" style={containerStyle}>
            {children}
        </div>
    )
}

export default Container