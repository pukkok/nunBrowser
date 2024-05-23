import classNames from "classnames";
import React, { useRef, useState } from "react";
import './styles/DateModal.css'
function DateModal ({date, isOpen, setSendData, handleClick, modalPosition}) {

    const openModal = () => {
        if(isOpen){
            return {display : 'block'}
        }else{
            return {display : 'none'}
        }
    }

    const inputRef = useRef()

    const addMenu = (e) => {
        e.preventDefault()
        const title = inputRef.current.value
        setSendData({ title , date })
        inputRef.current.value=''
    }

    return(
        <div style={{...openModal(), ...modalPosition}} className="date-modal">
            <p>{date}</p>
            <form>
                <input type="text" placeholder="식단" ref={inputRef}/>
                <button onClick={addMenu}>추가</button>
            </form>
            <button className="close-btn" onClick={handleClick}>닫기</button>
        </div>
    )
}

export default DateModal