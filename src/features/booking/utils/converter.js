export const milisecondsToString = (ms) => {
  var HH = Math.round(ms/3600000);
  var mm = Math.round((ms-HH*3600000)/60000);
  if (mm < 0) {
    HH -= 1;
    mm += 60;
  }
  return (HH > 0 ? HH+' tiếng ' : '')+mm+' phút';
}

export const metersToString = (meters) => {
  var km = Math.round(meters/1000);
  meters = Math.round(meters-km*1000);
  if (meters < 0) {
    km -= 1;
    meters += 1000;
  }
  return (km > 0 ? km+' km ' : '')+meters+' m'
}