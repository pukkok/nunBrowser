import React, { useEffect, useRef, useState } from "react";
import './styles/SearchModal.css'
import KakaoMap from "../../Components/KakaoMap";
import ImgBox from "../../Components/ImgBox";

function SearchModal ({ data, setClose }) {
    console.log(data)

    const closeModal = (e) =>{
        if(e.target.className === 'search-modal'){
            setClose(false)
        }
    }

    const [homepage, setHomePage] = useState()
    
    return(
        <section className="search-modal" onClick={closeModal}>
            <div className="detail">
                <div className="description">
                    <div className="title">
                        <h2><span>{data.establish}</span>{data.kindername}</h2>
                    </div>
                    <div className="info">
                        <h4><ImgBox src={`${origin}/search/icon-summary-base.png`}/>기본정보</h4>
                        <p><span>전화번호</span> {data.telno}</p>
                        <p><span>운영시간</span> {data.opertime}</p>
                        <p><span>대표자명</span> {data.rppnname}</p>
                        <p><span>원장명</span> {data.ldgrname}</p>
                        <p><span>설립일</span> {data.edate.slice(0,4)+'-'+data.edate.slice(4,6)+'-'+data.edate.slice(6,8)}</p>
                        <p><span>개원일</span> {data.odate.slice(0,4)+'-'+data.odate.slice(4,6)+'-'+data.odate.slice(6,8)}</p>
                        <p><span>관할행정기관</span> {data.officeedu} / {data.subofficeedu}</p>
                        <p><span>주소</span> {data.addr}</p>
                        <p><span>홈페이지</span> {homepage ? homepage : '등록된 홈페이지가 없습니다.'} </p>
                    </div>
                    <div className="info one-data">
                        <h4><ImgBox src={`${origin}/search/icon-summary-base.png`}/>통학차량</h4>
                        <span>운영</span>
                    </div>
                </div>
                <>
                </>
                <KakaoMap addr={data.addr} pinName={data.kindername}/>
            </div>
        </section>
    )
}

export default SearchModal