import React, { useEffect, useState } from "react";
import PhotoBoxEditor from "./PhotoBoxEditor";
import TodayMenusEditor from "./TodayMenusEditor";
import NoticeEditor from "./NoticeEditor";
import EventDateEditor from "./EventDateEditor";
import './styles/ContentsEditor.css'

function ContentEditor ({xyCount, setXyCount}) {

    const [imsi, setImsi] = useState({})

    const xyCounter = (e, xy) => {
        setXyCount({...xyCount, [xy] : e.target.value})
    }

    const [count, setCount] = useState(0)

    useEffect(()=>{
        let {row, col} = xyCount
        if(row==='' && col===''){
            return setCount(0)
        }
        if(row){
            if(col){
               return setCount(row * col)
            }else{
                return setCount(row * 1)
            }
        }

        if(col){
            if(row){
                setCount(row * col)
            }else{
                setCount(col * 1)
            }
        }
    })

    return(
        <section className="content-edit">
            <>
            <div className="summary">
                <h2>컨텐츠</h2>
                <p>메인페이지에서 보여줄수 있는 컨텐츠를 설정해 보세요.</p>
                <span>*구역을 나눠서 컨텐츠를 지정할수 있습니다.</span>
            </div>
            <div className="summary">
                <h2>구역선택</h2>
                <p>구역에 넣을 컨텐츠를 선택해 보세요</p>
                <span>*구역 나누기 후 사용 가능합니다.</span>
            </div>
            <div className="remote-btns">
                <p>구역</p><span></span>
                <button >저장</button>
                <button >초기화</button>
            </div>
            <div className="row-col-selector mb">
                <div className="row-col">
                    <p>개수</p>
                    <label>
                        행 개수: <input onChange={(e)=>xyCounter(e, 'row')}/>
                    </label>
                    <label>
                        열 개수: <input onChange={(e)=>xyCounter(e, 'col')}/>
                    </label>
                </div>
                <div>
                <p>구역 선택</p>
                    <select>
                        {count ? Array(count).fill(0).map((_,idx)=>{
                            return <option key={idx} value={'구역'+idx+1}>구역{idx+1}</option>
                        }) : <option>없음</option>}
                    </select>
                </div>
            </div>
            
            <div>
                
            </div>
                <EventDateEditor/>
                <TodayMenusEditor/>
                <PhotoBoxEditor/>
                <NoticeEditor/>
            </>
        </section>
    )
}

export default ContentEditor