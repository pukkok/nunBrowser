import classNames from "classnames";
import React, { useRef, useState } from "react";

import axios from "axios";


function SideBar ({area, setLogo, setOpenBg}) {

    //로고 부분
    const uploadLogo = async () => {
        //content-type: multipart/form-data 로전송
        let kinderCode = 'a02'
        const fd = new FormData() // multer 사용시 폼데이터형식으로 보내줘야함
        
        fd.append('logoImg', logoRef.current.files[0]) // 파일 ('필드명',파일)
        fd.append('kinderCode',kinderCode)
        
        const {data} = await axios({
            method:'post',
            url:'platform/upload/logo',
            data: fd,
        })
        alert(data.msg)
    }

    const logoRef= useRef()
    const getLogo = (e) => {
        setLogo(URL.createObjectURL(e.target.files[0]))
    }

    const BtnBox = ({addClick, deleteClick, saveClick}) => {
        return (
            <div className="btn-box">
                <button onClick={addClick}>추가</button>
                <button onClick={deleteClick}>삭제</button>
                <button onClick={saveClick}>저장</button>
            </div>
        )
    }

    // 배경 부분
    const openBgList = () => {
        setOpenBg(true)
    }

    return (
        <section className={classNames("side-bar", area)}>
            <div className="title">
                <h1>관리자 페이지</h1>
            </div>
            <div className="page-management ctrl">
                <h3>페이지 관리</h3>
                <ul>
                    <li>로고
                        <BtnBox 
                        addClick={()=>logoRef.current.click()}
                        deleteClick={()=>setLogo()}
                        
                        />
                    </li>
                    <li>네비게이션
                        <BtnBox 
                        addClick={()=>logoRef.current.click()}
                        deleteClick={()=>setLogo()}
                        
                        />
                    </li>
                    <li>배경
                        <BtnBox 
                        addClick={openBgList}
                        deleteClick={()=>setLogo()}
                        
                        />
                    </li>
                    <li>컨텐츠
                        <BtnBox 
                        addClick={()=>logoRef.current.click()}
                        deleteClick={()=>setLogo()}
                        
                        />
                    </li>
                    <ul>
                        <li>행사 일정</li>
                        <li>오늘의 식단</li>
                        <li>포토박스</li>
                        <li>공지사항</li>
                    </ul>
                </ul>
            </div>

            {/* 로고 추가 */}
            <input hidden type="file" onChange={getLogo} ref={logoRef}/>
            
        </section>
    )
}

export default SideBar