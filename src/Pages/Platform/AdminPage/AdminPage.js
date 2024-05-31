import React, { useState, useRef } from "react";
import PlatformPage from '../PlatformPage'
import './styles/AdminPage.css'
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import Template from "./Template";

import ImgBox from "../../../Components/ImgBox";

function AdminPage () {

    const [logo, setLogo] = useState()
    const [openBg, setOpenBg] = useState(false)
    // 배경 업로드 부분
    
    const BGList = () => {
        const sampleBgs = [
            'sample-bg1.png','sample-bg2.jpg','sample-bg3.png',
            'sample-bg4.png','sample-bg5.png',
        ]

        const bgRef =useRef()
        const [bg, setBg] = useState() // 미리보기 배경
        const [addBgs, setAddBgs] = useState([]) // 새로 추가된 배경
        
        const getBg = (e) => {
            setAddBgs([...addBgs, e.target.files[0]])
            setBg(URL.createObjectURL(e.target.files[0]))
        }

        const bgSelector = (bg) => {
            setBg(bg)
        }
        
        return(
            <div className="bg-list">
                <div className="sample-box">
                    {sampleBgs.map((bg, idx)=>{
                        let src = `${origin}/platform/${bg}`
                        return <ImgBox handleClick={()=>bgSelector(bg)} addClass={'sample'} key={idx} src={src}></ImgBox>
                    })}
                    {addBgs.length>0 && addBgs.map((bg, idx)=>{
                        let src = URL.createObjectURL(bg)
                        return <ImgBox handleClick={()=>bgSelector(src)} addClass={'sample'} src={src}/>
                    })}
                </div>
                <div className="btn-box">
                    <button onClick={()=>bgRef.current.click()}>배경 추가하기</button>
                    <button>배경 등록</button>
                    <button onClick={()=>setAddBgs([])}>추가 목록 초기화</button>
                    <button onClick={()=>setOpenBg(false)}>닫기</button>
                </div>
                {/* 배경 추가 옵션 열기 */}
                <input hidden type="file" onChange={getBg} ref={bgRef}/>
            </div>
        )
    }

    return(
        <section className="admin-page open">
            <SideBar area='l' 
            setLogo={setLogo}
            setOpenBg={setOpenBg}
            />
            <HeaderBar area='h'/>
            <div className="box-option c">
                <h1>기본 템플릿</h1>
                <Template logo={logo}/>
            </div>
            <div className="ctrl-modal">
                {openBg && <BGList/>}
            </div>
        </section>
    )
}

export default AdminPage