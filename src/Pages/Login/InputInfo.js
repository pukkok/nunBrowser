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
        
        option === 'phoneOption' ? phoneRef.current['head'] = e.target.innerText : emailRef.current[''] = ''

    }
    const selectAddrress = () => {
        // activeOption
    }

    const inputRefs = useRef({})
    const phoneRef = useRef({})
    const emailRef = useRef({})

    useEffect(()=>{
        console.log(phoneRef.current)
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
    
    async function duplicateCheck () {
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
                                    <input type="text" ref={el => inputRefs.current['userId'] = el}/>
                                    <button onClick={duplicateCheck}>중복 확인</button>
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
                                    <ul className={classNames("table-list", {on : openList.phoneOption})} onClick={(e)=>selectOption(e, 'phoneOption')}>
                                    {phoneOptions.map((option, idx)=>{
                                        return <li key={option+idx} className={classNames({active : activeOption.phoneOption===option})}>{option}</li>
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
                                    <ul className={classNames("table-list", {on : openList.emailOption})} onClick={(e)=>selectOption(e, 'emailOption')}>
                                        {emailOptions.map((option, idx)=>{
                                            return <li key={option+idx} className={classNames({active: activeOption.emailOption===option})}>{option}</li>
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