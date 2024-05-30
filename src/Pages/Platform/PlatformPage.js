import React, { useEffect, useRef, useState } from "react";
import AllergyTable from "./AllergyTable";
import './styles/PlatformPage.css'
import MenuTable from "./MenuTable";
import Container from '../../Components/Container'
import ImgBox from '../../Components/ImgBox'

import axios from "axios";

function PlatformPage () {


    const uploadLogo = async () => {
        //content-type: multipart/form-data 로전송
        let kinderCode = 'a02'
        const fd = new FormData() // multer 사용시 폼데이터형식으로 보내줘야함
        
        fd.append('logoImg', logoRef.current.files[0]) // 파일 ('필드명',파일)
        fd.append('kinderCode',kinderCode)
        const { data } = await axios.post('platform/upload/logo', fd, {
            headers:{
                'Content-Type':'multipart/form-data',
                // 'Authorization':`Bearer ${token}`
            }
        })
        console.log(data)
        
    }


    const [pickTemplate, setPickTemplate] = useState(0)

    const selectTemplate = (e) => {
        if(pickTemplate === e.target.value){
            setPickTemplate(0)
        }else{
            setPickTemplate(e.target.value)
        }
    }

    const [selectBg, setSelectBg] = useState()

    const sampleNav = ['유치원 안내', '교육과정', '알림/공지사항', '갤러리', '자유게시판']
    const sampleNavDepth2 = [
        {'유치원 안내' : ['교육 방향', '유치원 연혁', '유치원 현황', '유치원 상징', '교육목표', '유치원 시설', '급식소식', '찾아오시는 길']},
    
    ]
    const sampleBg = 'sample-bg1.png'

    const [logo, setLogo] = useState()
    const logoRef =useRef()
    const bgRef =useRef()
    const getLogo = (e) => {
        setLogo(URL.createObjectURL(e.target.files[0]))
    }
    useEffect(()=>{
        if(logoRef.current.files[0]){
            console.log(logoRef.current.files[0])
        }
    },[logo])

    const [logoPath, setLogoPath] = useState('uploads/bg/Z2FyYWstbG9nby5wbmc=_1717045490550.png')

    const [selectSampleBg, setSelectSampleBg] = useState()

    const [bg, setBg] = useState()
    const bgSelector = (bg) => {
        setBg(bg)
    }

    const getBg = (e) => {
        setAddBgs([...addBgs, e.target.files[0]])
        setBg(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(()=>{
        if(bgRef.current.files[0]){
        }
    },[bg])

    const sampleBgs = [
        'sample-bg1.png',
        'sample-bg2.jpg',
        'sample-bg3.png',
        'sample-bg4.png',
        'sample-bg5.png',
    ]

    const [addBgs, setAddBgs] = useState([])

    return(
        <section className="platform" >
            {/* <div>관리자</div>
            <ul onClick={selectTemplate}>
                <li value={0}></li>
                <li value={1}>메뉴</li>
                <li value={2}>날짜모달</li>
                <li value={3}>알러지</li>
            </ul>
            {pickTemplate === 1 && <MenuTable />}
            {<AllergyTable pull={pickTemplate === 3}/>} */}
                <div className="nav">
                    <Container>
                    <ul>
                        <button onClick={uploadLogo}>로고올리기</button>
                        <div><img src={logo}/></div>
                        <button onClick={()=>{logoRef.current.click()}}>파일선택</button>
                        <input hidden type="file" onChange={getLogo} ref={logoRef}/>
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
                </Container>
            </section>
    )
}

export default PlatformPage