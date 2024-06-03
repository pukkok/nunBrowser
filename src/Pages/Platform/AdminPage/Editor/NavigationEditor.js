import React, { useEffect, useState } from "react";
import './styles/NavigationEditor.css'

function NavigationEditor () {

    // 메인메뉴 옵션(상위)
    const [mainMenu, setMainMenu] = useState([ //0:{id:1} 1:{id:2}
        {num : 0, mainName: '', mainPath: ''}
    ])
    
    const addMainMenu = () => {
        setMainMenu([...mainMenu, {
            num: mainMenu[mainMenu.length-1].num+1,
            mainName: '',
            mainPath: ''
        }])
    }
    useEffect(()=>{
        console.log(mainMenu)
    },[mainMenu])

    const deleteMainMenu = (e, idx) => {
        if(mainMenu.length===1){
            return
        }

        const filteredMain = mainMenu.filter((check, i) =>{
            return check.num !== idx
        })
        
        const newMain = filteredMain.map((list, i) => {
            if(idx < list.num){
                list.num = list.num-1
            }
            return list
        })
        setMainMenu([...newMain])

    }

    // 서브메뉴 옵션(하위)
    const [subMenu, setSubMenu] = useState({})
    const addSubMenu = (e, idx) => {
        if(subMenu[idx]){
            setSubMenu({...subMenu, [idx] : [...subMenu[idx], 1]})
        }else{
            setSubMenu({...subMenu, [idx] : [1]})
        }
    }
    const deleteSubMenu = (e, idx) => {
        if(!subMenu[idx]){
            return
        }

        const deleteLastMenu = subMenu[idx].filter((_, check) => {
            return check !== subMenu[idx].length - 1
        })
        setSubMenu({...subMenu, [idx] : [...deleteLastMenu]})
    }

    const inputValue = (e, idx) => {
        const {name, value} = e.target
        const mappingMenu = mainMenu.map((check, i)=>{
            if(check.num === idx){
                return {...check, [name]: value}
            }
            return check
        })

        setMainMenu(mappingMenu)
    }

    // console.log(mainMenu)
    
    return(
        <section className="navi-edit">
            <div className="summary">
                <h2>네비게이션 바</h2>
                <p>현재 사용자가 어떤 위치에 있는지 확인할 수 있으며, 다른 메뉴로 이동을 돕는 기능을 말합니다.</p>
                <span>*홈페이지간 페이지를 이동할 수 있는 있는 버튼의 모임입니다.</span>
            </div>
            <div className="summary">
                <h2>경로(URL)</h2>
                <p>현재 사용자의 위치에 대한 이름입니다.</p>
                <span>http://www.kindermoumi.com / [경로] </span>
            </div>
            <div className="remote-btns">
                <p>메뉴</p><span></span>
                <button onClick={addMainMenu}>추가</button>
                <button >저장</button>
                <button onClick={()=>setMainMenu([1])}>초기화</button>
                <p>업로드</p><span></span>
                <button>저장</button>
                <button>초기화</button>
            </div>
            <div className="input-box">
                {mainMenu.map((_, idx1)=>{
                    return(
                        <div className="main-menu" key={idx1}>
                            <div className="main-btns">
                                <h4>상위 메뉴 {idx1+1}</h4>
                                <button onClick={(e)=>deleteMainMenu(e, idx1)}>삭제</button>
                            </div>
                            <label>
                                <p>메뉴명</p><input placeholder="상위 메뉴명" name="mainName" onChange={(e)=>inputValue(e, idx1)} value={mainMenu[idx1].mainName}/>
                            </label>
                            <label>
                                <p>경로 지정</p><input placeholder='"/" 없이 작성해주세요' name="mainPath" onChange={(e)=>inputValue(e, idx1)} value={mainMenu[idx1].mainPath}/>
                            </label>
                            <div className="sub-btns">
                                <h4>하위 메뉴</h4>
                                <button onClick={(e)=>addSubMenu(e, idx1)}>추가</button>
                                <button onClick={(e)=>deleteSubMenu(e, idx1)}>삭제</button>
                            </div>
                            {subMenu && subMenu[idx1] && subMenu[idx1].map((check, idx)=>{
                                return(
                                    <div className="sub-menu" key={idx}>
                                        {idx===0 && <span>하위 메뉴의 경로는 <br/> "주소 / [상위 경로] / [하위 경로]" 입니다.</span>}
                                        <label>
                                            <p>메뉴명</p> <input placeholder="하위 메뉴명"/>
                                        </label>
                                        <label>
                                            <p>경로 지정</p> <input placeholder='"/" 없이 작성해주세요'/>
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })} 
            </div>
            <div className="remote-btns">
                <p>공통 옵션</p><span></span>
                <button >저장</button>
                <button onClick={()=>setMainMenu([1])}>초기화</button>
            </div>
            <div className="input-box">
                <div className="main-menu">
                    <label>
                        <p>상위 폰트 크기</p><input/>
                    </label>
                    <label>
                        <p>마우스 호버시 색상</p><input />
                    </label>
                    <label>
                        <p>하위 폰트 크기</p><input/>
                    </label>
                </div>
            </div>
        </section>
    )
}

export default NavigationEditor