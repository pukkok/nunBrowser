import classNames from "classnames";
import React, { useEffect, useState } from "react";

function PageBtn ({ allLength, dividedValue, setFunc }) {
    const page = Math.ceil(allLength / dividedValue)
    let pageBtns = new Array(page).fill(0)

    const [active, setActive] = useState(1)

    const counter = (e) => {
        if(e.target.value==='first'){
            setActive(1)
        }else if(e.target.value==='prev'){
            if(active>1){
                setActive(active-1)
            }
        }else if(e.target.value==='next'){
            if(active<page){
                setActive(+active+1)
            }
        }else if(e.target.value==='final'){
            setActive(page)
        }else{
            setActive(+e.target.value)
        }
    }

    const [viewCnt, setViewCnt] = useState(5)

    useEffect(()=>{
        let page = Math.ceil(active / 5)
        setViewCnt(page*5)
        
        setFunc(active)
    },[active, setFunc])

    return(
        <>
        <button onClick={counter} value={'first'}>맨앞</button>
        <button onClick={counter} value={'prev'}>prev</button>
            {pageBtns.map((_, idx)=>{
                return <button key={idx} value={idx+1} onClick={counter} 
                className={classNames('page-btn', {active : idx+1 === +active}, { on : (viewCnt-5 <= idx ) && idx < viewCnt })}>{idx+1}</button>
            })}
            {page>5 && <span>...</span>}
        <button onClick={counter} value={'next'}>next</button>
        <button onClick={counter} value={'final'}>맨뒤</button>
        </>
    )
}

export default PageBtn