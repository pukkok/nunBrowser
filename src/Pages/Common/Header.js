import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/Header.css'

function Header () {

    const [isLogin, setIsLogin] = useState(false)

    const userName = JSON.parse(localStorage.getItem('user'))

    const openLogin = (e) => {
        e.preventDefault()
        window.open(
            e.target.href,
            '_blank',
            `width=550 height=500
            top=100 left=150`
        )
    }

    useEffect(()=>{
        userName && setIsLogin(true)
    },[userName])

    const logout = () => {
        alert('로그아웃 되었습니다.')
        localStorage.clear()
        setIsLogin(false)
    }

    return(
            <header className="header">
                <nav>
                    <ul>
                        <li><Link>유치원 모으미란</Link>
                            <ul>
                                <li><Link to={'/service'}>서비스 안내</Link></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </li>
                        <li><Link to={'/search'}>유치원 검색</Link></li>
                        <li><Link to={'/kinder'}>유치원 홈페이지</Link></li>
                    </ul>
                    {!isLogin ? 
                    <ul className="user-nav">
                        <li><Link to={'/login'} onClick={openLogin}>로그인</Link></li>
                        <li><Link to={'/join'}>회원가입</Link></li>
                    </ul>:
                    <ul className="user-nav">
                        <li>{userName && userName}</li>
                        <li onClick={logout}>{isLogin && '로그아웃'}</li>
                    </ul>
                    }
                </nav>
            </header>
    )
}

export default Header