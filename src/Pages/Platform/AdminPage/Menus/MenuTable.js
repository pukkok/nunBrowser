import React, { useEffect, useRef, useState } from "react";
import DateModal from "./DateModal";
import Calendar from "../../../../Custom/Calendar";

function MenuTable ({deleteYOIL, sideOptions, allergyList}) {
    
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

    const openDay = (info) => {
        const date = info.day.format('YYYY-MM-DD')
        const idx = info.idx
        setSelectDateInfoInfo({date, idx})
        setOpenModal(true) // 모달창 열기
    }

    return(
        <section className="menu-table">
            <Calendar wantDeleteYOIL={deleteYOIL} menuInfo={menu}
             sideOptions={sideOptions} dayClick={openDay} 
             footerTitle={'알레르기 정보'} footerList={allergyList}
             />
             
            <DateModal dateInfo={selectDateInfo} isOpen={openModal}
             handleClick={()=>setOpenModal(false)} setSendData={setSendData}
             modalPosition={modalPosition}
             />
        </section>
    )
}

export default MenuTable