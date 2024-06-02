import React, { useState } from "react";
import './styles/Preview.css'
import ImgBox from "../../../Components/ImgBox";
import Container from '../../../Components/Container'

import classNames from "classnames";

function Preview ({ active='', logo, bg, hideContainer }) {


    const containerStyle = {
        width: '80%'
    }

    return(
        <section className={"preview-page"}>
            <div className={classNames("container-grid-viewer", 
            {active : active === 'container'},
            {hide: hideContainer}
            )} 
            style={containerStyle}>
                
            </div>
            <div className={classNames("nav", "default-option", {active : active === 'logo' || active === 'navigation'})}>
            <Container width={800} perWidth={80}>
                <div className={"nav-bar"}>
                    <button className={classNames('logo', {active : active === 'logo'})}>
                        {logo ? <ImgBox src={logo}/> : '로고'}
                    </button>
                    <button className={classNames("navigation", {active : active === 'navigation'})}>네비게이션 바</button>
                </div>
            </Container>
            </div>

            <div className={classNames("bg", 'default-option', {active : active === 'bg'})}>
                <button className={classNames('bg-preview', {clear : bg!==undefined})}>
                    {bg ? <ImgBox src={bg}/> : '배경업로드' }
                </button>
            </div>

            <div className={classNames("content", "default-option", {active : active === 'content'})}>
            <Container width={800} perWidth={80}>
                <div className="content-box">
                    <button>컨텐츠</button>
                </div>
            </Container>
            </div>
        </section>
    )       
            
}

export default Preview