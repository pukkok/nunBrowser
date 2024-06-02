import React, { useState } from "react";
import './styles/AdminPage.css'
import classNames from "classnames";

import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import Preview from "./Preview";

import LogoEditor from "./Editor/LogoEditor";
import BackgroundEditor from "./Editor/BackgroundEditor";

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
        console.log(tabs[tabs.length-1].value)
        console.log(checkValue)
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
    const [navi, setNavi] = useState()
    const [bg, setBg] = useState() // 미리보기 배경
    const [hideContainer, setHideContainer] = useState(false)
    

    return(
        <section className="admin-page open" style={gridTemplate}>
            <SideBar area='l' 
            tabs={tabs} setTabs={setTabs} setSelectedTab={setSelectedTab}
            hideContainer={hideContainer} setHideContainer={setHideContainer}
            />
            <HeaderBar area='h' setGridSize={setGridSize}/>
            <div className="option-part c">
                <div className="preview-part part">
                    <p>레이아웃 미리보기 
                        <span className="red"></span>
                        <span className="yellow"></span>
                        <span className="green"></span>
                    </p>
                    <Preview active={selectedTab} hideContainer={hideContainer}
                    logo={logo} bg={bg}
                    />
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
                        {selectedTab === 'logo' && <LogoEditor setLogo={setLogo} logo={logo}/>}
                        {selectedTab === 'bg' && <BackgroundEditor setBg={setBg}/>}
                        {selectedTab === 'navigation' && '네비게이션'}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminPage