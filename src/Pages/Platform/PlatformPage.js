import React from "react";
import AllergyTable from "./AllergyTable";
import './styles/PlatformPage.css'
import MenuTable from "./MenuTable";
function PlatformPage () {

    return(
        <section className="platform-page" >
            <MenuTable/>
            {/* <AllergyTable/> */}
        </section>
    )
}

export default PlatformPage