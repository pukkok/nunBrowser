import React, { useEffect, useRef, useState } from "react";
import './styles/Preview.css'
import ImgBox from "../../../Components/ImgBox";
import Container from '../../../Components/Container'

import classNames from "classnames";

function Preview ({ active='', logo, bg, hideContainer, containerSize, previewSize, xyCount }) {

    const [gridSize, setgridSize] = useState()
    // 윈도우 최대 넓이 : preview 넓이 = 전체 컨테이너 사이즈 : preview 컨테이너 사이즈
    // window.innerWidth : previewSize = containerSize : x
    useEffect(()=>{
        if(containerSize.unit === 'px'){
            let x = Math.floor(previewSize * containerSize.width / window.innerWidth) - 20 // padding 20
            return setgridSize(x)
        }
        if(containerSize.unit === '%'){
            return setgridSize(containerSize.width)
        }

    },[containerSize.width, previewSize])


    const [count, setCount] = useState(0) // 컨텐츠 그리드 개수
    useEffect(()=>{
        let {row, col} = xyCount
        if(row==='' && col===''){
            return setCount(0)
        }
        if(row){
            if(col){
               return setCount(row * col)
            }else{
                return setCount(row * 1)
            }
        }

        if(col){
            if(row){
                setCount(row * col)
            }else{
                setCount(col * 1)
            }
        }
    },[xyCount])

    const userGrid = {
        gridTemplateColumns: xyCount.col ? `repeat(${xyCount.col}, 1fr)` : '',
        gridTemplateRows: xyCount.row ? `repeat(${xyCount.row}, 1fr)` : ''
    }


    return(
        <section className={"preview-page"} style={{}}>
            <div className={classNames("container-grid-viewer", 
            {active : active === 'container'},
            {hide: hideContainer}
            )} 
            style={{width : containerSize.unit === 'px' ? gridSize+'px' : containerSize.unit === '%' ? gridSize+'%' : ''}}
            >
            </div>
            <div className={classNames("nav", "default-option", {active : active === 'logo' || active === 'navigation'})}>
            <Container width={containerSize.unit === 'px' && gridSize} perWidth={containerSize.unit === '%' && gridSize}>
                <div className={"nav-bar"}>
                    <button className={classNames('logo', {active : active === 'logo'}, {clear: logo})}>
                        {logo ? <ImgBox src={logo}/> : '로고'}
                    </button>
                    <button className={classNames("navigation", {active : active === 'navigation'})}>
                        네비게이션 바
                    </button>
                </div>
            </Container>
            </div>

            <div className={classNames("bg", 'default-option', {active : active === 'bg'})}>
                <button className={classNames('bg-preview', {clear : bg})}>
                    {bg ? <ImgBox src={bg}/> : '배경업로드' }
                </button>
            </div>

            <div className={classNames("content", "default-option", {active : active === 'content'})}>
            <Container width={containerSize.unit === 'px' && gridSize} perWidth={containerSize.unit === '%' && gridSize}>
                <div className="content-box" style={userGrid}>
                    {count && xyCount ? Array(count).fill(0).map((_,idx)=>{
                        return <div className="grid-line" key={idx}>구역{idx+1}</div>
                    }):
                    <button>컨텐츠</button>
                    }
                </div>
            </Container>
            </div>
        </section>
    )       
            
}

export default Preview