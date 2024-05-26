import React, { useEffect, useRef, useState } from "react";
import DateModal from "./DateModal";
import Calendar from "../../Custom/Calendar";

function MenuTable () {
    
    const [menu, setMenu] = useState([]) // [{title:'' date: ''}]
    const [sendData, setSendData] = useState({})

    const [openModal, setOpenModal] = useState(false)
    const [modalPosition, setModalPosition] = useState({left:800, top:200})

    const [selectDateInfo, setSelectDateInfoInfo] = useState({})

    useEffect(()=>{
        if(Object.values(sendData).length>0){
            const reverseMenu = [...menu, sendData]
            setMenu(reverseMenu)
        }
    },[sendData])

    const deleteYOIL = ['토', '일']
    const sideOptions = ['오늘의 한상', 'kcal/단백질(g)', '간식']

    const openDay = (info) => {
        const date = info.day.format('YYYY-MM-DD')
        const idx = info.idx
        setSelectDateInfoInfo({date, idx})
        setOpenModal(true) // 모달창 열기
    }

    return(
        <div>
            <Calendar wantDeleteYOIL={deleteYOIL} menuInfo={menu}
             sideOptions={sideOptions} dayClick={openDay} 
             />
             
            <DateModal dateInfo={selectDateInfo} isOpen={openModal}
             handleClick={()=>setOpenModal(false)} setSendData={setSendData}
             modalPosition={modalPosition}
             />
        </div>
    )
}

export default MenuTable