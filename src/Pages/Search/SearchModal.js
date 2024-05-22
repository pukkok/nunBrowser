import React, { useEffect } from "react";
import './styles/SearchModal.css'
const {kakao} = window // 카카오 맵 사용

function SearchModal () {

    useEffect(()=>{
        const container = document.getElementById('map')

        const options = {
            center: new kakao.maps.LatLng(0,0), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(container, options); 

        const geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch('서울특별시 강남구 광평로34길 17', function(result, status) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">유치원</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    } 
    });    
    }, [])

    return(
        <>
            <div id="map"></div>
        </>
    )
}

export default SearchModal