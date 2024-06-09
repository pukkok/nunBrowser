import classNames from "classnames";
import React, { useEffect, useState } from "react";
import ImgBox from "../../../Components/ImgBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HeaderBar ({ area, setGridSize, token }) {
    const navigate = useNavigate()

    const [sideOpen, setSideOpen] = useState(true)

    const foldSideBar = (e) => { // 사이드바 접기 펼치기
        setSideOpen(!sideOpen)
    }

    useEffect(()=>{
        if(sideOpen){
            setGridSize(250)
        }else{
            setGridSize(0)
        }
    },[sideOpen])

    const letsStartPage = async () => {
        const {data} = await axios.post('platform/startpage', {},{
            headers : {'Authorization' : `Bearer ${token}`}
        })
        alert(data.msg)
    }

    return(
        <section className={classNames("header-bar", area)}>
            <button onClick={foldSideBar}>
                <span className="material-symbols-outlined">menu</span>
            </button>
            <ImgBox addClass={'logo'} src={`${origin}/main/logo.png`} alt="유치원 모으미"/>
            <ul>
                {/* <li><button>사용법</button></li> */}
                {/* <li><button>저장</button></li> */}
                <li><button onClick={()=>window.location.reload()}>초기화</button></li>
                <li><button onClick={()=>letsStartPage()}>게시</button></li>
                <li><button className="out" onClick={()=>navigate(-1)}>나가기</button></li>
            </ul>
        </section>
    )

}

export default HeaderBar