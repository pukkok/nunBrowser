import React, { useState, useEffect } from "react";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import './styles/Header.css'
import Container from "../../Components/Container";
import axios from "axios";

function Header ({userName, admin, token, kinderUrl}) {
    const [isLogin, setIsLogin] = useState(false)

    const navigate = useNavigate()

    const findKinderCode = async () => {
        if(!isLogin) alert('로그인 후 이용 가능합니다.')
    }

    const createPage = async () => {
        const {data} = await axios.post('platform/newpage',{}, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        alert(data.msg)
        if(data.code === 200){
            alert('관리자 페이지로 넘어갑니다.')
            navigate('/admin')
        }
    }


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
                    <button className="logo" onClick={()=>{navigate('/')}}> <img src={`${origin}/main/logo.png`}/> </button>
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
                        <li><Link to={isLogin ? `/kinder/${kinderUrl}` : '/'} onClick={findKinderCode}>내 유치원</Link></li>
                        {isLogin && admin && <li><Link to={'/admin'}>관리자 페이지</Link>
                            <ul className="depth2">
                                <li><Link onClick={createPage}>페이지 생성</Link></li>
                                <li><Link to={'/admin'}>페이지 관리</Link></li>
                                <li><Link to={'/admin'}>원아 관리</Link></li>
                                <li><Link to={'/admin'}>식단 관리</Link></li>

                            </ul>
                        </li>}
                    </ul>
                    {!isLogin ? 
                    <ul className="user-nav">
                        <li><Link to={'user/login'} onClick={openLogin}>로그인</Link></li>
                        <li><Link to={'user/join'}>회원가입</Link></li>
                    </ul>:
                    <ul className="user-nav">
                        <li>{userName && userName}{admin && '(관리자)'}</li>
                        <li onClick={logout}>{isLogin && '로그아웃'}</li>
                    </ul>
                    }
                </nav>
            </Container>
        </header>
    )
}

export default Header