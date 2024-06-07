import React, { useEffect, useRef, useState } from "react";
import './styles/PlatformPage.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import ImgBox from "../../Components/ImgBox";
import NotFoundPage from "../NotFoundPage";
import Container from "../../Components/Container";

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
                                        {loadData.data.navDepth2[mainIdx] && 
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

                <div className="bg">
                    <ImgBox src={loadData.data.selectBgSrc}/>
                </div>
                <Container 
                width={loadData.data.containerUnit === 'px' && loadData.data.containerSize}
                perWidth={loadData.data.containerUnit === '%' && loadData.data.containerSize}>
                    <div className="content">

                    </div>
                </Container>
            </div>
            }
        </section>
    )
}

export default PlatformPage