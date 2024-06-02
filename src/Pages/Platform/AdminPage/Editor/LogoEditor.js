import React, { useRef } from "react";
import axios from "axios";
import ImgBox from "../../../../Components/ImgBox";

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
        <>
            <div>
                <div>
                    <h2>로고란 ?</h2> 
                    <h4>일반적으로 기업이나 제품 혹은 서비스 등의 이름을 특징이 드러나도록 디자인하여, <br/>
                    상표처럼 사용할 수 있도록 제작되어진 글자들의 조합입니다.    
                    </h4> 
                    *해당 홈페이지의 사용처는 메인페이지(홈 또는 맨 처음 페이지)로 돌아가는 기능입니다.
                </div>
                <div>
                    <button onClick={()=>logoRef.current.click()}>로고 업로드</button>
                </div>
                <div className="">
                    실제 화면에 보이는 크기
                    <div>
                        <ImgBox addClass={'logo-box'} src={logo}/>
                    </div>
                </div>

                {/* 로고 추가 */}
                <input hidden type="file" onChange={getLogo} ref={logoRef}/>
            </div>
        </>
    )
}

export default LogoEditor