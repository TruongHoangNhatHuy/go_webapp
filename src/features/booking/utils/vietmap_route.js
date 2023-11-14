import config from 'config.json'

const apiKey = config.vietmap.primaryToken // 1000 req/ngày
// const apiKey = config.vietmap.secondaryToken // 10 req/phút

export function getRoute(startLatLng, endLatLng, vehicle = "motorcycle") {
  const req = new XMLHttpRequest();
  var urlString = "https://maps.vietmap.vn/api/route?api-version=1.1&apikey="+ apiKey +"&point="+ startLatLng +"&point="+ endLatLng  +"&vehicle="+ vehicle +"&points_encoded=false";
  req.open('GET', urlString, false);
  req.send(null);

  var responseJson = JSON.parse(req.responseText);
  // console.log("getRoute", responseJson);
  return responseJson
}