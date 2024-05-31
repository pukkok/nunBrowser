import classNames from "classnames";
import React from "react";
import ImgBox from "../../../Components/ImgBox";
import { useNavigate } from "react-router-dom";

function HeaderBar ({ area, allunset }) {
    const navigate = useNavigate()

    return(
        <section className={classNames("header-bar", area)}>
            <ImgBox src="" alt="유치원 모으미"/>
            <ul>
                <li><button>설명 보기</button></li>
                <li><button>옵션 저장</button></li>
                <li><button onClick={()=>window.location.reload()}>전체 초기화</button></li>
                <li><button className="out" onClick={()=>navigate(-1)}>나가기</button></li>
            </ul>
        </section>
    )

}

export default HeaderBar