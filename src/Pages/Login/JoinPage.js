import React, { useEffect, useState } from "react";
import LabelBox from "../../Components/LabelBox";
import axios from "axios";
import './styles/JoinPage.css'
import Agreement from "./Agreement";

const step1Arr = [
    { id: 'key', type: 'text', name : 'key'},
    { id: 'password', type: 'password', name : 'password'}
]

const arr1 = [
    { id: 'step2-email' , type: 'text', name : 'email', kr: '이메일'},
    { id: 'step2-phone' , type: 'text', name : 'phone', kr: '연락처'},
    { id: 'step2-userId' , type: 'text', name : 'id', kr: '아이디'},
    { id: 'r-pw' , type: 'password', name : 'password', kr: '패스워드'},
    { id: 'r-cpw' , type: 'password', name : 'confirmPassword', kr: '패스워드 확인'},
]

const BASE_URL = 'http://localhost:5000'

function JoinPage () {
    const [step1Input, setStep1Input] = useState({})
    const step1InputExtractor = (e) => { // 1단계 처리하기 (인증처리)
        let {name, value} = e.target
        setStep1Input({...step1Input, [name] : value})
    }

    const [ step2Input, setStep2Input ] = useState({})
    const [certificateData, setCertificateData] = useState({})
    const [step, setStep] = useState(0)
    
    // 인증서 확인
    const certificate = async (e, step1) => { 
        const {key, password} = step1
        e.preventDefault()
        const { data } = await axios.post(`${BASE_URL}/teacher/join/step1`, {
            key, password
        })
        if(data.code === 200){
            alert(data.msg)
            setCertificateData(data.data)
            setStep(2)
        }else{
            alert(data.msg)
        }
    }

    // 인증 후 회원가입
    const join = async (e, step2) => {
        e.preventDefault()
        const {name, isDirector, organization, organizationCode} = certificateData
        const {email, phone, id: userId, password, confirmPassword} = step2
        const { data } = await axios.post(`${BASE_URL}/teacher/join/step2`, {
            name, isDirector, organization, organizationCode,
            email, phone, userId, password, confirmPassword
        })
        if(data.code === 200){
            alert(data.msg)
            setStep(3)
        }else{
            alert(data.msg)
        }
    }

    useEffect(()=>{
        if(step === 3){
            setCertificateData({})
        }
    },[step])

    const valueExtractor = (e) => {
        let {name, value} = e.target
        setStep2Input({...step2Input, [name] : value})
    }

    return(
        <div id="Join">
            {/* <h1>회원 가입</h1>
            <nav>
                <ul>
                    <li>교직원</li>
                    <li>학부모</li>
                </ul>
            </nav> */}
            <Agreement/>
            {step===1 && 
            <>
                <LabelBox handleChange={step1InputExtractor} 
                handleClick={(e)=>certificate(e, step1Input)}
                addClass={'step-1-form'} arr={step1Arr}>
                    완료
                </LabelBox>
            </>}
            {step===2 &&
            <>
                {Object.values(certificateData).length>0 &&
                    <div>
                        <p>이름 : {certificateData.name}</p>
                        <p>소속 : {certificateData.organization}</p>
                        <p>원장 : {certificateData.isDirector ? 'O': 'X'}</p>
                    </div>
                }
                <LabelBox handleClick={(e)=>join(e, step2Input)} handleChange={valueExtractor}
                addClass={'step-2-form'} arr={arr1} >완료</LabelBox>
            </>
            }
            {step===3 &&
            <>
                <p>회원가입 완료</p>
            </>
            }
        </div>

    )
}

export default JoinPage