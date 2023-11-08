import config from 'config.json'

const apiKey = config.vietmap.primaryToken // 1000 req/ngày
// const apiKey = config.vietmap.secondaryToken // 10 req/phút

export function getLocationsByAddress(address) {
  if (address === null || address === "")
    return []

  const req = new XMLHttpRequest();
  var urlString = "https://maps.vietmap.vn/api/search/v3?apikey="+ apiKey +"&text="+ address;
  req.open('GET', urlString, false);
  req.send(null);

  var responseJson = JSON.parse(req.responseText);
  console.log('getLocationsByAddress', responseJson);
  return responseJson
}

export function getCoordinatesByRefid(refid) {
  const req = new XMLHttpRequest();
  var urlString = "https://maps.vietmap.vn/api/place/v3?apikey="+ apiKey +"&refid="+ refid;
  req.open('GET', urlString, false);
  req.send(null);

  var responseJson = JSON.parse(req.responseText);
  console.log("getCoordinatesByRefid", [responseJson.lat, responseJson.lng]);
  return responseJson
}