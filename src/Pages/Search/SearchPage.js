import React , { useEffect, useRef, useState }from "react";
import {axiosData, allAxiosData} from '../../Components/axiosData';
import sidoData from '../../Datas/sidoData'
import sggData from '../../Datas/sggData';
import './styles/SearchPage.css'
import OptionFilter from "./OptionFilter";
import classNames from "classnames";

function SearchPage () {
    const [datas, setDatas] = useState([])

    const [filteredData, setFilteredData] = useState([])

    const [allData, setAllData] = useState([])
    
    useEffect(()=>{
        // fetchKinder()
        allAxiosData(sggData, setAllData)
    },[])

    const [selectedCode, setSelectedCode] = useState({sido : 11, sgg : 11680}) // 시/도, 시/군/구 코드
    const [active, setActive] = useState({'sido' : 0, 'sgg' : 0}) // 선택된 active
    const valueExtractor = (e, name, idx) => {
        setSelectedCode({...selectedCode, [name] : e.target.value})
        setActive({...active, [name] : idx})
    }

    // 검색 기능
    const searchRef = useRef()
    const searchKinder = () => {
        const result = allData.filter(data=>{
            return data.kindername.includes(searchRef.current.value) 
        })

        setFilteredData(result)
    }


    const [openLocal, setOpenLocal] = useState(false)
    const openLocalOption = () => {
        setOpenLocal(!openLocal)
    }

    const sggFilterData = sggData
    .filter(data => data.sidoCode === +selectedCode.sido)
    .sort((a,b)=>a.sgg.localeCompare(b.sgg))

    return(
        <div className="Search">
            <div className="search-local">
                <div className="local-select" >
                    <button onClick={openLocalOption}>지역선택</button>
                    <div className={classNames("local-option", {on : openLocal})}>
                        <nav>
                            <ul>
                                <p>시/도</p>
                                <li>전체</li>
                                {sidoData && sidoData.map((option, idx)=>{
                                const { city, code } = option
                                return <li key={idx} value={code} onClick={(e)=>valueExtractor(e, 'sido', idx)}
                                        className={idx === +active['sido'] ? 'on' : ''}>{city}</li>
                                })}
                            </ul>
                            <ul>
                                <p>시/군/구</p>
                                {sggData.length === sggFilterData.length ? 
                                <li>전체</li> : 
                                <>
                                    <li>전체</li>
                                    {sggFilterData.map((data, idx) => {
                                        const {sgg, code} = data
                                        return  <li key={idx} value={code} onClick={(e)=>valueExtractor(e, 'sgg', idx)}
                                                className={idx === +active['sgg'] ? 'on' : ''}>{sgg}</li>
                                        })}
                                
                                </>
                                }
                            </ul>
                        </nav>
                        <div className="btn-box">
                            <button>초기화</button>
                            <button onClick={openLocalOption}>적용</button>
                        </div>
                    </div>
                </div>
                    
                <label className="search-kinder">
                    <input ref={searchRef} placeholder="유치원명으로 검색"/>
                    <button onClick={searchKinder}>검색</button>
                </label>
            </div>
            

            <div className="search-filter">
                <OptionFilter/>
                <button>선택한 조건으로 검색</button>
            </div>
            <div className="search-viewer">
                <div>
                    검색 목록 <p>{filteredData.length>0 ? filteredData.length : 8523}</p>

                    <ul>
                        <li>10개씩 보기</li>
                        <li>20개씩 보기</li>
                        <li>50개씩 보기</li>
                    </ul>
                </div>

                {filteredData && (filteredData.length>0 ? filteredData : allData).map((data, id)=> {
                    const { addr, establish, kindername, opertime} = data 
                    return(
                    <div key={id} className="search-data">
                        <p>주소 : {addr}</p>
                        <p>유치원 명 : {kindername}</p>
                        <p>설립일 : {establish}</p>
                        <p>운영시간 : {opertime}</p>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchPage