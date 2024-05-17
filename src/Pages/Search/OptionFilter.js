import React, { useRef, useState } from "react";
import './styles/OptionFilter.css'
import CheckBox from "../../Components/CheckBox";
import classNames from "classnames";

const optionBox = [
    { title : '설립 유형', options : ['전체', '국공립', '사립'] },
    { title : '제공 서비스', options : ['전체', '방과후과정', '특수학급', '일반', '영아전담', '기타보육']},
    { title : '휴·폐원 여부', options : ['휴원 제외', '폐원 제외']},
    { title : '통학차량 운영여부', options: ['운영', '미운영']}
]

function OptionFilter () {

    const checkRef = useRef({})

    const [checkedValue, setCheckedValue] = useState({})

    const getCheckBoxValue = (e, title) => {
        if(e.target.value === '전체'){
            if(e.target.checked){
                checkRef.current[title].forEach(el => el.checked = true)
            }else{
                checkRef.current[title].forEach(el => el.checked = false)
            }
        }else{
            if(!e.target.checked){
                checkRef.current[title][0].checked = false
            }
        }
    }

    const [close, setClose] = useState([])
    const toggleLabel = (idx) => {
        if(close.includes(idx)){
            setClose(close.filter(innerIdx => innerIdx !== idx))
        }else{
            setClose([...close, idx])
        }
    }

    return(
        <section id="OptionFilter">
            {optionBox && optionBox.map((data, idx1)=>{
                const { title, options } = data
                return(
                    <div key={`data${idx1}`} className="">
                        <div className="option-title" onClick={()=>toggleLabel(idx1)}>
                            <p>{title}</p>
                        </div>
                        <div className={classNames(`option-label`,  {off : close.includes(idx1)} )}>
                            {options && options.map((option, idx)=>{
                                return(
                                    <CheckBox key={option+idx} inputValue={option} innerP={option}
                                    inputRef={(el)=>{
                                        if(checkRef.current[title]){
                                            checkRef.current[title] = [...checkRef.current[title], el]
                                        }else{
                                            checkRef.current[title] = [el]
                                        }
                                    }}
                                    handleClick={(e)=>getCheckBoxValue(e, title)}
                                    />
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