import React , { useState }from "react";
import axiosData from '../Components/axiosData';
import sidoData from '../Datas/sidoData'
import sggData from '../Datas/sggData';
import './styles/SearchPage.css'

function SearchPage () {
    const [datas, setDatas] = useState()

    const fetchKinder = () => {
        axiosData(sidoCode, sgg, setDatas)
    }

    // 시도 코드 찾기
    const [sidoCode, setSidoCode] = useState(11)
    const [active, setActive] = useState({
        'sido' : 0, 'sgg' : 0
    })
    const sidoExtractor = (e, name) => {
        const {id, value} = e.target
        setSidoCode(value)
        setActive({...active, [name] : id})
    }
  
    // 시군구 코드 찾기
    const [sgg, setSgg] = useState()
    const sggExtractor = (e, name) => {
        const {id, value} = e.target
        setSgg(value)
        setActive({...active, [name] : id})
    }

    return(
        <div className="search">
            <div className="search-option">
                <ul>
                    <p>시/도</p>
                    <li>전체</li>
                    {sidoData && sidoData.map((option, id)=>{
                    const { city, code } = option
                    return <li key={id} id={id} value={code} onClick={(e)=>sidoExtractor(e, 'sido')}
                            className={id === +active['sido'] ? 'on' : ''}>{city}</li>
                    })}
                </ul>
                <ul>
                    <p>시/군/구</p>
                    {sidoCode && sggData &&
                    sggData.map((data, id) => {
                    const {sgg, code} = data
                    if(data.sidoCode === +sidoCode){
                        return (
                            <li key={id} id={id} value={code} onClick={(e)=>sggExtractor(e, 'sgg')}
                                className={id === +active['sgg'] ? 'on' : ''}>{sgg}</li>
                        )
                    }
                    })}
                </ul>
            </div>
            <button onClick={fetchKinder}>확인</button>

        {datas && datas.map((data, id)=> {
            const { addr, kindername} = data 
            return(
            <div key={id}>
                <p>{addr}</p>
                <p>{kindername}</p>
            </div>
            )
        })}
        </div>
    )
}

export default SearchPage