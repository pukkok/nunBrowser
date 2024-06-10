# 유치원 모으미
<img src=public/main/logo.png>

<br><br><br>
## 1. 제작사유

현재 유치원 홈페이지를 보면 관리가 되지 않거나, 블로그나 카페를 이용하는 경우가 많다. 홈페이지 관리가 되지 않으니 학부모들도 홈페이지 들어오는 횟수도 적어지며, 교사들도 의무적으로 해야 하는 일이 아니면(포토갤러리 사진업로드 or 식단표 업로드 등) 홈페이지를 사용하지 않게 된 듯하다.
홈페이지 방문자를 늘리기 위함과 쉬운 제작 및 관리를 위해 홈페이지 템플릿을 만들어서 누구나 쉽게 홈페이지를 꾸밀 수 있도록 계획하였다.

<BlockQuote>구현시 필요한 기능</BlockQuote>

- 유치원 검색 기능(api연동)
- 지도 위치 표시(api연동)
- 로그인 및 회원가입
  - 교사, 학부모 따로 제작
  - 교사 원아 등록 기능 구현
- 템플릿 제작
  - 사진 업로드 기능(로고, 배경)
  - 네비게이션 바 설정 기능
  - 컨텐츠 추가 기능
  - 전체 레이아웃 기능(컨테이너 or 그리드)
  - 식단표(달력) 추가 기능
  - 알레르기표(수정) 추가 기능
  - 원아 정보(출석부) 기능

<br><br><br>
## 2. 시장조사
<BlockQuote>참고한 사이트</BlockQuote>

- 유치원알리미 (https://e-childschoolinfo.moe.go.kr)
  - 유치원 정보 api
  - 현재 주변의 유치원 주소와 해당 유치원에 대한 정보를 알 수 있음. 
  - 유치원 검색페이지 구현 시 이용
  
- 미르유치원 (http://mir.sjedukg.kr)
  - 레이아웃 및 필요한 리스트 추출
  - 유치원 홈페이지라면 공통으로 사용하는 요소나, 홈페이지 구성 요소 등을 확인

- 아임웹 (https://imweb.me/faq?mode=view&category=28&category2=31&idx=5890)
  - 관리자 페이지 레이아웃 잡기, 템플릿 구성 시 필요한 요소들 확인

<br><br><br>
## 3. 서비스 이용
<BlockQuote>공통</BlockQuote>

- 검색페이지나, 서비스페이지는 권한이 없어도 이용 가능(비회원)
- 유치원 홈페이지에 접속은 가능하나, 로그인이 안 된 경우에 이용할 수 없는 컨텐츠가 존재함.

<BlockQuote>교사</BlockQuote>

- 교사는 로그인 시에 본인이 교사임이 확인될 경우 회원가입 가능
- 회원가입 후 유치원 제작 권한(관리자 권한)은 원장에게 첫 번째로 전달.
- 원장은 다른 교사에게 제작 권한을 줄 수 있음.
- 기본적으로 유치원 홈페이지에서 많이 사용하는 요소들은 템플릿으로 구성하여 선택하여 개인이 커스터마이징 가능하도록 구현.
- 페이지 제작 이후 식단표나 유치원 일정 같은 프로그램을 홈페이지에 업로드 할 수 있는 템플릿 제작
- 원아 등록은 유치원교사가 등록 가능

<BlockQuote>학부모</BlockQuote>

- 회원가입 후 유치원 원아가 등록된 학부모라면 해당 유치원 홈페이지의 사용 권한 부여
- 커뮤니티 이용 권한 부여

<br><br><br>
## 4. 페이지 미리보기
<BlockQuote>메인페이지</BlockQuote>
<img src=extra/main1.JPG>

<br><br>
<BlockQuote>서비스 정보</BlockQuote>
<img src=extra/serviceInfo.JPG>
<br><br>
<BlockQuote>유치원 검색</BlockQuote>
<img src=extra/search.JPG>
<br><br>
<BlockQuote>관리자페이지</BlockQuote>
<img src=extra/admin.JPG>
<br><br>
<BlockQuote>제작 페이지</BlockQuote>
<img src=extra/kinder.JPG>

<br><br><br>
## 5. 컴포넌트 설계
<img src=extra/componetBuild.png>

<br><br><br>
## 6. 문제점 및 해결방법
추가 예정

<BlockQuote>
  사용 스킬
</BlockQuote>

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
