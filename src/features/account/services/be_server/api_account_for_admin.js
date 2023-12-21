import config from 'config.json';

const serverUrl = config.be_rootUrl;

export const getNotActivatedDriver = async (token, size = 30, page = 0) => {
  var urlString = serverUrl +`/drivers/all?status=NOT_ACTIVATED&size=${size}&page=${page}`;
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
      console.warn('getNotActivatedDriver failed: ', error);
      throw error;
    });
}

export const getDrivers = async (token, size = 30, page = 0, status = "", searchName = "") => {
  var urlString = serverUrl +`/drivers/all?size=${size}&page=${page}`;
  var params1 = (status === "") ? "" : `&status=${status}`;
  var params2 = (searchName === "") ? "" : `&searchField=fullName&keyword=${searchName}`;
  var authToken = "Bearer " + token;

  return await fetch(urlString+params1+params2, {
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
      console.warn('getAllDriver failed: ', error);
      throw error;
    });
}

export const getDriverDetail = async (token, id) => {
  var urlString = serverUrl +`/drivers?id=${id}`;
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
      console.warn('getDriverDetail failed: ', error);
      throw error;
    });
}