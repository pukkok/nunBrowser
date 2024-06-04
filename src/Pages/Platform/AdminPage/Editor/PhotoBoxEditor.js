import React from "react";
import ImgBox from '../../../../Components/ImgBox'
import './styles/PhotoBoxType.css'
import './styles/PhotoBoxEditor.css'

function PhotoBoxEditor() {

    const PhotoBox1 = () => {
        return(
            <section className="photo-box-type">
                <div className="type1">
                    <h1>포토 갤러리 <span><img src={`${origin}/platform/0007_btn_more03.png`}/></span></h1>
                    <div className="photo">
                        <ImgBox src={`${origin}/tester/photogalary-tester.png`}/>
                        <div className="text-box">
                            <p>5월 어린이날 행사(예시)</p>
                            <p>2024-05-05</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const PhotoBox2 = () => {
        return(
            <section className="photo-box-type">
                <div className="type2">
                    <h1>포토갤러리</h1>
                    <div className="double-img">
                        <div>
                            <ImgBox src={`${origin}/tester/photogalary-tester.png`}/>
                            <p>5월 어린이날 행사(예시)</p>
                        </div>
                        <div>
                            <ImgBox src={`${origin}/tester/photogalary-tester.png`}/>
                            <p>5월 어린이날 행사(예시)</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }


    return (
        <section className="photobox-edit">
            <div className="photo-box">
                <div className="summary">
                    <h2>포토박스</h2>
                    <p>사진 업로드 및 슬라이드 기능을 제공합니다.</p>
                    <span>*권한을 부여하여 비회원은 사용이 불가능하게 할 수 있습니다.</span>
                </div>
                <div className="remote-btns">
                    <p>타입</p><span></span>
                    <button >저장</button>
                    <button >초기화</button>
                </div>
                <div className="select-type mb">
                    <div className="type-box">
                        <h1>타입1</h1>
                        <PhotoBox1/>    
                    </div>
                    <div className="type-box">
                        <h1>타입2</h1>
                        <PhotoBox2/>
                    </div>
                </div>
                
                
            </div>
        </section>
    )

}
export default PhotoBoxEditor