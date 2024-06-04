import React, { useEffect, useRef, useState } from "react";
import './styles/AdminPage.css'
import classNames from "classnames";

import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import Preview from "./Preview";

import LogoEditor from "./Editor/LogoEditor";
import BackgroundEditor from "./Editor/BackgroundEditor";
import NavigationEditor from "./Editor/NavigationEditor";
import ContainerEditor from "./Editor/ContainerEditor";
import ContentEditor from "./Editor/ContentsEditor";

function AdminPage () {

    // 그리드 사이즈 지정 (사이드바 접고 펼칠때 사용)
    const [gridSize, setGridSize] = useState(250)
    const gridTemplate = {
        gridTemplateColumns : `${gridSize}px 1fr`
    }

    // 탭 이동
    const [tabs, setTabs] = useState([])
    const [selectedTab, setSelectedTab] = useState('')
    const closeTab = (e, checkValue) => {
        e.stopPropagation()
        if(tabs[tabs.length-1].value === checkValue){
            if(tabs.length===1){ // 탭이 1개 열려 있을때
                setSelectedTab('')
            }else{ // 마지막탭 하나 전 탭으로 액티브 이동
                setSelectedTab(tabs[tabs.length-2].value)
            }
        }
        
        setTabs(tabs.filter(tab=>{
            return tab.value !== checkValue
        }))
    }

    const [logo, setLogo] = useState() // 로고값
    const [logoSize, setLogoSize] = useState({width:'', height:''})
    const [navi, setNavi] = useState()
    const [bg, setBg] = useState() // 미리보기 배경
    const [hideContainer, setHideContainer] = useState(false) // 컨테이너 보이기/숨기기
    const [containerSize, setContainerSize] = useState({
        maxWidth:'1240', width:'1240', minWidth:'1240', unit: 'px' // 디폴트 값
    }) // 컨테이너 사이즈 변수

    const [previewSize, setPreviewSize] = useState()
    const [xyCount, setXyCount] = useState({})

    const sizeRef = useRef()
    useEffect(()=>{
        setPreviewSize(sizeRef.current.offsetWidth)
    },[])

    

    return(
        <section className="admin-page open" style={gridTemplate}>
            <SideBar area='l'
            tabs={tabs} setTabs={setTabs} setSelectedTab={setSelectedTab}
            hideContainer={hideContainer} setHideContainer={setHideContainer}
            />
            <HeaderBar area='h' setGridSize={setGridSize}/>
            <div className="option-part c">
                <div className="preview-part part" ref={sizeRef}>
                    { 'page' &&
                    <>
                        <p>레이아웃
                            <span className="red"></span>
                            <span className="yellow"></span>
                            <span className="green"></span>
                        </p>
                        <Preview active={selectedTab} hideContainer={hideContainer}
                        logo={logo} bg={bg} containerSize={containerSize} previewSize={previewSize}
                        xyCount={xyCount}/>
                    </>}
                </div>
                <div className="part">
                    <div className="option-btn-box">
                        {tabs.map((list, idx)=>{
                            const {value, text} = list
                            return <div key={idx} 
                            className={classNames('option-btn',{active : selectedTab === value})}> 
                                <button className="tab-btn" onClick={()=>setSelectedTab(value)}>{text}</button>
                                <button className="close-btn" onClick={(e)=>closeTab(e, value)}>
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        })}
                    </div>
                    <div className="option-window">
                        {selectedTab === 'logo' && <LogoEditor setLogo={setLogo} logo={logo} logoSize={logoSize} setLogoSize={setLogoSize}/>}
                        {selectedTab === 'bg' && <BackgroundEditor setBg={setBg}/>}
                        {selectedTab === 'navigation' && <NavigationEditor/>}
                        {selectedTab === 'container' && <ContainerEditor setSizeValues={setContainerSize}/>}
                        {selectedTab === 'content' && <ContentEditor xyCount={xyCount} setXyCount={setXyCount}/>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminPage