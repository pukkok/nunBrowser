import React from "react";
import ServiceInfo from "./ServiceInfo";
import './styles/ServicePage.css'
import ServiceIntroduce from "./ServiceIntroduce";
import Container from '../../Components/Container'
import { Link, useParams } from "react-router-dom";

function ServicePage () {

    const {serviceName} = useParams()

    return (
        <section className="service-info">
            <Container>
                <nav>
                    <ul>
                        <li><Link to={`/service/info`}>서비스 안내</Link></li>
                        <li><Link to={'/service/introduce'}>공시항목 소개</Link></li>
                    </ul>
                </nav>
                {serviceName === 'info' && <ServiceInfo/>}
                {serviceName === 'introduce' && <ServiceIntroduce/>}
            </Container>
        </section>
    )
}

export default ServicePage