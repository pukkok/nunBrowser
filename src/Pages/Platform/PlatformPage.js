import React, { useEffect, useRef, useState } from "react";
import './styles/PlatformPage.css'
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import ImgBox from "../../Components/ImgBox";
import NotFoundPage from "../NotFoundPage";
import Container from "../../Components/Container";
import { EventDateBox1, EventDateBox2 } from "./TemplateBox/EventDateBox";
import { PhotoBox1 } from "./TemplateBox/PhotoBox";
import { TodayMenuBox1 } from "./TemplateBox/TodayMenuBox";
import { NoticeBox1 } from "./TemplateBox/NoticeBox";

function PlatformPage () {

    const { kinderUrl } = useParams()
    const [loadData, setLoadData] = useState()

    useEffect(()=>{ // 로드된 데이터가 있는지 체크
        const getPageData = async () => {
            const {data} = await axios.get(`user/kinderData/${kinderUrl}`)
            if(data.code !== 200){
                return alert(data.msg)
            }
            setLoadData(data.result)
        }
        getPageData()
    },[])

    const contentGrid = loadData && loadData.data.gridCoord && {
        gridTemplateColumns: loadData.data.gridCoord.col ? 
        `repeat(${loadData.data.gridCoord.col}, 1fr)` : '1fr',
    }

    const Tester = ({item}) => {
        return(<p>{item}</p>)
    }

    return(
        <section className={"platform"}>
            <Routes>
                {loadData && loadData.data.navDepth1 && loadData.data.navDepth1.map((mainData, mainIdx)=>{
                    return (
                        <Route key={mainIdx} path={`/${mainData.mainPath}/*`}>
                            {loadData.data.navDepth2 && loadData.data.navDepth2[mainIdx] &&       
                                loadData.data.navDepth2[mainIdx].map((data, subIdx) => {
                                    return <Route key={subIdx} path={`${data.subPath}`} element={<Tester item={data.subName}/>}></Route>
                                })
                            }
                        </Route>
                    )
                })}
            </Routes>
            {!loadData && 
                <NotFoundPage/>
            }
            {loadData && 
            <div className="kinder-page">
                {/* 헤더 part */}
                <div className="header">
                    <Container 
                    width={loadData.data.containerUnit === 'px' && loadData.data.containerSize}
                    perWidth={loadData.data.containerUnit === '%' && loadData.data.containerSize}>
                    <div className="nav-bar">
                        <div className="logo" style={{width : loadData.data.logoWidth+'px', height: loadData.data.logoHeight+'px'}}>
                            <Link to={`/kinder/${loadData.originUrl}`}>
                                <img src={`http://localhost:5000/${loadData.data.logoPath}`}/>
                            </Link>
                        </div>
                        <nav className="navigation" style={{width : `calc(100% - ${loadData.data.logoWidth+'px'})`}}>
                            <ul className="depth1">
                            {loadData.data.navDepth1 && loadData.data.navDepth1.map((mainData, mainIdx)=>{
                                return (
                                    <li key={mainIdx}><Link to={`${mainData.mainPath}`}>{mainData.mainName}</Link>
                                        {loadData.data.navDepth2 &&  
                                            loadData.data.navDepth2[mainIdx] && 
                                            <ul className="depth2">    
                                            {loadData.data.navDepth2[mainIdx].map((data, subIdx) => {
                                                return <li key={subIdx}><Link to={`${mainData.mainPath}/${data.subPath}`}>{data.subName}</Link></li>
                                            })}
                                            </ul>
                                        }
                                    </li>
                                )
                            })}
                            </ul>
                        </nav>
                    </div>
                    </Container>
                </div>
                {/* 배경 파트 */}
                <div className="bg">
                    <ImgBox src={loadData.data.selectBgSrc}/>
                </div>
                <Container 
                width={loadData.data.containerUnit === 'px' && loadData.data.containerSize}
                perWidth={loadData.data.containerUnit === '%' && loadData.data.containerSize}>
                    <div className="content" style={contentGrid}>
                        {loadData.data.gridCoord && 
                        Array(loadData.data.gridCoord.row * loadData.data.gridCoord.col).fill(0).map((_, idx) => {
                            let key = loadData.data.zoneData['zone'+(idx+1)]
                            let type = loadData.data.zoneData[key]
                            return <div key={idx} className="content-item">
                                {key === 'eventDate' && type === 1 && <EventDateBox1/>}
                                {key === 'eventDate' && type === 2 && <EventDateBox2/>}
                                {key === 'photoBox' && type === 1 && <PhotoBox1/>}
                                {key === 'todayMenu' && type === 1 && <TodayMenuBox1/>}
                                {key === 'notice' && type === 1 && <NoticeBox1/>}
                                </div>
                        })}
                    </div>
                </Container>
            </div>
            }
        </section>
    )
}

export default PlatformPage