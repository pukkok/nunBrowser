import React, { useRef, useState } from "react";
import './styles/AllergyTable.css'

const allergies = ['난류', '우유','메밀', '땅콩', '대두', '밀', '고등어', '게', '새우', '돼지고기', '복숭아', '토마토', '아황산포함식품(대부분의 가공식품에 포함되어 따로 표기하지 않음)', '호두', '닭고기', '소고기', '오징어', '조개류(굴, 전복, 홍합 포함)', '잣', '견과류(아몬드)']

function AllergyTable () {

    const [list, setList] = useState([...allergies])

    const addInputValue = (e) => {
        e.preventDefault()

        if(list.includes(inputRef.current.value)){
            alert('이미 등록한 정보입니다.')
        }else{
            setList([...list, inputRef.current.value])
            inputRef.current.value = ''
        }
    }

    const inputRef = useRef()
    // 알레르기 삭제하기
    const deleteList = (allergy) => {
        alert('삭제 완료')
        setList(list.filter((value)=>{
            return value !== allergy
        }))
    }

    const dragItem = useRef() // 드래그 하는 아이템
    const dragOverItem = useRef() // 드래그 놓는 아이템 

    const dragStartHandler = (idx) => {
        dragItem.current = idx
    }

    const dragEnterHandler = (idx) => {
        dragOverItem.current = idx
    }

    const drop = () => {
        const copyListItems = [...list]
        const dragItemContent = copyListItems[dragItem.current]
        const changeItemContent = copyListItems[dragOverItem.current]

        // 각각의 위치 바꾸기
        copyListItems.splice(dragItem.current, 1, changeItemContent)
        copyListItems.splice(dragOverItem.current, 1, dragItemContent)

        // current 초기화
        dragItem.current = null
        dragOverItem.current = null
        setList(copyListItems)
    }

    const [isDrag, setIsDrag] = useState(false)
    const onDraggable = () => {
        setIsDrag(!isDrag)
    }

    const [isOpenForm, setIsOpenForm] = useState(false)
    const openAddForm = () => {
        setIsOpenForm(!isOpenForm)
    }

    const containerRef = useRef(null); // 드래그 할 영역 네모 박스 Ref
    const dragComponentRef = useRef(null); // // 움직일 드래그 박스 Ref
    const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
    const [pos, setPos] = useState({ left: 500, top: 500 }); // 실제 drag할 요소가 위치하는 포지션값
    
    const remoteStart = (e) => {
        const x = containerRef.current.offsetLeft
        const y = containerRef.current.offsetTop
        setOriginPos({x, y})
    }

    const remoteEnd = (e) => {
        console.log(containerRef.current.offsetWidth)
        console.log('x', e.clientX, 'y', e.clientY)
        console.log(window.innerWidth, window.innerHeight)
        if(containerRef.current.offsetWidth){}
        setPos({left: e.clientX, top: e.clientY})
    }

    return(
        <>
            <div className="allergy-table">
                <div className="allergy-option">
                    <h2>알레르기 표</h2>
                    <div className="btn-box">
                        <button onClick={onDraggable}>{isDrag ? '완료' : '수정'}</button>
                        <button onClick={openAddForm}>{isOpenForm ? '완료' : '알레르기 추가'}</button>
                    </div>
                </div>
                {list.map((allergy, idx)=> {
                    return (
                        <div key={idx} className="allergy"
                        onDragStart={()=>dragStartHandler(idx)}
                        onDragEnter={()=>dragEnterHandler(idx)}
                        onDragOver={e => e.preventDefault()}
                        onDragEnd={drop}
                        draggable={isDrag}
                        >
                            <p>{idx+1} - {allergy}</p>
                            {!allergies.includes(allergy) && <button className={isDrag&&'on'} onClick={()=>deleteList(allergy)}>삭제</button>}
                        </div>
                    )
                })}
            </div>
            
            <form className={`add-allergy ${isOpenForm && 'on'}`} style={{left:pos.left, top:pos.top}} ref={containerRef}>
                <p ref={dragComponentRef}
                draggable
                onDragStart={()=>remoteStart()}
                onDragOver={e => e.preventDefault()}
                onDragEnd={(e)=>remoteEnd(e)}
                >● 옮기기</p>
                <div className="input-box">
                    <input ref={inputRef} placeholder="알레르기 입력"/>
                    <button onClick={addInputValue}>등록</button>
                </div>
            </form>
        </>
    )
}

export default AllergyTable