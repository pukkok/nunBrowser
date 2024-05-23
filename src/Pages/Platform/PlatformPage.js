import React from "react";
import AllergyTable from "./AllergyTable";
import './styles/PlatformPage.css'
import MenuTable from "./MenuTable";
import Tester from "./Tester";
function PlatformPage () {

    return(
        <section className="platform-page" >
            {/* <MenuTable/> */}
            {/* <AllergyTable/> */}
            <Tester/>
        </section>
    )
}

export default PlatformPage