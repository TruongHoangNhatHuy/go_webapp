import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import config from 'config.json'

mapboxgl.accessToken = config.mapbox.accessToken

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(108.15); // longitude: kinh độ
  const [lat, setLat] = useState(16.075); // latitude: vĩ độ
  const [zoom, setZoom] = useState(14);


  useEffect(() => {
    // Nếu đã khởi tạo map, bỏ qua
    if (map.current) return;
    // Khởi tạo map ban đầu
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    // Đổi kinh độ, vĩ độ & độ phóng to khi người dùng tương tác với map
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });


  return (
    <div>
      <div className='sidebar'>
        Kinh độ: {lng} | Vĩ độ: {lat} | Độ phóng to: {zoom}
      </div>
      <div ref={mapContainer} className='map-container'/>
    </div>
  );
}

export default Map