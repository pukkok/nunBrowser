import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import './styles/JoinPage.css'
import LabelBox from "../../Components/LabelBox";
import ImgBox from '../../Components/ImgBox'
import Container from '../../Components/Container'

import axios from "axios";
import classNames from "classnames";

import Agreement from "./Agreement";
import SelectJoinType from "./SelectJoinType";
import Certificate from "./Certificate";
import InputInfo from "./InputInfo";


const arr1 = [
    { id: 'step2-email' , type: 'text', name : 'email', kr: '이메일'},
    { id: 'step2-phone' , type: 'text', name : 'phone', kr: '연락처'},
    { id: 'step2-userId' , type: 'text', name : 'id', kr: '아이디'},
    { id: 'r-pw' , type: 'password', name : 'password', kr: '패스워드'},
    { id: 'r-cpw' , type: 'password', name : 'confirmPassword', kr: '패스워드 확인'},
]

const BASE_URL = 'http://localhost:5000'

const agreeSteps = ['약관동의', '회원구분', '본인확인', '정보입력', '가입완료']
function JoinPage () {

    const [step2Input, setStep2Input] = useState({})
    const [step, setStep] = useState(0)

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

    const valueExtractor = (e) => {
        let {name, value} = e.target
        setStep2Input({...step2Input, [name] : value})
    }

    const [agreeCheck, setAgreeCheck] = useState([]) // 스텝0 : 동의
    const navigate = useNavigate()

    const [joinType, setJoinType] = useState('') // 스텝1 : 타입선택
    useEffect(()=>{
        if(joinType){
            setStep(step+1)
        }
    },[joinType])

    const [certificateData, setCertificateData] = useState({}) // 스텝2 : 인증 완료
    useEffect(()=>{
        if(Object.values(certificateData).length>0){
            setStep(step+1)
        }
    },[certificateData])

    const moveStep = (e) => {
        const key = e.target.innerText
        if(key === '이전'){
            setStep(step-1)  
        }else if(key === '다음'){ // 스텝 0 => 1
            if(agreeCheck.length === 2){
                setStep(step+1)
                setAgreeCheck([])
            }else{
                alert('모두 동의해야 가입이 가능합니다.')
            }
        }else if(key === '회원가입'){ // 취소 (메인으로 돌아가기)
            alert('회원가입하러가기')
        }else{
            navigate('/')
        }
    }

    useEffect(()=>{
        if(step === 1){ // 이전버튼으로 되돌아 왔을 경우
            setJoinType('') // 선택 초기화
        }
    },[step])

    return(
        <div id="Join" className="join">
            <h1>회원가입</h1>
            <Container width={1240}>
            <div className="join-wrap">
                <div className="step-box">
                    {agreeSteps.map((order,idx)=>{
                        return (
                            <Fragment key={idx}>
                                <div className="step">
                                    <ImgBox addClass={classNames('img-box', {active : step===idx})} src={`./agreement/img_joinStep${idx+1}.png`}/>
                                    <p>STEP 0{idx+1}</p>
                                    <strong>{order}</strong>
                                </div>
                                {idx !== agreeSteps.length -1 && <div className="arrow"></div>}
                            </Fragment>
                        )
                    })}
                </div>
                {step === 0 && <Agreement setFunc={setAgreeCheck}/> }
                {step === 1 && <SelectJoinType setFunc={setJoinType}/> }
                {step === 2 && <Certificate type={joinType} setFunc={setCertificateData}/> }
                {step === 3 && <InputInfo info={certificateData} type={joinType}/> }
                <div className="btn-box">
                    <button className={classNames({active : step!==0 })} onClick={moveStep}>{step===0 ? '취소' : step===3 ? '회원가입' : '이전'}</button>
                    <button className={classNames({active : step===0 })} onClick={moveStep}>{step===0 ? '다음' : step===3 ? '이전' :'취소'}</button>
                </div>
            </div>
            </Container>
            {step===6 &&
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
            
        </div>

    )
}

export default JoinPage