import React from "react";
import ImgBox from '../../Components/ImgBox'
import './styles/Agreement.css'
import agreementData from "../../Datas/agreementData";
import Container from '../../Components/Container'

function Agreement () {
    const {agreePersonInfo, agreeToTermsOfUse} = agreementData

    const agreeOrders = ['약관동의', '회원구분', '본인확인', '정보입력', '가입완료']

    return(
        <section className="agreement">
            <h1>회원가입</h1>
            <Container>
            <div className="join-wrap">
                <div className="order-box">
                    {agreeOrders.map((order,idx)=>{
                        return (
                            <div key={idx} className="step-box">
                                <div className="step">
                                    <ImgBox src={`./agreement/img_joinStep${idx+1}.png`}/>
                                    <p>STEP 0{idx+1}</p>
                                    <strong>{order}</strong>
                                </div>
                                {idx !== agreeOrders.length -1 && <div className="arrow"></div>}
                            </div>
                        )
                    })}
                </div>
                <div className="text-box">
                    <h2>약관동의</h2>
                    <h4>회원가입시 개인정보 수집 및 이용에 대한 동의 및 서비스이용약관에 동의하셔야 회원가입이 가능합니다.<br/>
                    개인정보 수집 및 이용에 대한 동의및 서비스이용약관을 꼼꼼히 읽어보신 후 회원가입을 진행해주시기 바랍니다.<br/>
                    학교홈페이지의 통합회원으로 가입하시면 학교에서 제공하는 다양한서비스를 이용하실 수 있습니다.</h4>
                </div>
                <div className="agree-all">
                    <label>
                        <input type="checkbox"/>
                        통합로그인 서비스 이용에 필요한 필수 항목에 모두 동의합니다.
                    </label>
                </div>
                <div className="agree-input">
                    <label>
                        <input type="checkbox"/>
                        개인정보 수집 및 이용에 대한에 동의 <span>(필수)</span>
                    </label>
                </div>
                <div className="agree-box">
                {agreePersonInfo && 
                    <>
                        <h2>{agreePersonInfo.headline}</h2>
                        {agreePersonInfo.option.map((data, id) => {
                        return(
                            <div key={id}>
                                <h3>{data.title && data.title}</h3>
                                <h4>{data.subtitle && data.subtitle}</h4>
                                <h5>{data.description && data.description}</h5>
                            </div>
                            )
                        })}
                    </>}
                </div>
                <div className="agree-input">
                    <label>
                        <input type="checkbox"/>
                        서비스 이용약관에 동의 <span>(필수)</span>
                    </label>
                </div>
                <div className="agree-box">
                    {agreeToTermsOfUse && 
                    <>
                        <h2>{agreeToTermsOfUse.headline}</h2>
                        {agreeToTermsOfUse.option.map((data, id)=>{
                            return(
                                <div key={id}>
                                    <h3>{data.title && data.title}</h3>
                                    <h4>{data.subtitle && data.subtitle}</h4>
                                    <h5>{data.description && data.description}</h5>
                                </div>
                            )
                        })}
                    </>}
                </div>
            </div>
            </Container>
        </section>
    )

}

export default Agreement