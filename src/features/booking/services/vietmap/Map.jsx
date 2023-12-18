import { useEffect, useRef } from "react";
import './Map.css';
import config from 'config.json';
import { getLocationByCoordinates } from "./api_reverse";
import CarIcon from 'assets/car.png';
import MotocycleIcon from 'assets/motorcycle.png'
import polyline from "@mapbox/polyline";

// const apiKey = config.vietmap.primaryToken // 1000 req/ngày
const apiKey = config.vietmap.secondaryToken // 10 req/phút
// const apiKey = config.vietmap.thirdToken // 5000 req/ngày

const Map = (props) => {
  const { startLocation, endLocation, vehicleRoute, setUserPosition, setMapCenterRef, driverPosition } = props;
  const vietmapgl = window.vietmapgl;

  const mapRef = useRef(null);
  const mapControlRef = useRef({});
  const infoMarkerRef = useRef(null);     // marker thông tin
  const startMarkerRef = useRef(null);    // marker điểm đi
  const endMarkerRef = useRef(null);      // marker điểm đến
  const routeRef = useRef(null);          // route từ điểm đi tới điểm đến
  const driverMarkerRef = useRef(null);   // marker tài xế
  const driverRouteRef = useRef(null);    // route từ tài xế tới khách hàng

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

  const DriverMarker = (imagePath, bearing) => {
    const el = document.createElement('div');
    const width = 50;
    const height = 50;
    el.className = 'marker';
    el.style.backgroundImage = 'url(' + imagePath + ')';
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';
    return ({
      element: el,
      rotation: bearing,
      offset: [0, 0],
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
  // Marker's popup
  const handleMarkerPopup = (markerRef, info) => {
    // console.log(info);
    if (info !== null) {
      const html = "<h3 style='margin:0'>"+ info.name +"</h3><h4 style='margin:0; color:gray'>"+ info.address +"</h4>"
      
      markerRef.current.setPopup(new vietmapgl.Popup({ maxWidth: 'none', closeOnClick: false }).setHTML(html));
      markerRef.current.togglePopup();
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
        style: "https://maps.vietmap.vn/mt/tm/style.json?apikey="+ apiKey,
        center: [108.15, 16.075], // starting position [lng, lat]
        zoom: 15, // starting zoom
        // pitch: 90,
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
      mapRef.current.on('load', () => {
        mapControlRef.current.geolocateControl.trigger();
      })
      
      mapControlRef.current.geolocateControl.on('geolocate', (e) => {
        var lng = e.coords.longitude;
        var lat = e.coords.latitude;
        var position = [lat, lng];
        setUserPosition(position);
        // console.log('User position', position);
      });
    }

    // Mouse click event listener
    mapRef.current.on('click', (e) => {
      // console.log('A click event has occurred at ' + e.lngLat);
      handleMarker(infoMarkerRef, e.lngLat);
      var location = getLocationByCoordinates(e.lngLat.lng, e.lngLat.lat);
      // console.log('marker location ', location);
      handleMarkerPopup(infoMarkerRef, location[0])
    });
  }, [])

  // Gắn marker điểm đi & đến
  useEffect(()=> {
    // Gắn marker cho điểm đi
    if (startLocation !== null) {
      var startLngLat = [startLocation.coordinates.lng, startLocation.coordinates.lat];
      handleMarker(startMarkerRef, startLngLat, { color: "green" });
      handleMarkerPopup(startMarkerRef, startLocation.location);
      setMapCenter(startLngLat);
    }
    else handleMarker(startMarkerRef, null);
    // Gắn marker cho điểm đến
    if (endLocation !== null) {
      var endLngLat = [endLocation.coordinates.lng, endLocation.coordinates.lat];
      handleMarker(endMarkerRef, endLngLat, { color: "red" });
      handleMarkerPopup(endMarkerRef, endLocation.location);
      setMapCenter(endLngLat);
    }
    else handleMarker(endMarkerRef, null);
  }, [startLocation, endLocation])

  // Vẽ route từ điểm đi tới điểm đến
  useEffect(() => {
    if (startLocation !== null && endLocation !== null) {
      // Nếu có đủ 2 marker điểm đi & điểm đến:
      // Lấy thông tin tuyến đường
      var route = vehicleRoute;
      if (route !== null) {
        // Nếu route cũ đang hiện trên bản đồ, xóa route cũ
        if (routeRef.current !== null) {
          mapRef.current.removeLayer("routeLayer");
          mapRef.current.removeSource("routeSource");
          // console.log("remove old route");
        };
        // Hiện thị route mới trên bản đồ
        routeRef.current = {};
        routeRef.current.source = {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: route.paths[0].points,
          }
        };
        routeRef.current.layer = {
          id: "routeLayer",
          type: "line",
          source: "routeSource",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#00b0ff",
            "line-width": 7,
            "line-opacity": 0.7
          }
        };
        mapRef.current.addSource("routeSource", routeRef.current.source);
        mapRef.current.addLayer(routeRef.current.layer);
        // console.log("display current route");
      }
    }
    else if (routeRef.current !== null) {
      // Nếu không đủ 2 marker điểm đi & điểm đến, xóa route đang có
      mapRef.current.removeLayer("routeLayer");
      mapRef.current.removeSource("routeSource");
      routeRef.current = null;
      // console.log("remove current route");
    };
  }, [startLocation, endLocation, vehicleRoute])

  // Gắn marker vị trí driver & vẽ đường đi
  useEffect(() => {
    if (driverPosition !== null) {
      const icon = driverPosition.vehicle === 'motorcycle' ? MotocycleIcon : CarIcon;
      const driverLngLat = [driverPosition.lng, driverPosition.lat];
      handleMarker(driverMarkerRef, driverLngLat, DriverMarker(icon, driverPosition.bearing));
      // Vẽ đường đi tài xế
      if (driverPosition.routeEncode !== null) {
        const array = polyline.decode(driverPosition.routeEncode);
        const correctedArray = [];
        array.forEach(point => {
          correctedArray.push([point[1], point[0]]);
        });
        const driverRoute = {
          "type": "LineString",
          "coordinates": correctedArray
        }
        // console.log(driverRoute);
        // Nếu route cũ đang hiện trên bản đồ, xóa route cũ
        if (driverRouteRef.current !== null) {
          mapRef.current.removeLayer("driverRouteLayer");
          mapRef.current.removeSource("driverRouteSource");
        };
        driverRouteRef.current = {};
        driverRouteRef.current.source = {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: driverRoute,
          }
        };
        driverRouteRef.current.layer = {
          id: "driverRouteLayer",
          type: "line",
          source: "driverRouteSource",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "gray",
            "line-width": 7,
            "line-opacity": 0.7
          }
        };
        mapRef.current.addSource("driverRouteSource", driverRouteRef.current.source);
        mapRef.current.addLayer(driverRouteRef.current.layer);
      }
    }
    else {
      handleMarker(driverMarkerRef, null);
      if (driverRouteRef.current !== null) {
        mapRef.current.removeLayer("driverRouteLayer");
        mapRef.current.removeSource("driverRouteSource");
        driverRouteRef.current = {};
      };
    }
  }, [driverPosition])

  return (
    <div id="map-container" style={{ position: 'fixed', width: "100vw", height: "100vh", zIndex: 0 }}/>
  )
}

export default Map;
