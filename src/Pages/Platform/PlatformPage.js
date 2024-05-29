import React, { useState } from "react";
import AllergyTable from "./AllergyTable";
import './styles/PlatformPage.css'
import MenuTable from "./MenuTable";
function PlatformPage () {

    const [pickTemplate, setPickTemplate] = useState(0)

    const selectTemplate = (e) => {
        if(pickTemplate === e.target.value){
            setPickTemplate(0)
        }else{
            setPickTemplate(e.target.value)
        }
    }

    return(
        <section className="platform-page" >
            <ul onClick={selectTemplate}>
                <li value={0}></li>
                <li value={1}>메뉴</li>
                <li value={2}>날짜모달</li>
                <li value={3}>알러지</li>
            </ul>
            {pickTemplate === 1 && <MenuTable />}
            {<AllergyTable pull={pickTemplate === 3}/>}
        </section>
    )
}

export default PlatformPage