import React, { useState } from "react";
import ServiceInfo from "./ServiceInfo";
import './styles/ServicePage.css'
import ServiceIntroduce from "./ServiceIntroduce";
function ServicePage () {

    const [pick, setPick] = useState(0)

    const pickService = (e) => {
        setPick(e.target.value)
    }

    return (
        <section className="service-info">
            <nav onClick={pickService}>
                <li value={0}>서비스 안내</li>
                <li value={1}>공시항목 소개</li>
            </nav>
            {pick===0  && <ServiceInfo/>}
            {pick===1 && <ServiceIntroduce/>}
        </section>
    )
}

export default ServicePage