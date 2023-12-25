import { Paper,Stack, Modal, Rating, ListItemText, Button, Grid, Box, TextField, Typography, MenuItem, Avatar, Divider, ListItemAvatar, ImageList, ImageListItem, InputAdornment, ListItem, IconButton } from "@mui/material"
import { useEffect,useState,useRef } from "react";
import { getRoute } from "features/booking/services/vietmap/api_route";
import config from 'config.json';

const apiKey = config.vietmap.thirdToken // 5000 req/ngày

export const MapTile = ({startCoordinates,endCoordinates,vehicleType}) => {
    const vietmapgl = window.vietmapgl;
    const startMarker = useRef(null);
    const endMarker = useRef(null);
    const routeRef = useRef(null);
    const mapRef = useRef(null);
    const DrawRoute = () => {
        const tempStartCoordinates = [startCoordinates[1],startCoordinates[0]];
        const tempEndCoordinates = [endCoordinates[1],endCoordinates[0]];
        const route = getRoute(tempStartCoordinates,tempEndCoordinates, (vehicleType == "MOTORCYCLE") ? "motorcycle" : "car");
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
    useEffect(() => {
        if (!mapRef.current) {
            // Khởi tạo map ban đầu
            mapRef.current = new vietmapgl.Map({
              container: "map-container",
              style: "https://maps.vietmap.vn/mt/tm/style.json?apikey="+ apiKey,
              center: [108.155668, 16.066694], // starting position [lng, lat]
              zoom: 15, // starting zoom
              interactive: false,
              // pitch: 90,
            })
        }
        if(startMarker.current !== null){
            startMarker.current.remove()
            startMarker.current = null
        }
        if(endMarker.current !== null){
            endMarker.current.remove()
            endMarker.current = null
        }
        if(startCoordinates !== null  && endCoordinates !== null) {
        startMarker.current = new vietmapgl.Marker({ color: "green" }).setLngLat(startCoordinates).addTo(mapRef.current)
        endMarker.current = new vietmapgl.Marker({ color: "red" }).setLngLat(endCoordinates).addTo(mapRef.current)
        mapRef.current.fitBounds([startCoordinates,endCoordinates],{
            padding: {top: 50, bottom:50, left: 50, right: 50}
        })  
           setTimeout(()=>DrawRoute(),1500)
        }
    },[startCoordinates,endCoordinates])
    // useEffect(() => {
    //     console.log("start nhan",startCoordinates);
    //     console.log("end nhan",endCoordinates);
    //     if (!mapRef.current ) {
    //     if(startCoordinates != null && endCoordinates !=null){
    //         handleMarker(startCoordinates)
    //         handleMarker(endCoordinates)
    //         mapRef.current.fitBounds([startCoordinates,endCoordinates])
    //     }
    //     }
    // },[startCoordinates,endCoordinates])
    
    
    return(
         <div id="map-container" style={{height:"100%", width:"100%" ,zIndex: 0,borderRadius: "16px", padding:"16px 16px"}} />
    )
    
  }