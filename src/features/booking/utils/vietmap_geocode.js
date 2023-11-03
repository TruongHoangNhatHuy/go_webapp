const apiKey = "c3d0f188ff669f89042771a20656579073cffec5a8a69747"

export function getLocationsByAddress(address) {
  const req = new XMLHttpRequest();
  var urlString = "https://maps.vietmap.vn/api/search/v3?apikey="+ apiKey +"&text="+ address;
  req.open('GET', urlString, false);
  req.send(null);

  var responseJson = JSON.parse(req.responseText);
  return responseJson

  // var locationList = [];
  // responseJson.forEach(i => {
  //   locationList.push({"ref_id": i.ref_id, "address": i.address}) //[i.ref_id, i.address])
  // });
  // console.log(locationList);
  // return locationList
}

export function getCoordinatesByRefid(refid) {
  const req = new XMLHttpRequest();
  var urlString = "https://maps.vietmap.vn/api/place/v3?apikey="+ apiKey +"&refid="+ refid;
  req.open('GET', urlString, false);
  req.send(null);

  var responseJson = JSON.parse(req.responseText);
  // console.log("lat,lng", [responseJson.lat, responseJson.lng]);
  return responseJson
}