import React, { useState } from "react";
import LabelBox from "../../Components/LabelBox";

const arr1 = [
    { id: 'r-name' , type: 'text', name : 'name'},
    { id: 'r-email' , type: 'text', name : 'email'},
    { id: 'r-id' , type: 'text', name : 'id'},
    { id: 'r-pw' , type: 'password', name : 'password'},
    { id: 'r-cpw' , type: 'password', name : 'confirmPassword'},
]

const BASE_URL = 'http://localhost:5000'

function JoinPage () {
    const [ input, setInput ] = useState({})


    const register = async (name, email, userId, password, confirmPassword) => {
        const userJSON = await fetch(`${BASE_URL}/tester/join`, {
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
                name, email, userId, password, confirmPassword
            })
        })
        const user = await userJSON.json()
        return user
    }

    const valueExtractor = (e) => {
        let {name, value} = e.target
        setInput({...input, [name] : value})
    }

    const starter = async (e) => {
        e.preventDefault()
        const { name, email, id, password, confirmPassword } = input
        let result = await register(name, email, id, password, confirmPassword)
        if(result.code === 200){
            alert('회원가입 완료')
            window.close()
        }else{
            if(result.err){
                let errMsgs = result.err.map(error => {
                    const { msg, path } = error
                    return `${path} : ${msg}` 
                })
                alert(
                    result.msg + '\n' +
                    errMsgs.join(' \n')
                )
            }else{
                alert(result.msg)
            }
        }
    }

    return(
        <div id="Join">
            <h1>회원 가입</h1>
            <LabelBox handleClick={starter} handleChange={valueExtractor}
            addClass={'register-form'} arr={arr1} >완료</LabelBox>
        </div>
    )
}

export default JoinPage