import React, { useEffect, useRef, useState } from "react";
import './styles/AllergyTable.css'
import classNames from "classnames";

const allergies = ['난류', '우유','메밀', '땅콩', '대두', '밀', '고등어', '게', '새우', '돼지고기', '복숭아', '토마토', `아황산포함식품(대부분의 가공식품에 포함되어 따로 표기하지 않음)`, '호두', '닭고기', '소고기', '오징어', '조개류(굴, 전복, 홍합 포함)', '잣', '견과류(아몬드)']

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

    // 드래그 이벤트(알레르기 위치 바꾸기)
    const dragItem = useRef() // 드래그 하는 아이템
    const dragOverItem = useRef() // 드래그 놓는 아이템 
    const [itemA, setItemA] = useState(null)
    const [itemB, setItemB] = useState(null)
    const dragStartHandler = (idx) => { // 잡는 아이템의 인덱스
        dragItem.current = idx
        setItemA(idx)
    }

    const dragEnterHandler = (idx) => { // 놓는 아이템의 인덱스
        dragOverItem.current = idx
        if(itemA) setItemB(idx)
    }

    const drop = () => { // 아이템 떨구기
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
        setItemA(null)
        setItemB(null)

    }

    // 버튼 이벤트(알레르기 위치 바꾸기)
    const changeIndex = (direction , idx) => {
        const copyListItems = [...list]
        const selectItem = copyListItems[idx]
        
        if(direction === 'up'){
            if(idx>0){ // idx === 0 : 첫번째 아이템 선택
                setItemA(idx)
                setItemB(idx-1)
                const changeItem = copyListItems[idx-1]
                copyListItems.splice(idx, 1, changeItem)
                copyListItems.splice(idx-1, 1, selectItem)
                setList(copyListItems)
            }
        }else{
            if(idx<copyListItems.length-1){ // idx === listLength-1 : 마지막 아이템 선택
                setItemA(idx)
                setItemB(idx+1)
                const changeItem = copyListItems[idx+1]
                copyListItems.splice(idx, 1, changeItem)
                copyListItems.splice(idx+1, 1, selectItem)
                setList(copyListItems)
            }
        }

        setTimeout(() => {
            setItemA(null)
            setItemB(null)
        }, 500);

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
    const [pos, setPos] = useState({ left: window.clientX, top: window.clientY }); // 실제 drag할 요소가 위치하는 포지션값
    
    const remoteDrag = (e) => {
        e.stopPropagation()
        setPos({left : e.clientX, top : e.clientY})
    }

    const remoteEnd = (e) => {
        let left = e.clientX
        let top = e.clientY

        const maxX = window.innerWidth - containerRef.current.offsetWidth
        const maxY = window.innerHeight - containerRef.current.offsetHeight

        if(left<0){
            left = 0
        }
        if(top<0){
            top = 0
        }
        if(left>maxX){
            left = maxX
        }
        if(top>maxY){
            top = maxY
        }

        setPos({left, top})
    }

    return(
        <>
            <div className="allergy-table">
                <div className="allergy-list">
                    <h2>알레르기 표</h2>
                    <div className="btn-box">
                        <button onClick={onDraggable}>{isDrag ? '완료' : <span></span>}</button>
                        <button onClick={openAddForm}>{isOpenForm ? '완료' : '알레르기 추가'}</button>
                    </div>
                </div>
                {list.map((allergy, idx)=> {
                    return (
                        <div key={idx} className={classNames("allergy-item", {active : idx===itemA}, {active: idx===itemB})}
                        onDragStart={()=>dragStartHandler(idx)}
                        onDragEnter={()=>dragEnterHandler(idx)}
                        onDragOver={e => e.preventDefault()}
                        onDragEnd={drop}
                        draggable={isDrag}>
                            {allergy.includes('(') ?
                            <p>{idx+1} - {allergy.split('(')[0]}<br/>
                            <span>{'('+allergy.split('(')[1]}</span></p>
                            :<p>{idx+1} - {allergy}</p>
                            }
                            <div className={classNames('meterial-icons', {on : isDrag})}>
                                <span className="material-symbols-outlined" onClick={()=>changeIndex('up', idx)}>arrow_drop_up</span>
                                <span className="material-symbols-outlined" onClick={()=>changeIndex('down', idx)}>arrow_drop_down</span>
                            </div>
                            {!allergies.includes(allergy) && <button className={classNames('delete-btn', {on : isDrag})} onClick={()=>deleteList(allergy)}>삭제</button>}
                        </div>
                    )
                })}
            </div>
            
            <form className={`remote-allergy ${isOpenForm && 'on'}`} style={{left:pos.left, top:pos.top}} ref={containerRef}>
                <p ref={dragComponentRef}
                draggable
                onDrag={(e)=>remoteDrag(e)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={(e)=>remoteEnd(e)}
                ></p>
                <div className="input-box">
                    <input ref={inputRef} placeholder="알레르기 입력"/>
                    <button onClick={addInputValue}>등록</button>
                </div>
            </form>
        </>
    )
}

export default AllergyTable