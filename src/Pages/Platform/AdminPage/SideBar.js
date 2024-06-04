import classNames from "classnames";
import React, { useState } from "react";
import './styles/SideBar.css'

function SideBar ({area, tabs, setTabs, setSelectedTab, hideContainer, setHideContainer }) {

    const sendTabInfo = (e, title) => {

        if(!e.target.className){ // 이상한 곳 클릭
            return
        }

        const {className, innerText} = e.target

        const result = tabs.filter(tab =>{
            return tab.value === className
        })

        if(result.length===0){ // 포함한 값이 없다.
            setTabs([...tabs, {value : className, text: innerText}])
        }
        setSelectedTab(className)
    }

    const tabList = [
        {className: 'logo', text: '로고'},
        {className: 'navigation', text: '네비게이션'},
        {className: 'bg', text: '배경'},
        {className: 'container', text: '컨테이너'},
        {className: 'content', text: '컨텐츠'},
        {className: 'content', text: '행사일정'},
        {className: 'content', text: '오늘의 식단'},
        {className: 'content', text: '포토박스'},
        {className: 'content', text: '공지사항'},
    ]

    return (
        <section className={classNames("side-bar", area)}>
            <div className="title">
                <h1>관리자 페이지 </h1>
            </div>
            <div className="page-management ctrl">
                <h3>페이지 관리</h3>
                <ul onClick={(e)=>sendTabInfo(e, 'page')}>
                    {tabList.map((list, idx) =>{
                        return (
                            <React.Fragment key={idx}>
                                {list.className === 'container' && <button onClick={(e)=>{
                                e.stopPropagation()
                                setHideContainer(!hideContainer)}
                                }>{hideContainer ? '보이기' : '숨기기' }</button>}
                                <li className={list.className}>{list.text}</li>
                            </React.Fragment>
                        )
                    })}
                </ul>
                <h3>원아 관리</h3>
                <ul onClick={(e)=>sendTabInfo(e, 'child')}>
                    <li>원아 기록부</li>
                </ul>
                <h3>식단 관리</h3>
                <ul>
                    <li>식단표</li>
                </ul>
            </div>

            
            
        </section>
    )
}

export default SideBar