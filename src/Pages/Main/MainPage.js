import React from "react";
import './styles/MainPage.css'
import ImgBox from "../../Components/ImgBox";
import Container from "../../Components/Container";
import { Link } from "react-router-dom";

function MainPage () {

    return(
        <section className="Main">
            <div className="main-bg">
                <div className="content">
                    <p>컨텐트를 담을 곳입니다.</p>
                </div>
                <div className="bg1 bg-item">
                    <div className="list">
                        <ImgBox addClass={'img4 img-box'} src={`${origin}/main/visual-bg4.png`}/>
                        <ImgBox addClass={'img5 img-box'} src={`${origin}/main/visual-bg5.png`}/>
                        <ImgBox addClass={'img6 img-box'} src={`${origin}/main/visual-bg6.png`}/>
                        <ImgBox addClass={'img7 img-box'} src={`${origin}/main/visual-bg7.png`}/>
                        <ImgBox addClass={'img8 img-box'} src={`${origin}/main/visual-bg8.png`}/>
                        <ImgBox addClass={'img9 img-box'} src={`${origin}/main/visual-bg9.png`}/>
                    </div>
                </div>
                <div className="bg2 bg-item">
                    <div className="list">
                        <ImgBox addClass={'img2 img-box'} src={`${origin}/main/visual-bg2.png`}/>
                        <ImgBox addClass={'img3 img-box'} src={`${origin}/main/visual-bg3.png`}/>
                        <ImgBox addClass={'img11 img-box'} src={`${origin}/main/visual-bg11.png`}/>
                        <ImgBox addClass={'img12 img-box'} src={`${origin}/main/visual-bg11.png`}/>
                    </div>
                </div>
            </div>
            <Container>
                <div className="content-go">
                    <div className="main-go">
                        <ImgBox src={`${origin}/main/main-1.jpg`} />
                        <div className="text-box">
                            <h2>우리동네 유치원은 어디있을까?</h2>
                            <p>새로운 친구를 만나는 유치원 <br/>
                                우리아이는 어디로 보내야 할까?
                            </p>
                            <Link to={'/search'} onClick={()=>{
                                window.scrollTo(0,0)
                            }}>유치원 찾아보기</Link>
                        </div>
                    </div>
                    <div className="main-go">
                        <div className="text-box">
                            <h2>모든 유치원이 여기에</h2>
                            <p>꾸미기 어려운 유치원 홈페이지 <br/>
                                관리되지 않는 유치원 홈페이지 <br/>
                                이젠 모으미와 함께 유치원을 꾸며보세요!
                            </p>
                            <span>* 플랫폼 꾸미기 기능은 교사만 가능합니다.</span>
                            <Link to={'/kinder'} onClick={()=>{
                                window.scrollTo(0,0)
                            }}>내 유치원 가기</Link>
                        </div>
                        <ImgBox src={`${origin}/main/main-2.jpg`} />
                    </div>
                </div>
                <div className="notice-box">
                    <div className="title">
                        <h1>공지사항 & QNA</h1>
                        <h2>모으미의 새로운 소식을 전해드립니다.</h2>
                    </div>
                    <div className="notice">
                        <div className="pick">
                            <h3 className="active">공지사항</h3>
                            <h3>FAQ</h3>
                        </div>
                        <div className="content-box">
                            <div className="content">
                                <h4>공지사항</h4>
                                <p>2024년 1차(4월) 유치원 정보 공시 오픈 안내</p>
                                <span>2024-04-29</span>
                            </div>
                            <div className="content">
                                <h4>공지사항</h4>
                                <p>2023년 유치원알리미 이용자 만족도 조사 당첨자 발표</p>
                                <span>2024-05-22</span>
                            </div>
                            <div className="content">
                                <h4>공지사항</h4>
                                <p>4월 16일 업데이트 안내</p>
                                <span>2024-04-16</span>
                            </div>
                        </div>
                    </div>
                    <div className="update">
                        <div className="pick">
                            <h3>업데이트 안내</h3>
                        </div>
                        <div className="content-box">
                            <div className="content">
                                <h4>업데이트</h4>
                                <p>5월 30일 업데이트 안내</p>
                                <span>2024-05-30</span>
                            </div>
                            <div className="content">
                                <h4>업데이트</h4>
                                <p>5월 22일 업데이트 안내</p>
                                <span>2024-05-22</span>
                            </div>
                            <div className="content">
                                <h4>업데이트</h4>
                                <p>4월 16일 업데이트 안내</p>
                                <span>2024-04-16</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            
        </section>
    )
}

export default MainPage