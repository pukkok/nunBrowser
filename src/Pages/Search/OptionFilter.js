import React, { useRef, useState } from "react";
import './styles/OptionFilter.css'
import CheckBox from "../../Components/CheckBox";
import classNames from "classnames";

const optionBox = [
    { title : '설립 유형', options : ['전체', '국공립', '사립'] , subOption1 : ['국립','공립(단설)','공립(병설)'], subOption2 : ['사립(법인)', '사립(사인)'] },
    { title : '제공 서비스', options : ['전체', '방과후과정', '특수학급', '일반', '영아전담', '기타보육']},
    { title : '휴·폐원 여부', options : ['휴원 제외', '폐원 제외']},
    { title : '통학차량 운영여부', options: ['운영', '미운영']}
]

function OptionFilter () {

    const checkRef = useRef({})
    const subRef = useRef({})
    const [checkedValue, setCheckedValue] = useState({})

    const getCheckBoxValue = (e, title) => {
        const {value, checked} = e.target
        if(value === '전체'){
            if(checked){
                checkRef.current[title].forEach(el => el.checked = true)
                if(title==='설립 유형'){
                    subRef.current['국공립'].forEach(el => el.checked = true)
                    subRef.current['사립'].forEach(el => el.checked = true)
                }
            }else{
                checkRef.current[title].forEach(el => el.checked = false)
                if(title==='설립 유형'){
                    subRef.current['국공립'].forEach(el => el.checked = false)
                    subRef.current['사립'].forEach(el => el.checked = false)
                }
            }
        }else if(value === '국공립'){
            if(checked){
                subRef.current[value].forEach(el => el.checked = true)
            }else{
                subRef.current[value].forEach(el => el.checked = false)
            }
        }else if(value === '사립'){
            if(checked){
                subRef.current[value].forEach(el => el.checked = true)
            }else{
                subRef.current[value].forEach(el => el.checked = false)
            }
        }else{
            if(!checked){
                checkRef.current[title][0].checked = false
            }
        }
    }
    
    const getSubCheckBoxValue = (e, option) => {
        const {value, checked} = e.target
        
        if(checked){
            setCheckedValue({...checkedValue, [option] : value})
        }else{
            setCheckedValue({...checkedValue, [option] : ''})
        }
    }
    console.log(checkedValue)
    // if(subRef.current[title]){
    //     if(subRef.current[title].includes(e.target)){
    //         subRef.current[title].forEach(el => {
    //             if(el === e.target) el.checked = true
    //         })
    //     }else{
    //         if(subRef.current[title].includes(e.target)){
    //             subRef.current[title].forEach(el => {
    //             if(el === e.target) el.checked = true
    //         })
    //         }
    //     }
    // }

    const [close, setClose] = useState([])
    const toggleLabel = (idx) => {
        if(close.includes(idx)){ // 열기
            setClose(close.filter(innerIdx => innerIdx !== idx))
        }else{ // 닫기
            setClose([...close, idx])
        }
    }

    return(
        <section className="option-filter">
            {optionBox && optionBox.map((data, idx1)=>{
                const { title, options } = data
                return(
                    <div key={`data${idx1}`}>
                        <div className="option-title" onClick={()=>toggleLabel(idx1)}>
                            <p>{title}</p>
                        </div>
                        <div className={classNames(`option-label`, {off : close.includes(idx1)} )}>
                            {options && options.map((option, idx) => {
                                return(
                                    <div className={classNames("label-box", {'main-label' : ['국공립', '사립'].includes(option)})} key={option+idx}>
                                        <CheckBox inputValue={option} innerP={option}
                                        inputRef={(el)=>{
                                            if(el !== null){
                                                if(checkRef.current[title]){
                                                    if(!checkRef.current[title].includes(el)){
                                                        checkRef.current[title] = [...checkRef.current[title], el]
                                                    }
                                                }else{
                                                    checkRef.current[title] = [el]
                                                }
                                            }
                                        }}
                                        handleClick={(e)=>getCheckBoxValue(e, title)}
                                        />
                                        {option === '국공립' && optionBox[0].subOption1.map((ob, idx)=>{
                                            return(<CheckBox key={ob+idx} inputValue={ob} innerP={ob}
                                            inputRef={(el)=>{
                                                if(el !== null){
                                                    if(subRef.current[option]){
                                                        if(!subRef.current[option].includes(el)){
                                                            subRef.current[option] = [...subRef.current[option], el]
                                                        }
                                                    }else{
                                                        subRef.current[option] = [el]
                                                    }
                                                }
                                            }}
                                            addClass={'sub-label'}
                                            handleClick={(e)=>getSubCheckBoxValue(e, option)}
                                            />)
                                        })}
                                        {option === '사립' && optionBox[0].subOption2.map((ob, idx) => {
                                            return(<CheckBox key={ob+idx} inputValue={ob} innerP={ob}
                                            inputRef={(el)=>{
                                                if(el !== null){
                                                    if(subRef.current[option]){
                                                        if(!subRef.current[option].includes(el)){
                                                            subRef.current[option] = [...subRef.current[option], el]
                                                        }
                                                    }else{
                                                        subRef.current[option] = [el]
                                                    }
                                                }
                                            }}
                                            addClass={'sub-label'}
                                            handleClick={(e)=>getSubCheckBoxValue(e, option)}
                                            />)
                                        })} 
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
export default OptionFilter