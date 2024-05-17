import React , { useState }from "react";
import axiosData from '../../Components/axiosData';
import sidoData from '../../Datas/sidoData'
import sggData from '../../Datas/sggData';
import './styles/SearchPage.css'
import OptionFilter from "./OptionFilter";

function SearchPage () {
    const [datas, setDatas] = useState()

    const fetchKinder = () => {
        const {sido, sgg} = selectedCode
        axiosData(sido, sgg, setDatas)
    }

    const [selectedCode, setSelectedCode] = useState({sido : 11, sgg : 0}) // 시/도, 시/군/구 코드
    const [active, setActive] = useState({'sido' : 0, 'sgg' : 0}) // 선택된 active
    const valueExtractor = (e, name, idx) => {
        setSelectedCode({...selectedCode, [name] : e.target.value})
        setActive({...active, [name] : idx})
    }

    console.log(selectedCode)

    return(
        <div className="search">
            <div className="search-option">
                <ul>
                    <p>시/도</p>
                    <li value={'all'}>전체</li>
                    {sidoData && sidoData.map((option, idx)=>{
                    const { city, code } = option
                    return <li key={idx} value={code} onClick={(e)=>valueExtractor(e, 'sido', idx)}
                            className={idx === +active['sido'] ? 'on' : ''}>{city}</li>
                    })}
                </ul>
                <ul>
                    <p>시/군/구</p>
                    <li value={'all'}>전체</li>
                    {selectedCode.sido && sggData &&
                    sggData.map((data, idx) => {
                    const {sgg, code} = data
                    if(data.sidoCode === +selectedCode.sido){
                        return (
                            <li key={idx} value={code} onClick={(e)=>valueExtractor(e, 'sgg', idx)}
                                className={idx === +active['sgg'] ? 'on' : ''}>{sgg}</li>
                        )
                    }
                    })}
                </ul>
            </div>
            <button onClick={fetchKinder}>확인</button>
            <OptionFilter/>

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