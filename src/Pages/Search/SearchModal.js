import React, { useEffect, useRef } from "react";
import './styles/SearchModal.css'
const {kakao} = window // 카카오 맵 사용

function SearchModal () {

    const mapRef = useRef()
    const markerRef = useRef()

    useEffect(()=>{
        const container = mapRef.current

        const options = {
            center: new kakao.maps.LatLng(0,0), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(container, options); 

        const geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch('세종특별자치시 나리로 38', function(result, status) {

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
            content: '<div style="width:150px;text-align:center;padding:6px 0;">자기 집</div>'
            // content: markerRef.current
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    } 
    });    
    }, [])



    return(
        <>
            <div id="map" ref={mapRef}></div>
            <div ref={markerRef} style={{width:'100px', textAlign: 'center', padding:'4px 0'}}>자기 집</div>
        </>
    )
}

export default SearchModal