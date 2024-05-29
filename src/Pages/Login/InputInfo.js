import React, { useEffect, useRef, useState } from "react";
import './styles/InputInfo.css'
import classNames from "classnames";
import axios from "axios";

const BASE_URL = 'http://localhost:5000'
function InputInfo ({type, info}) {

    const phoneOptions = ['선택', '010', '011', '016', '017', '018', '019']
    const emailOptions = ['선택', 'naver.com', 'nate.com', 'gmail.com', 'daum.net']
    
    const [activeOption, setActiveOption] = useState({ phoneOption: '선택', emailOption: '선택'})
    const [openList, setOpenList] = useState({ phoneOption : false, emailOption : false})

    const selectOption = (e, option) => { // ul list 열기
        setOpenList({...openList, [option] : !openList[option]})
        setActiveOption({...activeOption, [option] : e.target.innerText})    
    }
    
    const [selectNum, setSelectNum] = useState({ phoneOption: 0, emailOption : 0})
    const selectPhoneRef = useRef([])
    const selectEmailRef = useRef([])
    const selectOptionKeyBoard = (e, option) => {
        if(e.code === 'ArrowDown'){
            if(!openList[option]){
                setOpenList({...openList, [option] : true})
                if(!selectNum[option]){
                    setSelectNum({...selectNum, [option] : 0})
                }
            }else{
                if(selectNum[option] < e.target.children.length-1){
                    setSelectNum({...selectNum, [option] : selectNum[option]+1})
                }else{
                    setSelectNum({...selectNum, [option] : 0})
                }
            }
        }
        
        if(e.code === 'ArrowUp'){
            if(openList[option]){
                if(selectNum[option] < 1){
                    setSelectNum({...selectNum, [option] : e.target.children.length-1})
                }else{
                    setSelectNum({...selectNum, [option] : selectNum[option]-1})
                }
            }
        }
        
        if(e.code === 'Enter'){
            if(openList[option]){
                setOpenList({...openList, [option] : false})
            }
        }
    }

    useEffect(()=>{

        setActiveOption({
            ...activeOption, 
            phoneOption : selectPhoneRef.current[selectNum['phoneOption']].innerText,
            emailOption : selectEmailRef.current[selectNum['emailOption']].innerText
        })
        
    },[selectNum])


    const selectAddrress = (e) => {
        console.log(e)
        activeOption['emailOption'] = e.target.value
    }

    const inputRefs = useRef({})
    const phoneRef = useRef({})
    const emailRef = useRef({})

    useEffect(()=>{
        // console.log(phoneRef.current)
    })

    const inputInfo = () => {
        if(info){
            const keys = Object.keys(info)
            keys.forEach((key)=>{
                if(inputRefs.current[key]){
                    inputRefs.current[key].value = info[key]
                }
            })
        }
    }

    useEffect(()=>{
        inputInfo()
    },[info])
    
    // id 중복확인
    async function duplicateCheck (e) {
        e.preventDefault()
        const userId = inputRefs.current['userId'].value
        let url = ''
        if(type === '교직원') url = `${BASE_URL}/teacher/join/id-check`
        const { data } = await axios.post(url, {
            userId
        })

        if(data) alert(data.msg)
        
    }


    return(
        <section className="input-info">
            <div className="text-box dashed">
                <h2>회원정보 작성</h2>
                <h4>가입하신 정보는 회원님의 동의없이 공개되지 않으며, 개인정보보호정책에 의해 보호를 받습니다.</h4>
            </div>
            <div className="join-table">
                <table>
                    <colgroup>
                        <col style={{width : '15%'}}></col>
                        <col style={{width : '37.5%'}}></col>
                        <col style={{width : '15%'}}></col>
                        <col style={{width : '27.5%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span className="essential">*</span>소속기관</th>
                            <td colSpan={3}>
                                <div>
                                    <input ref={el=> inputRefs.current['organization'] = el} placeholder={'유치원 명'} onChange={inputInfo}/>
                                    <p>{info.isDirector ? '(원장)' : ''}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th><span className="essential">*</span>이름</th>
                            <td colSpan={3}>
                                <div>
                                    <input ref={el=> inputRefs.current['name'] = el}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th><span className="essential">*</span>아이디</th>
                            <td colSpan={3}>
                                <div>
                                    <form>
                                        <input type="text" ref={el => inputRefs.current['userId'] = el}/>
                                        <button onClick={duplicateCheck} tabIndex={-1}>중복 확인</button>
                                    </form>
                                    <span>아이디는 영문, 숫자, 특수문자의 조합으로 입력해주세요.</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th><span className="essential">*</span>비밀번호</th>
                            <td>
                                <div>
                                    <input type="password" ref={el => inputRefs.current['password'] = el}/>
                                    <span>비밀번호는 문자,숫자,특수문자의 조합으로 9~16자리로 입력해주세요.</span>
                                </div>
                            </td>
                            <th><span className="essential">*</span>비밀번호 확인</th>
                            <td>
                                <div>
                                    <input type="password" ref={el => inputRefs.current['confirmPassword'] = el}/>
                                    <span>비밀번호와 동일하게 입력해주세요.</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>휴대폰 번호</th>
                            <td colSpan={3}>
                                <div>
                                    <ul className={classNames("table-list", {on : openList.phoneOption})} tabIndex={0} onClick={(e)=>selectOption(e, 'phoneOption')} onKeyDown={(e)=>selectOptionKeyBoard(e, 'phoneOption')}>
                                    {phoneOptions.map((option, idx)=>{
                                        return <li key={option+idx} 
                                        ref={el => !selectPhoneRef.current.includes(el) && el !==null && selectPhoneRef.current.push(el) } 
                                        className={classNames({active : activeOption.phoneOption===option})}>{option}</li>
                                    })}
                                    </ul>
                                    <p>-</p>
                                    <input ref={el=> phoneRef.current['body'] = el}/>
                                    <p>-</p>
                                    <input ref={el=> phoneRef.current['tail'] = el}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td colSpan={3}>
                                <div>
                                    <input ref={el => emailRef.current['email'] = el}/>
                                    <p>@</p>
                                    <input onChange={selectAddrress} ref={el => emailRef.current['addrress'] = el}/>
                                    <ul className={classNames("table-list", {on : openList.emailOption})} tabIndex={0} onClick={(e)=>selectOption(e, 'emailOption')} onKeyDown={(e)=>selectOptionKeyBoard(e, 'emailOption')}>
                                        {emailOptions.map((option, idx)=>{
                                            return <li key={option+idx} 
                                            ref={el => !selectEmailRef.current.includes(el) && el !==null && selectEmailRef.current.push(el) }
                                            className={classNames({active: activeOption.emailOption===option})}>{option}</li>
                                        })}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {type === '학부모' && 
                <>
                    <div className="description">
                        <h2>사이트 부가정보</h2>
                        <p>회원가입시 필요한 부가정보입니다.<br/>
                        해당 학교에 재학중인 자녀가 있으신 경우에만 자녀 검색 후 추가해주시기 바랍니다.</p>
                    </div>
                    <div className="join-table">
                        <table>
                            <colgroup>
                                <col style={{width : '15%'}}></col>
                                <col style={{width : '37.5%'}}></col>
                                <col style={{width : '15%'}}></col>
                                <col style={{width : '27.5%'}}></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span className="essential">*</span>자녀명</th>
                                    <td colSpan={3}>
                                        <div>
                                            <input placeholder="예시) 김XX"/>
                                            <button>자녀 검색</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>}
            </div>
        </section>
    )
}

export default InputInfo