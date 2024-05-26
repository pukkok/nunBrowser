import React, {useState} from "react";
import './styles/LoginPage.css'

function LoginPage () {

    const BASE_URL = 'http://localhost:4002'

    const [input, setInput] = useState({})

    const login = async (userId, password) => {
        const userJSON = await fetch(`${BASE_URL}/api/users/login`, {
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
               userId, password
            })
        })
        const user = await userJSON.json()
       return user
    }

    const valueExtractor = (e) => {
        let {name, value} = e.target
        setInput({...input, [name] : value })
    }

    const starter = async (e) => {
        e.preventDefault()
        const { id, password } = input
        
        let success = await login(id, password)
        if(success.code === 200){
            localStorage.setItem('token', JSON.stringify(success.token))
            localStorage.setItem('admin', JSON.stringify(success.isAdmin))
            localStorage.setItem('user', JSON.stringify(success.userId))
            alert('로그인 되었습니다.')
            window.close() // 본인 닫기
            window.opener.location.reload() // 열었던 창 리로드
        }else{
            alert(success.msg)
        }
    }




    return(
        <div className="login-box">
            <header>
                <h1>LOGIN</h1>
                <p>로그인 이후 플랫폼 이용이 가능합니다.</p>
            </header>
            <form method="post">
                <div>
                    <input type="text" placeholder="아이디"/>
                    <input type="password" placeholder="비밀번호"/>
                </div>
                <button type="submit">로그인 →</button>
            </form>
            <div className="small-box">
                <div>
                    <h2>통합 회원이 아니신가요?</h2>
                    <h3> 회원가입을 하시면 하나의 계정으로 <br/> 다양한 서비스를 이용하실수 있습니다.</h3>
                    <button>회원가입 →</button>
                </div>
                <div>
                    <h2>아이디/비밀번호를 잊으셨나요?</h2>
                    <h3>회원님의 개인정보 또는 IPIN으로 <br/> 아이디/비밀번호를 찾을 수 있습니다.</h3>
                    <button>아이디/비밀번호 찾기 →</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage