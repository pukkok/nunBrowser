import React, { useEffect, useRef, useState } from "react";
import Calendar from "../../Components/Calendar";
import DateModal from "./DateModal";

function MenuTable () {
    
    const [Menu, setMenu] = useState([]) // [{title:'' date: ''}]
    const [sendData, setSendData] = useState({})

    const [openModal, setOpenModal] = useState(false)
    const [modalPosition, setModalPosition] = useState({left:0, top:0})

    const [selectDate, setSelectDate] = useState()

    const handleDateClick = (e) => {
        setSelectDate(e.dateStr)
        // console.log(e.jsEvent)
        const boxWidth = e.jsEvent.srcElement.offsetWidth
        const boxHeight = e.jsEvent.srcElement.parentElement.offsetHeight
        const {offsetX, pageX, screenY} = e.jsEvent
        
        const left = pageX - offsetX + boxWidth
        const top = screenY - boxHeight
        setModalPosition({left, top})
        setOpenModal(true)
    }

    const handleEventClick = (e) => { // 이벤트 바꿀때 쓰기
        console.log('이벤트 클릭')
        console.log(e)
    }

    const myCustomButton = { myCustomButton :  {
        text: 'custom!',
        click: function() {
          alert('clicked the custom button!');
        }
    }}

    // customButtons: {
    //     myCustomButton: {
    //       text: 'custom!',
    //       click: function() {
    //         alert('clicked the custom button!');
    //       }
    //     }
    // },
    // headerToolbar: {
    //     left: 'prev,next today myCustomButton',
    //     center: 'title',
    //     right: 'dayGridMonth,timeGridWeek,timeGridDay'
    // }

    

    

    useEffect(()=>{
        if(Object.values(sendData).length>0){
            // const reverseMenu = [...Menu, sendData].reverse()
            const reverseMenu = [...Menu, sendData]
            setMenu(reverseMenu)
        }
    },[sendData])

    return(
        <div>
            <Calendar handleDateClick={handleDateClick} work={Menu}
             handleEventClick={handleEventClick} myCustomButton={myCustomButton}/>
            <DateModal date={selectDate} isOpen={openModal}
             handleClick={()=>setOpenModal(false)} setSendData={setSendData}
             modalPosition={modalPosition}
             />
        </div>
    )
}

export default MenuTable