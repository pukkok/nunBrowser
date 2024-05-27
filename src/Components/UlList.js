import React from "react";

function UlList ({arr}) {
    return(
        <ul>
            {arr && arr.map((list, id)=>{
                return <li key={id}>{list}</li>
            })}
        </ul>
    )
}

export default UlList