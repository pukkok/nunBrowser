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
    const [localData, setLocalData] = useState([]) // 검색한 데이터 범위
    const [filterData, setFilterData] = useState([]) // 검색한 결과 
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
        setFilterData([])
        const {sido, sgg} = codeRef.current

        if(sido === 0){ // searchData가 0이되면 allData를 불러옴
            return setLocalData([])
        }

        if(sgg!==0){
            axiosData(sido, sgg, setLocalData)
        }else{ // 시/도 선택 시/군/구 전체
            const list = sggData.filter(data => {
                return data.sidoCode === sido
            })
            allAxiosData(list, setLocalData)
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
        console.log(searchRef.current.value)

        if(localData.length>0){ // 검색 기록이 있는 경우
            const result = filtering(localData)
            if(result.length>0) return setFilterData(result)
        }else{ // 검색하지 않은 경우
            const result = filtering(allData)
            if(result.length>0) return setFilterData(result)
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

    // 페이지당 보여주는 아이템 개수 변경
    const changeListCnt = (e) => {
        e.stopPropagation() // 체이닝 방지
        const { value, innerText } = e.target
        setListOption({...listOption, 
            isActive : false,
            text: innerText,
        })
        setItemsCnt(+value)
        setPagesCnt(1)
    }

    const [pagesCnt, setPagesCnt] = useState(1) // 페이지 개수
    const [itemsCnt, setItemsCnt] = useState(10) // 페이지당 아이템 개수

    useEffect(()=>{ // 데이터 보여주기
        const pageNationViewer = (arr) => {
            const viewer = arr.filter((_, idx) => {
                return itemsCnt * (pagesCnt-1) <= idx && idx < itemsCnt * pagesCnt
            })
            setViewData(viewer)
        }

        if(localData.length === 0){
            pageNationViewer(allData)
        }else{
            if(filterData.length === 0){
                pageNationViewer(localData)
            }else{
                pageNationViewer(filterData)
            }
        }
            
    }, [pagesCnt, itemsCnt, allData, localData, filterData])


    const [filterOption, setFilterOption] = useState({})
    useEffect(()=>{
        
        let keys = Object.keys(filterOption)
        
        const filterOptionData = () => { // 체크박스 옵션에 따른 데이터 검색
            let newAlldata = []
            localData.length>0 ? newAlldata = JSON.parse(JSON.stringify(localData)) 
            : newAlldata = JSON.parse(JSON.stringify(allData))

            keys.forEach(key => {
                if(key === '설립 유형'){
                    newAlldata = newAlldata.filter(data => {
                        return filterOption[key].includes(data.establish) 
                    })
                }

                if(key === '제공 서비스'){
                    if(filterOption[key].includes('특수학급')){
                            newAlldata = newAlldata.filter(data => {
                                return data.shclcnt !== null
                            })
                    }else{
                        let result = []
                        newAlldata.forEach(data => {
                            let dataCode = data.kindercode
                            let ot = data.opertime.split('~')[1].slice(0,2)
                            
                            if(!filterOption[key].includes('방과후과정')){
                                if(filterOption[key].includes('미운영')){
                                    if(ot<15){
                                        result.push(dataCode)
                                    }
                                }
                                if(filterOption[key].includes('운영')){
                                    if(ot>=15){
                                        result.push(dataCode)
                                    }
                                }
                            }else{
                                result.push(dataCode)
                            }
                        })
                        newAlldata = newAlldata.filter(data => {
                            return result.includes(data.kindercode)
                        })
                        
                    }
                }
            })
            if(newAlldata.length>0){
                setFilterData(newAlldata)
            }else{
                alert('일치하는 데이터가 없습니다.')
            }
        }

        filterOptionData()
        
    },[filterOption])

    return(
        <div className="Search">
            <div className="search-local">
                <div className="local-select" >
                    <button onClick={openLocalOption}>지역선택 </button>
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
                <OptionFilter setResult={setFilterOption}/>
            </div>

            <div className="search-viewer">
                <div className="search-result">
                    <p className="list">
                        검색 목록 <span>{
                        filterData.length>0 ? filterData.length : localData.length>0 ? localData.length : 
                        allData ? allData.length : '로딩'}
                        
                        </span>
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
                    const { addr, establish, kindername, edate, opertime, } = data 
                    return(
                        <div key={id} className="search-data">
                            <p>주소 : {addr}</p>
                            <p>유치원 명 : {kindername}</p>
                            <p>설립일 : {edate}</p>
                            <p>설립유형 : {establish}</p>
                            <p>운영시간 : {opertime}</p>
                        </div>
                    )
                })}
                </div>
                <div className="pages-btns">
                    {allData && <PageBtn allLength={localData.length>0 ? localData.length : allData.length } dividedValue={itemsCnt} setFunc={setPagesCnt}/>}
                </div>
            </div>
        </div>
    )
}

export default SearchPage