import React from "react";
import SearchModal from "../Search/SearchModal";
import { Link } from "react-router-dom";

function MainPage () {
    
    const openLogin = (e) => {
        e.preventDefault()
        window.open(
            e.target.href,
            '_blank',
            `width=550 height=500
            top=100 left=150`
        )
    }

    return(
        <>
            <ul>
                <li><Link to={'/login'} onClick={openLogin}>로그인하기</Link></li>
                <li><Link to={'/join'}>회원가입하기</Link></li>
            </ul>

            <SearchModal/>
            
        </>
    )
}

export default MainPage