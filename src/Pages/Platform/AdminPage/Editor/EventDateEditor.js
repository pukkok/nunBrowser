import React from "react";
import './styles/EventDateBoxType.css'

function EventDateEditor () {

    const EventDateBox1 = () => {
        return(
            <section className="ed-box-type">
                <div className="type1">
                    <h1>행사 일정 <span><img src={`${origin}/platform/0007_btn_more03.png`}/></span></h1>
                    <div className="cal">
                        <div className="head">
                            <p>이전</p>
                            <p className="date">2024.06</p>
                            <p>다음</p>
                        </div>
                        <div className="event">
                            <p><span>3</span>Event1</p>
                            <p><span>4</span>Event2</p>
                            <p><span>8</span>Event3</p>
                            <p><span>16</span>Event4</p>
                            <p><span>16</span>Event6</p>
                            <p><span>16</span>Event8</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    const EventDateBox2 = () => {
        return(
            <section className="ed-box-type small">
                <div className="type2">
                    <div className="title">
                        <h1>월간 일정표</h1>
                        <img src={`${origin}/platform/sch_bg.png`}/>
                    </div>
                    <div className="event">
                        <p><span>06/08</span>Event1</p>
                        <p><span>06/13</span>Event2</p>
                        <p><span>06/15</span>Event3</p>
                        <p><span>06/16</span>Event4</p>
                        <p><span>06/16</span>Event6</p>
                        <p><span>06/16</span>Event8</p>
                    </div>
                </div>
            </section>
        )
    }

    return(
        <section className="eventdate-edit">
            <div className="summary">
                <h2>행사 일정</h2>
                <p>달력 형식으로 일정을 추가하는 컨텐츠 입니다.</p>
                <span>*행사 일정 탭에서 일정을 추가 할 수있습니다.</span>
            </div>
            <div className="select-type mb">
                <div className="type-box">
                    <h1>타입1</h1>
                    <EventDateBox1/>
                </div>
                <div className="type-box">
                    <h1>타입2</h1>
                    <EventDateBox2/>
                </div>
            </div>
        </section>
    )
}

export default EventDateEditor