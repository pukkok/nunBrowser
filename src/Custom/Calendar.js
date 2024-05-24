import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import classNames from 'classnames'
import 'dayjs/locale/ko'
import './styles/Calendar.css'
const weekdays = ['일', '월', '화', '수', '목', '금', '토']

/** (어떤 요일을 지우고싶나요?) wantDeleteYOIL : ['요일', '요일', ...] 
 * 
*/
function Calendar ({wantDeleteYOIL, borderColor='gray', sideOptions, dayClick, menuInfo={title:'',date:'', idx:0}, merge}) {
    const today = dayjs()
    const todayD = today.date() // 오늘 몇일?
    const todayYM = today.format('YYYY년 M월')
    
    const defaultDay = dayjs().locale('ko')// 초기('ko')
    const [standardDay, setDay] = useState(defaultDay)
    const YM = standardDay.format('YYYY년 M월')
    const month = standardDay.format('M') // 몇월?
    const monthLength = standardDay.daysInMonth() // 총 몇일?
    const firstWeekday = standardDay.set('date', 1).format('dd') // 월의 처음 시작하는 요일 구하기
    const plusZero = weekdays.indexOf(firstWeekday) // 시작하는 요일 전까지의 길이
    
    const flatArr = Array(plusZero+monthLength).fill(0) // 요일 시작일 맞추기
    .fill(1, plusZero, plusZero + monthLength)

    let monthArr = []
    let weekArr = [] 
    flatArr.forEach((num, idx)=>{ // 2중 배열로 만들기 월 = [['주'],['주'],...]
        let pushNum = 0
        num === 0 ? pushNum = 0 : pushNum = idx-plusZero+1
        weekArr.push(pushNum)

        if((idx+1)%7===0){ // 일주일 별로 나눔
            monthArr.push(weekArr)
            weekArr = []
        }else if(idx === flatArr.length-1){ // 마지막 나머지 푸시
            const blankLength = 7 - (idx%7+1)
            const lastZero = Array(blankLength).fill(0)
            monthArr.push([...weekArr, ...lastZero])
        }
    })

    const yoilFilter = (...deleteYOIL) => { // 보고 싶지 않은 요일은 지워서 만들어줌
        if(deleteYOIL.length===0){ // 필터 필요없다
            return {yoils : weekdays, nalzzas : monthArr}
        }
        const yoils = weekdays.filter(weekday=>{ // 필요없는 요일 거르기
            return !deleteYOIL.includes(weekday)
        })

        const deleteIdxArr = deleteYOIL.map(yoil=>{ // 요일 인덱스 찾기
            return weekdays.indexOf(yoil)
        })

        const deleteNalzzas = monthArr.map((weekArr)=>{ // 인덱스와 일치하는 날짜 제거
            return weekArr.filter((_,idx)=>{
                return !deleteIdxArr.includes(idx)
            })
        })
        
        const nalzzas = deleteNalzzas.filter(week=> { // zero로만 구성된 주가 있는가?
            const isZero = week.reduce((acc, r) => acc + r, 0)
            return isZero
        })
        return {yoils, nalzzas}
    }
    const result = yoilFilter(...wantDeleteYOIL)

    const moveMonth = (move) => {
        if(move==='prev'){
            const prevMonth = standardDay.set('M', month-2)
            setDay(prevMonth)
        }else{
            const nextMonth = standardDay.set('M', +month)
            setDay(nextMonth)
        }
    }
    const mainRef = useRef()

    const styles = {
        calendar: {
            padding : '10px',
            border : '1px solid blue'
        },
        grid : {
            display: 'grid',
            gridTemplateColumns: `repeat(${result.yoils.length}, 1fr)`,
        },
        header: {
            minHeight: '50px',
            justifyContent: 'center',
            alignItems: 'center'
        },
        sideOption: {
            display: 'grid',
            height: '100%',
            border: '1px solid grey',
            borderRight: 'none',
            marginTop: 'auto'
        },

        mainBorder: {
            border: `1px solid ${borderColor}`
        },
        bottomLineBorder: {
            borderBottom: `1px solid ${borderColor}`
        },
        lastWeekBorder: {
            borderBottom: 'none'
        },
        dayBorder: {
            borderRight: `1px solid ${borderColor}`
        },
        lastDayBorder: {
            borderRight: 'none'
        },
        
        today: {
            backgroundColor : 'violet'
        }
    }
    
    const optionRef = useRef([])
    const dayClickHandler = (e, info) => {
        if(info===0) return
        
        const dayInfo = standardDay.set('D',info)
        const optionIndex = e.target.className.split('option-')[1]
        
        if(dayClick){
            dayClick({day : dayInfo, idx : optionIndex})
        }
    }

    const [optCount, setOptCount] = useState(0)
    
    useEffect(()=>{
        if(sideOptions){
            setOptCount(sideOptions.length)
        }
    })
    
    console.log(menuInfo)

    return(
        <section className="Calendar">
            <div>
                {result &&
                <div className="table" style={styles.calendar}>
                    <div className="title">
                        <button className="prev-btn" onClick={()=>moveMonth('prev')}>← 이전 달</button>
                        <h3>{YM}</h3>
                        <button className="next-btn" onClick={()=>moveMonth('next')}>다음 달 →</button>
                    </div>
                    <div className="side-option" style={styles.sideOption}>
                        {sideOptions && Array(result.nalzzas.length).fill(0).map((_, idx1)=>{
                            return (
                                <div className="option-box" key={idx1}>
                                    {sideOptions.map((option, idx2)=> {
                                        return <p key={idx2} className="option">{option}</p>
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <header style={{...styles.header, ... styles.grid}}> 
                        {result.yoils.map((day, idx)=>{ // 일 ~ 토 표시
                            return <div key={idx}>{day}</div>
                        })}
                    </header>
                    <main style={styles.mainBorder} ref={mainRef}>
                        {result.nalzzas.map((weekArr, idx)=>{
                            return(
                                <div key={idx} className="week" 
                                style={
                                    idx!==result.nalzzas.length-1 ? // 마지막 border-bottom
                                    {...styles.bottomLineBorder, ...styles.grid} : 
                                    {...styles.lastWeekBorder, ...styles.grid}}>

                                    {weekArr.map((day, idx)=>{
                                    return <div className={classNames("day", { blank : !day })} key={idx}
                                    style={
                                        todayYM===YM && day===todayD ? styles.today : // 오늘인가?
                                        (idx+1)%weekArr.length===0 ? // 마지막 border-right
                                        styles.lastDayBorder : styles.dayBorder}>

                                        <p className="nalzza" style={styles.bottomLineBorder}>{day===0 ? '' : day}</p>

                                        {day !==0 && 
                                        <div className="menu" onClick={(e)=>dayClickHandler(e, day)}>
                                            {optCount!==0 ? Array(optCount).fill(0).map((_, keyIdx)=>{
                                                
                                                return <div key={keyIdx} className={`option option-${keyIdx+1}`}>

                                                    {menuInfo.map((info, index)=>{
                                                    return (info.date === standardDay.set('D', day).format('YYYY-MM-DD') &&
                                                    <p key={index}>{+info.idx === keyIdx+1 && info.title}</p>)
                                                    })}

                                                </div>
                                            }):

                                            menuInfo.map((info, idx)=>{
                                            return info.date === standardDay.set('D', day).format('YYYY-MM-DD') && 
                                            <p key={idx}>{info.title}</p>
                                            })}
                                        </div>}
                                    </div>
                                })}
                                </div>
                            )
                        })}
                    </main>
                    <footer></footer>
                    
                    
                </div>}
                <div></div>
            </div>
        </section>
        
    )
}
export default Calendar


