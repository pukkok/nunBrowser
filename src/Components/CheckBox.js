import React, { useState } from "react";
import './styles/CheckBox.css'

const optionBox = [
    { title : '설립 유형', options : ['전체', '국공립', '사립'] },
    { title : '제공 서비스', options : ['전체', '방과후과정', '특수학급', '일반', '영아전담', '기타보육']},
    { title : '휴·폐원 여부', options : ['휴원 제외', '폐원 제외']},
    { title : '통학차량 운영여부', options: ['운영', '미운영']}
]

function CheckBox () {

    const [valueCheck, setValueCheck] = useState([])

    const [checkedValue, setCheckedValue] = useState({})

    const getCheckBoxValue = (e, title, option) => {
        if(title === '설립 유형'){
            if(checkedValue[title]){
                setCheckedValue({...checkedValue, [title] : [...checkedValue[title], e.target.id]})
            }else{
                setCheckedValue({...checkedValue, [title] : [e.target.id]})
            }
        }
        // if(e.target.checked){
        //     setValueCheck([...valueCheck , {[title] : value, id: e.target.id}])
        // }else{
        //     setValueCheck(()=>{
        //         return valueCheck.filter(innerValue => innerValue[title] !== value)
        //     })
        // }
    }
    console.log(checkedValue)

    // console.log(valueCheck)

    return(
        <div className="Check-box">
            {optionBox && optionBox.map((data, id)=>{
                const { title, options } = data
                return(
                    <div key={`data${id}`}>
                        <p>{title}</p>
                            {options && options.map((option, id)=>{
                                return(
                                    <label key={`option${id}`}>
                                        <input type="checkbox" id={id} onChange={(e)=>getCheckBoxValue(e, title, option)}/>
                                        <div>{option}</div>
                                    </label>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}
export default CheckBox