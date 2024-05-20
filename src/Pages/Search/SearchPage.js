import React , { useEffect, useRef, useState }from "react";
import { allAxiosData, axiosData} from '../../Components/axiosData';
import sidoData from '../../Datas/sidoData'
import sggData from '../../Datas/sggData';
import './styles/SearchPage.css'
import OptionFilter from "./OptionFilter";
import classNames from "classnames";
import PageBtn from "../../Components/PageBtn";

function SearchPage () {
    const [allData, setAllData] = useState([]) // 전체 데이터
    const [searchData, setSearchData] = useState([]) // 검색한 데이터
    const [viewData, setViewData] = useState([]) // 화면에 보여주는 데이터

    useEffect(()=>{ // 초기 랜더링
        allAxiosData(sggData, setAllData) // 전체 데이터 불러오기
    },[])

    // 지역 선택 토글
    const [openLocal, setOpenLocal] = useState(false)
    const codeRef = useRef({sido: 11, sgg: 11140}) // 시/도, 시/군/구 코드

    const openLocalOption = () => { // 지역선택 열기/닫기
        setOpenLocal(!openLocal)
    }

    const applyLocalOption = () => { // 지역필터 적용
        setOpenLocal(!openLocal)
        const {sido, sgg} = codeRef.current

        if(sido === 0){ // searchData가 0이되면 allData를 불러옴
            return setSearchData([])
        }

        if(sgg!==0){
            axiosData(sido, sgg, setSearchData)
        }else{ // 시/도 선택 시/군/구 전체
            const list = sggData.filter(data => {
                return data.sidoCode === sido
            })
            allAxiosData(list, setSearchData)
        }
    }

    // 지역 옵션 선택 & 시/도, 시/군/구 code 선택
    const [active, setActive] = useState({sido : 0, sgg : 0}) // 선택된 active
    const valueExtractor = (e, name, idx) => {
        codeRef.current = {...codeRef.current, [name]: e.target.value}
        if(name === 'sido'){ // 시/도 선택시 시/군/구 전체로 전환
            setActive({...active, [name]: idx, sgg: 0})
        }else{
            setActive({...active, [name]: idx})
        }
    }
    
    // 검색 기능
    const searchRef = useRef()
    const searchKinder = () => {
        const filtering = (arr) => {
            return arr.filter(data => {
                return data.kindername.includes(searchRef.current.value)
            })
        }

        if(searchData.length>0){ // 검색 기록이 있는 경우
            const result = filtering(searchData)
            if(result.length>0) return setSearchData(result)
        }else{ // 검색하지 않은 경우
            const result = filtering(allData)
            if(result.length>0) return setSearchData(result)
        }
        alert('조회 결과가 없습니다.')
    }

    const sggFilterData = sggData // 시/도code에 맞는 시/군/구 데이터 불러오기
    .filter(data => data.sidoCode === +codeRef.current.sido) 
    .sort((a,b)=>a.sgg.localeCompare(b.sgg)) // 문자 오름차순 정렬

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
        setItemsCnt(+value)
    }

    const [pagesCnt, setPagesCnt] = useState(1) // 페이지 개수
    const [itemsCnt, setItemsCnt] = useState(10) // 페이지당 아이템 개수

    useEffect(()=>{
        const pageNationViewer = (arr) => {
            const viewer = arr.filter((_, idx) => {
                return itemsCnt * (pagesCnt-1) <= idx && idx < itemsCnt * pagesCnt
            })
            setViewData(viewer)
        }

        if(searchData.length === 0){
            pageNationViewer(allData)
        }else{
            pageNationViewer(searchData)
        }
            
    }, [pagesCnt, itemsCnt, allData, searchData])

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
                    <p className="list">
                        검색 목록 <span>{searchData.length>0 ? searchData.length : allData ? allData.length : '로딩'}</span>
                    </p>
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
                    {allData && <PageBtn allLength={searchData.length>0 ? searchData.length : allData.length } dividedValue={itemsCnt} setFunc={setPagesCnt}/>}
                </div>
            </div>
        </div>
    )
}

export default SearchPage