import React, { Component } from "react";

class Map extends Component {
  map = null;
  loadMap() {
    this.map = new vietmapgl.Map({
      container: "map",
      style:
        "https://maps.vietmap.vn/mt/tm/style.json?apikey=c3d0f188ff669f89042771a20656579073cffec5a8a69747", // stylesheet location
      center: [106.69799977311857, 10.772520403841128], // starting position [lng, lat]
      zoom: 15,
      pitch: 90, // starting zoom
    });
  }
  addMarker(lngLat) {
    //add marker to map
    new vietmapgl.Marker()
      .setLngLat(lngLat)
      .addTo(this.map);
  }
  componentDidMount() {
    this.loadMap();

    // Set an event listener
    this.map.on('click', (e) => {
      console.log('A click event has occurred at ' + e.lngLat);
      this.addMarker(e.lngLat)
    });
  }


  render() {
    return <div id="map" style={{ position: 'fixed', width: "100%", height: "100vh" }}></div>;
  }
}

export default Map;
