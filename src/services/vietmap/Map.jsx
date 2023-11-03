import { useEffect, useRef } from "react";

const Map = ({ startLocationInfo, endLocationInfo }) => {
  const mapRef = useRef(null);
  const infoMarkerRef = useRef(null);   // marker thông tin
  const startMarkerRef = useRef(null);  // marker điểm đi
  const endMarkerRef = useRef(null);    // marker điểm đến

  // Xử lý hiện thị marker
  const handleMarker = (markerRef, lngLat = null, color = "#3fb1ce") => {
    // Nếu trên bản đồ tồn tại marker, remove
    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }
    // Thêm marker mới
    if (lngLat !== null) {
      markerRef.current = new vietmapgl.Marker({ color: color })
        .setLngLat(lngLat)
        .addTo(mapRef.current)
    }
  }

  useEffect(() => {
    if (!mapRef.current) {
      // Khởi tạo map ban đầu
      mapRef.current = new vietmapgl.Map({
        container: "map-container",
        style: "https://maps.vietmap.vn/mt/tm/style.json?apikey=c3d0f188ff669f89042771a20656579073cffec5a8a69747", // stylesheet location
        center: [108.15, 16.075], // starting position [lng, lat]
        zoom: 15,
        pitch: 90, // starting zoom
      })
    }

    // Mouse click event listener
    mapRef.current.on('click', (e) => {
      console.log('A click event has occurred at ' + e.lngLat);
      handleMarker(infoMarkerRef, e.lngLat);
    });

    // Gắn marker cho điểm đi
    if (startLocationInfo !== null) {
      var lngLat = [startLocationInfo.coordinates.lng, startLocationInfo.coordinates.lat]
      handleMarker(startMarkerRef, lngLat, "#0ed145")
    }
    else 
      handleMarker(startMarkerRef, null, "#0ed145")
    // Gắn marker cho điểm đến
    if (endLocationInfo !== null) {
      var lngLat = [endLocationInfo.coordinates.lng, endLocationInfo.coordinates.lat]
      handleMarker(endMarkerRef, lngLat, "#f44336")
    }
    else
      handleMarker(endMarkerRef, null, "#f44336")
  }, [startLocationInfo, endLocationInfo])

  return (
    <div id="map-container" style={{ position: 'fixed', width: "100%", height: "100vh" }}/>
  )
}

export default Map;
