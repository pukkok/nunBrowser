import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/Header.css'
import Container from "../../Components/Container";

function Header () {

    const [isLogin, setIsLogin] = useState(false)

    const navigate = useNavigate()

    const userName = JSON.parse(localStorage.getItem('user'))

    const openLogin = (e) => {
        e.preventDefault()
        window.open(
            e.target.href,
            '_blank',
            `width=580 height=550
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
            <Container>
                <nav>
                    <div>
                        <button onClick={()=>{navigate('/')}}> 홈 버튼 </button>
                    </div>
                    <ul className="depth1">
                        <li><Link to={'service/info'}>유치원 모으미란</Link>
                            <ul className="depth2">
                                <li><Link to={'/service/info'}>서비스 안내</Link></li>
                                <li><Link to={'/service/introduce'}>공시항목 소개</Link></li>
                                <li><Link>홍보자료</Link></li>
                            </ul>
                        </li>
                        <li><Link to={'search'}>유치원 검색</Link></li>
                        <li><Link>공지사항</Link></li>
                        <li><Link>커뮤니티</Link></li>
                        <li><Link>교사채용</Link>
                            <ul className="depth2">
                                <li><Link>면접경험</Link></li>
                                <li><Link>필기경험</Link></li>
                                <li><Link>상담코너</Link></li>
                                <li><Link>교사채용</Link></li>
                                <li><Link>채용준비</Link></li>
                            </ul>
                        </li>
                        <li><Link to={'kinder'}>유치원 홈페이지</Link></li>
                    </ul>
                    {!isLogin ? 
                    <ul className="user-nav">
                        <li><Link to={'user/login'} onClick={openLogin}>로그인</Link></li>
                        <li><Link to={'user/join'}>회원가입</Link></li>
                    </ul>:
                    <ul className="user-nav">
                        <li>{userName && userName}</li>
                        <li onClick={logout}>{isLogin && '로그아웃'}</li>
                    </ul>
                    }
                </nav>
            </Container>
        </header>
    )
}

export default Header