import React, { useEffect, useRef, useState } from "react";
import './styles/Template.css'
import ImgBox from "../../../Components/ImgBox";

import classNames from "classnames";

function Template ({ logo }) {

    return(
        <section className={"template"} >
            
            <div className="nav default-option">
                <button className={logo && 'no-border'}>
                    {logo ? <ImgBox addClass={'logo-box'} src={logo}/> : '로고'}
                </button> 
                <button>네비게이션</button>
            </div>

            <div className={classNames("bg", 'default-option')}>
                <button>
                    {/* {bg ? <ImgBox addClass={'preview-bg'} 
                    src={ sampleBgs.includes(bg) ? `${origin}/platform/${bg}`: bg} /> : 
                    '배경 업로드 하기'} */}
                    배경업로드
                </button>
            </div>
            <div className="content default-option">
                <button>컨텐츠 추가</button>
            </div>

            

            
            {/* <div className="nav">
                <Container>
                <ul>
                    <button onClick={uploadLogo}>로고올리기</button>
                    
                    
                    
                    <li>logo위치</li>
                    {sampleNav.map((list, idx)=>{
                        return <li key={idx}>{list}</li>
                    })}
                </ul>
                </Container>
            </div>
            <div className="bg">
                <div>{bg && <ImgBox addClass={'preview-bg'} src={ sampleBgs.includes(bg) ? `${origin}/platform/${bg}`: bg} />}</div>
                <div className="normal-bg">
                    {sampleBgs.map((bg, idx)=>{
                        let src = `${origin}/platform/${bg}`
                        return <ImgBox handleClick={()=>bgSelector(bg)} addClass={'sample'} key={idx} src={src}></ImgBox>
                    })}
                    {addBgs.length>0 && addBgs.map((bg, idx)=>{
                        let src = URL.createObjectURL(bg)
                        return <ImgBox handleClick={()=>bgSelector(src)} addClass={'sample'} src={src}/>
                    })}
                    <button onClick={()=>bgRef.current.click()}>배경올리기</button>
                </div>
                <input hidden type="file" onChange={getBg} ref={bgRef}/>
                <Container>
                    <div className="content">
                        컨텐트
                    </div>
                </Container>
            </div>
                <Container>
                <div className="main-box">
                    <div className="date-info-box">
                        행사 일정
                    </div>
                    <div className="menu-box">
                        오늘의 식단
                    </div>
                    <div className="photo-box">
                        <ImgBox src={`http://localhost:5000/${logoPath}`}/>
                        포토박스
                    </div>
                    <div className="notice">
                        공지사항
                        유치원소식
                        가사통신
                    </div>
                    <div className="imsi2">
                        임시2
                    </div>
                    <div className="imsi3">
                        임시3
                    </div>
                </div>
                </Container> */}
            </section>
    )
}

export default Template