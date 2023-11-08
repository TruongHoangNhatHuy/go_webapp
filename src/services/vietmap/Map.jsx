import { useEffect, useRef } from "react";

const Map = ({ startLocation, endLocation, setMapCenterRef }) => {
  const vietmapgl = window.vietmapgl;

  const mapRef = useRef(null);
  const mapControlRef = useRef({});
  const infoMarkerRef = useRef(null);     // marker thông tin
  const startMarkerRef = useRef(null);    // marker điểm đi
  const endMarkerRef = useRef(null);      // marker điểm đến
  const customerMarkerRef = useRef(null); // marker khách hàng
  const driverMarkerRef = useRef(null);   // marker tài xế

  // Tạo custom marker
  const createCustomMarkerElement = (imagePath) => {
    const el = document.createElement('div');
    const width = 38;
    const height = 38;
    el.className = 'marker';
    el.style.backgroundImage = 'url(' + imagePath + ')';
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';
    return ({
      element: el,
      offset: [0, -height/2]
    });
  }

  // Xử lý hiện thị marker
  const handleMarker = (markerRef, lngLat = null, markerOption = null) => {
    // Nếu trên bản đồ tồn tại marker, remove
    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }
    // Thêm marker mới
    if (lngLat !== null) {
      markerRef.current = new vietmapgl.Marker(markerOption)
        .setLngLat(lngLat)
        .addTo(mapRef.current)
    }
  }

  const setMapCenter = (lngLat) => {
    mapRef.current.flyTo({ center: lngLat });
  }
  setMapCenterRef.current.setMapCenter = setMapCenter;

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
    // Thêm các control cho map
    if (!mapControlRef.current.navigationControl) {
      // Điều khiển map
      mapControlRef.current.navigationControl = new vietmapgl.NavigationControl();
      mapRef.current.addControl(mapControlRef.current.navigationControl, 'bottom-left');
    }
    if (!mapControlRef.current.geolocateControl) {
      // Định vị
      mapControlRef.current.geolocateControl = new vietmapgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: true,
      })
      mapRef.current.addControl(mapControlRef.current.geolocateControl, 'bottom-left');
      
      mapControlRef.current.geolocateControl.on('geolocate', (e) => {
        var lng = e.coords.longitude;
        var lat = e.coords.latitude;
        var position = [lng, lat];
        console.log('user position', position);
      });
    }

    // Mouse click event listener
    mapRef.current.on('click', (e) => {
      // console.log('A click event has occurred at ' + e.lngLat);
      handleMarker(infoMarkerRef, e.lngLat);
      // console.log(infoMarkerRef.current.getElement())
    });
  }, [])

  useEffect(()=> {
    // Gắn marker cho điểm đi
    if (startLocation !== null) {
      var lngLat = [startLocation.coordinates.lng, startLocation.coordinates.lat];
      handleMarker(startMarkerRef, lngLat, { color: "green" });
      setMapCenter(lngLat);
    }
    else 
      handleMarker(startMarkerRef, null);
    // Gắn marker cho điểm đến
    if (endLocation !== null) {
      var lngLat = [endLocation.coordinates.lng, endLocation.coordinates.lat];
      handleMarker(endMarkerRef, lngLat, { color: "red" });
      setMapCenter(lngLat);
    }
    else
      handleMarker(endMarkerRef, null);
  }, [startLocation, endLocation])

  return (
    <div id="map-container" style={{ position: 'fixed', width: "100vw", height: "100vh", zIndex: 0 }}/>
  )
}

export default Map;
