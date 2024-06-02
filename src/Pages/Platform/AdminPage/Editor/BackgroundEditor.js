import React, {useRef, useState} from "react";
import ImgBox from "../../../../Components/ImgBox";
import './styles/BackgroundEditor.css'

function BackgroundEditor ({ setBg }) {
    
        const sampleBgs = [
            'sample-bg1.png','sample-bg2.jpg','sample-bg3.png',
            'sample-bg4.png','sample-bg5.png',
        ]

        const bgRef =useRef()
        const [addBgs, setAddBgs] = useState([]) // 새로 추가된 배경
        
        const getBg = (e) => {
            setAddBgs([...addBgs, e.target.files[0]])
            setBg(URL.createObjectURL(e.target.files[0]))
        }

        const bgSelector = (src) => {
            setBg(src)
        }
        
        return(
            <div className="bg-editor">
                <div className="sample-box">
                    {sampleBgs.map((bg, idx)=>{
                        let src = `${origin}/platform/${bg}`
                        return <ImgBox handleClick={()=>bgSelector(src)} addClass={'sample'} key={idx} src={src}></ImgBox>
                    })}
                    {addBgs.length>0 && addBgs.map((bg, idx)=>{
                        let src = URL.createObjectURL(bg)
                        return <ImgBox key={idx} handleClick={()=>bgSelector(src)} addClass={'sample'} src={src}/>
                    })}
                </div>
                <div className="btn-box">
                    <button onClick={()=>bgRef.current.click()}>추가</button>
                    <button>저장</button>
                    <button onClick={()=>setAddBgs([])}>초기화</button>
                </div>
                {/* 배경 추가 옵션 열기 */}
                <input hidden type="file" onChange={getBg} ref={bgRef}/>
            </div>
        )
    
}

export default BackgroundEditor