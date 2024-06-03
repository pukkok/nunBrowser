import React from "react";
import './styles/ContainerEditor.css'

function ContainerEditor () {

    return(
        <section className="container-edit">
            <div className="summary">
                <h2>컨테이너(그리드)</h2>
                <p>레이아웃을 구성하는 시스템으로 화면의 전체를 사용하지 않고, 여백을 주어 홈페이지 디자인에 질서와 규칙을 부여하여
                    알아보기 쉬운 방식으로 구성하는 뼈대, 프레임워크 역할을 합니다.
                </p>
                <span>*최대(max) : 컨테이너가 최대로 늘어나는 크기입니다.</span><br/>
                <span>*크기(width) : 컨테이너의 크기를 고정시킵니다.</span><br/>
                <span>*최소(min) : 컨테이너가 최대로 늘어나는 크기입니다.</span>
            </div>
            <div className="remote-btns">
                <p>설정</p><span></span>
                <button>저장</button>
                <button>초기화</button>
            </div>
            <div className="container-box">
                <div className="switch-box summary">
                    <p>컨테이너 크기 지정(기본 1240px)</p>
                    <span>설정이 없는경우 기본값으로 등록됩니다.</span>
                    <label>
                        최대 : <input placeholder="기본값" />
                    </label>
                    <label>
                        크기 : <input placeholder="기본값"/>
                    </label>
                    <label>
                        최소 : <input placeholder="기본값"/>
                    </label>
                </div>
                <div className="summary">
                    <p>단위 변경하기(현재 단위 : )</p>
                    <span>px : 화면에 고정된 크기를 나타내며 상황에 따라 변경되지 않습니다.</span><br/>
                    <span>% : 화면의 비율에 따라 크기가 변경됩니다.</span>
                    <div className="unit-btns">
                        <button>px로 바꾸기</button>
                        <button>%로 바꾸기</button>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default ContainerEditor