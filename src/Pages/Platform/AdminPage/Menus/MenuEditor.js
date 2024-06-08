import React from "react";

function MenuEditor () {


    return(
        <section className="menu-edit">
            <div className="summary">
                <h2>식단표 등록</h2>
                <p>레이아웃을 구성하는 시스템으로 화면의 전체를 사용하지 않고, 여백을 주어 홈페이지 디자인에 질서와 규칙을 부여하여
                    알아보기 쉬운 방식으로 구성하는 뼈대, 프레임워크 역할을 합니다.
                </p>
                <span>*식단표 입력하기.</span><br/>
            </div>
            <div className="summary">
                <h2>사이드 메뉴 추가하기</h2>
                <p>레이아웃을 구성하는 시스템으로 화면의 전체를 사용하지 않고, 여백을 주어 홈페이지 디자인에 질서와 규칙을 부여하여
                    알아보기 쉬운 방식으로 구성하는 뼈대, 프레임워크 역할을 합니다.
                </p>
                <span>*식단표 입력하기.</span><br/>
            </div>
            <div className="remote-btns">
                <p>설정</p><span></span>
                <button >적용</button>
                <button >저장</button>
                <button >초기화</button>
            </div>
            <div>
                제외 할 요일
                <input type="checkbox"/>월
                <input type="checkbox"/>화
            </div>
        </section>
    )
}

export default MenuEditor