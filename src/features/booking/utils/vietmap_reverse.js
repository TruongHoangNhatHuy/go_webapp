import config from 'config.json'

const apiKey = config.vietmap.primaryToken // 1000 req/ngày
// const apiKey = config.vietmap.secondaryToken // 10 req/phút

export const getLocationByCoordinates = (lng, lat) => {
  const req = new XMLHttpRequest();
  var urlString = "https://maps.vietmap.vn/api/reverse/v3?apikey="+ apiKey +"&lng="+ lng +"&lat="+ lat;
  req.open('GET', urlString, false);
  req.send(null);

  var responseJson = JSON.parse(req.responseText);
  console.log("getLocationByCoordinates", responseJson);
  return responseJson
}