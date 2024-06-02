import classNames from "classnames";
import React from "react";
import ImgBox from "../../../Components/ImgBox";
import { useNavigate } from "react-router-dom";

function HeaderBar ({ area, setGridSize }) {
    const navigate = useNavigate()

    const foldSideBar = (e) => { // 사이드바 접기 펼치기
        if(e.target.innerText === '사이드 접기'){
            e.target.innerText = '펼치기'
            setGridSize(0)
        }else{
            e.target.innerText = '사이드 접기'
            setGridSize(250)
        }
    }

    return(
        <section className={classNames("header-bar", area)}>
            <ImgBox src="" alt="유치원 모으미"/>
            <ul>
                <li><button onClick={foldSideBar}>사이드 접기</button></li>
                <li><button>사용법</button></li>
                <li><button>저장</button></li>
                <li><button onClick={()=>window.location.reload()}>초기화</button></li>
                <li><button>게시</button></li>
                <li><button className="out" onClick={()=>navigate(-1)}>나가기</button></li>
            </ul>
        </section>
    )

}

export default HeaderBar