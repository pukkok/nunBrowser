import React, { useEffect, useRef, useState } from "react";
import './styles/PlatformPage.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import ImgBox from "../../Components/ImgBox";
import NotFoundPage from "../NotFoundPage";
import Container from "../../Components/Container";
import { EventDateBox1, EventDateBox2 } from "./TemplateBox/EventDateBox";

function PlatformPage ({token}) {

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

    console.log(loadData)

    const contentGrid = loadData && loadData.data && {
        gridTemplateColumns: loadData.data.gridCoord.col ? 
        `repeat(${loadData.data.gridCoord.col}, ${loadData.data.containerSize / loadData.data.gridCoord.col + loadData.data.containerUnit})` : '1fr',
        gridTemplateRows: loadData.data.gridCoord.row ? 
        `repeat(${loadData.data.gridCoord.row}, minmax(300px, 1fr))` : '1fr',
        
    }

    return(
        <section className={"platform"}>
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
                            <Link to={`/kinder/${loadData.data.originUrl}`}>
                                <img src={`http://localhost:5000/${loadData.data.logoPath}`}/>
                            </Link>
                        </div>
                        <nav className="navigation" style={{width : `calc(100% - ${loadData.data.logoWidth+'px'})`}}>
                            <ul className="depth1">
                            {loadData.data.navDepth1 && loadData.data.navDepth1.map((mainData, mainIdx)=>{
                                return (
                                    <li key={mainIdx}><Link to={`${mainData.mainPath}`}>{mainData.mainName}</Link>
                                        {loadData.data.navDepth2 && 
                                        <ul className="depth2">
                                            {loadData.data.navDepth2[mainIdx] && loadData.data.navDepth2[mainIdx].map((data, subIdx) => {
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