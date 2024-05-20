import React , { useEffect, useRef, useState }from "react";
import { allAxiosData, axiosData, axiosPagesOptionData} from '../../Components/axiosData';
import sidoData from '../../Datas/sidoData'
import sggData from '../../Datas/sggData';
import './styles/SearchPage.css'
import OptionFilter from "./OptionFilter";
import classNames from "classnames";
import PageBtn from "../../Components/PageBtn";

function SearchPage () {
    const [allData, setAllData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [viewData, setViewData] = useState([])
    const [searchLength, setSearchLength] = useState()
    
    const [isChange, setIsChange] = useState(false)

    const [pageCnt, setPageCnt] = useState(1)

    useEffect(()=>{ // 초기 랜더링
        allAxiosData(sggData, setAllData)
    },[])

    useEffect(()=>{
        setSearchLength(allData.length)
    },[allData])

    // 지역 선택 토글
    const [openLocal, setOpenLocal] = useState(false)
    const [selectedCode, setSelectedCode] = useState({sido : 11, sgg : 11140, cnt: 10}) // 시/도, 시/군/구 코드
    const codeRef = useRef({sido: 11, sgg: 11140})

    const openLocalOption = () => {
        setOpenLocal(!openLocal)
    }

    const applyLocalOption = () => {
        const {sido, sgg} = selectedCode
        setOpenLocal(!openLocal)
        setIsChange(true)
        setSelectedCode({...selectedCode, ...codeRef.current})
        axiosData(sido, sgg, setSearchLength)
    }

    // 지역 옵션 선택
    const [active, setActive] = useState({sido : 0, sgg : 0}) // 선택된 active
    const valueExtractor = (e, name, idx) => {
        codeRef.current = {...codeRef.current, [name]: e.target.value}
        if(name==='sido' && idx===0){ // 전체 선택시 초기화
            setActive({sido: 0, sgg: 0})
        }else{
            setActive({...active, [name] : idx})
        }
    }

    // 검색 기능
    const searchRef = useRef()
    const searchKinder = () => {
        const result = allData.filter( data =>{
            return data.kindername.includes(searchRef.current.value) 
        })
        setIsChange(true)
        setViewData(result)
        setSearchLength(result.length)
    }

    const sggFilterData = sggData
    .filter(data => data.sidoCode === +codeRef.current.sido)
    .sort((a,b)=>a.sgg.localeCompare(b.sgg))

    const [listOption, setListOption] = useState({
        isActive : false, text : '10개씩 보기'
    })

    const openListOption = () => {
        setListOption({...listOption, isActive: !listOption.isActive})
    }

    const changeListCnt = (e) => {
        e.stopPropagation() // 체이닝 방지
        const { value, innerText } = e.target
        setListOption({...listOption, 
            isActive : false,
            text: innerText,
        })
        setSelectedCode({...selectedCode, cnt: value})
    }

    useEffect(()=>{
        const {sido, sgg, cnt} = selectedCode

        const allPageNation = () => {
            const viewer = allData.filter((_, idx) => {
                return +cnt * (pageCnt-1) <= idx && idx < +cnt * pageCnt
            })
            setViewData(viewer)
        }
        
        if(!isChange){
            if(allData.length === searchLength){
                allPageNation()
            }
        }else{
            axiosPagesOptionData(sido, sgg, pageCnt, cnt, setViewData)
        }
            
    }, [selectedCode, pageCnt, allData, searchLength, isChange])


    return(
        <div className="Search">
            <div className="search-local">
                <div className="local-select" >
                    <button onClick={openLocalOption}>지역선택</button>
                    <div className={classNames("local-option", {on : openLocal})}>
                        <nav>
                            <ul>
                                <p>시/도</p>
                                <li value={'all'} onClick={e=>valueExtractor(e, 'sido', 0)}
                                className={classNames({on : 0 === +active['sido']})}>전체</li>
                                {sidoData && sidoData.map((option, idx)=>{
                                const { city, code } = option
                                return <li key={idx} value={code} onClick={(e)=>valueExtractor(e, 'sido', idx+1)}
                                        className={classNames({on : idx+1 === +active['sido']})}>{city}</li>
                                })}
                            </ul>
                            <ul>
                                <p>시/군/구</p>
                                {active.sido === 0 ? 
                                <li value={'all'} onClick={e=>valueExtractor(e, 'sgg', 0)}
                                className={classNames({on : 0 === +active['sgg']})}>전체</li> : 
                                <>
                                    <li value={'all'} onClick={e=>valueExtractor(e, 'sgg', 0)}
                                    className={classNames({on : 0 === +active['sgg']})}>전체</li>
                                    {sggFilterData.map((data, idx) => {
                                        const {sgg, code} = data
                                        return  <li key={idx} value={code} onClick={(e)=>valueExtractor(e, 'sgg', idx+1)}
                                                className={classNames({on : idx+1 === +active['sgg']})}>{sgg}</li>
                                    })}
                                
                                </>
                                }
                            </ul>
                        </nav>
                        <div className="btn-box">
                            <button onClick={(e)=>valueExtractor(e, 'sido', 0)}>초기화</button>
                            <button onClick={applyLocalOption}>적용</button>
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
                <div className="search-result">
                    {/* 나중에 바꿀 loading 추가 후 8523 바꾸기 */}
                    {/* <p className="list">검색 목록 <span>{filteredData.length>0 ? filteredData.length : 8523}</span></p> */}
                    <p className="list">검색 목록 <span>{viewData && searchLength ? searchLength : '로딩'}</span></p>
                    <div onClick={openListOption} className={classNames('option', {on : listOption.isActive})}>
                        <p>{listOption.text}</p>
                        <ul onClick={changeListCnt} >
                            <li value={10}>10개씩 보기</li>
                            <li value={20}>20개씩 보기</li>
                            <li value={50}>50개씩 보기</li>
                        </ul>
                    </div>
                </div>

                <div className="search-datas">
                {viewData.length>0 && viewData.map((data, id)=> {
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
                <div className="pages-btns">
                    {searchLength && <PageBtn allLength={searchLength} dividedValue={selectedCode.cnt} setFunc={setPageCnt}/>}
                </div>
            </div>
        </div>
    )
}

export default SearchPage