import config from 'config.json';

const serverUrl = config.be_rootUrl;

export const getDriverById = async (token, driverId) => {
  var urlString = serverUrl +"/drivers/"+ driverId +'/base-profile';
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Authorization": authToken,
      "Content-Type": "application/json",
    },
    redirect: "follow"
  })
    // await receiving response
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    // await getting response body
    .then(result => {
      return result;
    })
    // catch fail fetch
    .catch(error => {
      console.warn('getDriverById failed: ', error);
      throw error;
    });
}