import config from 'config.json'

const apiKey = config.vietmap.primaryToken // 1000 req/ngày
// const apiKey = config.vietmap.secondaryToken // 10 req/phút

export function getLocationsAutocomplete(address, userLatLng) {
  if (address === null || address === "")
    return []

  const req = new XMLHttpRequest();
  var urlString = "https://maps.vietmap.vn/api/autocomplete/v3?apikey="+ apiKey +"&focus="+ userLatLng +"&text="+ address;
  req.open('GET', urlString, false);
  req.send(null);

  var responseJson = JSON.parse(req.responseText);
  // console.log('getLocationsAutocomplete', responseJson);
  return responseJson
}