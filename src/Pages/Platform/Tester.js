import React from "react";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
const weekdays = ['일', '월', '화', '수', '목', '금', '토']

function Tester () {
    const today = dayjs().locale('ko') // 오늘('ko')
    const YM = today.format('YYYY년 M월')
    const month = today.format('M') // 몇월?
    const monthLength = today.daysInMonth() // 총 몇일?
    const firstWeekday = today.set('date', 1).format('dd') // 월의 처음 시작하는 요일 구하기
    const plusZero = weekdays.indexOf(firstWeekday) // 시작하는 요일 전까지의 길이
    
    const flatArr = Array(plusZero+monthLength).fill(0).fill(1, plusZero, plusZero+monthLength)

    let monthArr = []
    let weekArr = []
    flatArr.forEach((num, idx)=>{
        let pushNum = 0
        num === 0 ? pushNum = 0 : pushNum = idx-plusZero+1

        weekArr.push(pushNum)

        if((idx+1)%7===0){
            monthArr.push(weekArr)
            weekArr = []
        }else if(idx === flatArr.length-1){ // 마지막 나머지 푸시
            monthArr.push(weekArr)
        }
    })

    return(
        <div>
            <h3>{YM}</h3>
            <table>
                <thead>
                    <tr>
                        {weekdays.map((day, idx)=>{
                            return <th key={idx}>{day}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {monthArr.map((weekArr, id)=>{
                        return(
                            <tr key={id}>{weekArr.map((day, id)=>{
                                return <td key={id}>{day}</td>
                            })}</tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Tester