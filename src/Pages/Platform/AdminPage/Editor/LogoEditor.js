import React, { useRef } from "react";
import axios from "axios";
import ImgBox from "../../../../Components/ImgBox";
import './styles/LogoEditor.css'

function LogoEditor ({logo, setLogo}) {

    //로고 부분
    const uploadLogo = async () => {
        //content-type: multipart/form-data 로전송
        let kinderCode = 'a02'
        const fd = new FormData() // multer 사용시 폼데이터형식으로 보내줘야함
        
        fd.append('logoImg', logoRef.current.files[0]) // 파일 ('필드명',파일)
        fd.append('kinderCode',kinderCode)
        
        const {data} = await axios({
            method:'post',
            url:'platform/upload/logo',
            data: fd,
        })
        alert(data.msg)
    }

    const logoRef= useRef()
    const getLogo = (e) => {
        setLogo(URL.createObjectURL(e.target.files[0]))
    }

    return(
        <section className="logo-edit">
            <div className="summary">
                <h2>로고란 ?</h2> 
                <p>일반적으로 기업이나 제품 혹은 서비스 등의 이름을 특징이 드러나도록 디자인하여,
                상표처럼 사용할 수 있도록 제작되어진 글자들의 조합입니다.    
                </p> 
                <span>*해당 홈페이지의 사용처는 메인페이지(홈 또는 첫 페이지)로 돌아가는 기능입니다.</span>
            </div>
            <div className="upload">
                <button onClick={()=>logoRef.current.click()}>로고 업로드</button>
                <p>실제 화면 크기</p>
                <ImgBox addClass={'logo-box'} src={logo}/>
                현재 너비:
                현재 높이:
                <div>
                    너비 수정 <input />
                    높이 수정 <input />
                </div>
            </div>

            {/* 로고 추가 */}
            <input hidden type="file" onChange={getLogo} ref={logoRef}/>
        </section>
    )
}

export default LogoEditor