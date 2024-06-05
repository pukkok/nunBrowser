import React, { useEffect, useRef, useState } from "react";
import './styles/PlatformPage.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import ImgBox from "../../Components/ImgBox";

function PlatformPage ({token}) {

    const { kinderUrl } = useParams()
    const [loadData, setLoadData] = useState()

    useEffect(()=>{
        const getPageData = async () => {
            const {data} = await axios.get(`user/kinderData/${kinderUrl}`)
            if(data.code !== 200){
                alert(data.msg)
            }
            setLoadData(data.result)
            console.log(data.result.data.navDepth1)
            console.log(data.result.data.navDepth2)
        }
        getPageData()
    },[])

    return(
        <section className={"platform"}>
            {!loadData && 
                <div>페이지가 존재하지 않습니다.</div>
            }
            {loadData && 
            <div className="kinder-page">
                <div className="nav">
                    <button className="logo">
                        <img src={`http://localhost:5000/${loadData.data.logoPath}`}/>
                    </button>
                    <nav className="navigation">
                        <ul>
                        {loadData.data.navDepth1 && loadData.data.navDepth1.map((mainData, mainIdx)=>{
                            return (
                                <li key={mainIdx}><Link to={`${mainData.mainPath}`}>{mainData.mainName}</Link>
                                    {loadData.data.navDepth2[mainIdx] && 
                                    <ul>
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

                <div className="bg">
                    <ImgBox src={loadData.data.selectBgSrc}/>
                </div>

            </div>
            }
        </section>
    )
}

export default PlatformPage