import React from "react";
import './styles/EventDateBoxType.css'
import dayjs from 'dayjs'

const EventDateBox1 = ({ eventContents=[] }) => {
    const now = dayjs().locale('ko')
    const YM = now.format('YYYY-MM')
    
    const prevMonth = () => {

    }

    const nextMonth = () => {

    }


    return(
        <section className="ed-box-type">
            <div className="type1">
                <h1>행사 일정 <span><img src={`${origin}/platform/0007_btn_more03.png`}/></span></h1>
                <div className="cal">
                    <div className="head">
                        <p onClick={prevMonth}>이전</p>
                        <p className="date">{YM}</p>
                        <p onClick={nextMonth}>다음</p>
                    </div>
                    <div className="event">
                        {eventContents.length>0 && eventContents.map((item, idx) => {
                            return <p key={idx}><span>{item.span}</span>{item.p}</p>
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

const EventDateBox2 = ({ eventContents=[] }) => {
    return(
        <section className="ed-box-type small">
            <div className="type2">
                <div className="title">
                    <h1>월간 일정표</h1>
                    <img src={`${origin}/platform/sch_bg.png`}/>
                </div>
                <div className="event">
                    {eventContents.length>0 && eventContents.map((item, idx)=>{
                        return <p key={idx}><span>{item.span}</span>{item.p}</p>
                    })}
                </div>
            </div>
        </section>
    )
}

export { EventDateBox1, EventDateBox2 }