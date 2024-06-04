import React, { useEffect, useRef, useState } from "react";
import './styles/PlatformPage.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function PlatformPage ({}) {

    const token = JSON.parse(localStorage.getItem('token'))

    const navigate = useNavigate()
    const createPage = async () => {
        const {data} = await axios.post('platform/newpage',{}, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        console.log(data)
        alert(data.msg)
        if(data.code === 200){
            alert('관리자 페이지로 넘어갑니다.')
            navigate('/admin')
        }
    }

    return(
        <section className={"platform"} >
            <div className="first-login">
                <button onClick={createPage}>홈페이지 생성하기</button>
            </div>
        </section>
    )
}

export default PlatformPage