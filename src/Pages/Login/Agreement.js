import React from "react";
import ImgBox from '../../Components/ImgBox'
import './styles/Agreement.css'

function Agreement () {

    return(
        <section className="agreement">
            <h1>회원가입</h1>
            <div>
            <ImgBox/>
            </div>
            <div>
                <h3>약관동의</h3>
                <h3>회원가입시 개인정보 수집 및 이용에 대한 동의 및 서비스이용약관에 동의하셔야 회원가입이 가능합니다.
개인정보 수집 및 이용에 대한 동의및 서비스이용약관을 꼼꼼히 읽어보신 후 회원가입을 진행해주시기 바랍니다.
학교홈페이지의 통합회원으로 가입하시면 학교에서 제공하는 다양한서비스를 이용하실 수 있습니다.</h3>
            </div>
            <div>
         
                    <input/>
                    통합로그인 서비스 이용에 필요한 필수 항목에 모두 동의합니다.
           
            </div>
            <div>
            개인정보 수집 및 이용에 대한에 동의 (필수)
            <div>
                
            </div>
            </div>

        </section>
    )

}

export default Agreement