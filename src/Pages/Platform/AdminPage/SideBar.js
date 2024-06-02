import classNames from "classnames";
import React, { useState } from "react";
import './styles/SideBar.css'

function SideBar ({area, tabs, setTabs, setSelectedTab, hideContainer, setHideContainer }) {

    const sendTabInfo = (e) => {
        const {title, innerText} = e.target
        const result = tabs.filter(tab =>{
            return tab.value === title
        })
        if(result.length===0){ // 포함한 값이 없다.
            setTabs([...tabs, {value : title, text: innerText}])
        }
        setSelectedTab(title)
    }

    return (
        <section className={classNames("side-bar", area)}>
            <div className="title">
                <h1>관리자 페이지 </h1>
            </div>
            <div className="page-management ctrl">
                <h3>페이지 관리</h3>
                <ul onClick={sendTabInfo}>
                    <li title={'logo'}><p>로고</p></li>
                    <li title={'navigation'}><p>네비게이션</p></li>
                    <li title="bg"><p>배경</p></li>
                    <li title="container"><p>컨테이너</p>
                        <button onClick={(e)=>{
                            e.stopPropagation()
                            setHideContainer(!hideContainer)}
                        }>{hideContainer ? '보이기' : '숨기기' }</button>
                    </li>
                    <li title="content">컨텐츠
                    </li>
                    <ul>
                        <li>행사 일정</li>
                        <li>오늘의 식단</li>
                        <li>포토박스</li>
                        <li>공지사항</li>
                    </ul>

                </ul>
            </div>

            
            
        </section>
    )
}

export default SideBar