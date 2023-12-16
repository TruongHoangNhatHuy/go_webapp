import config from 'config.json';

const serverUrl = config.be_rootUrl;
export const getInfoAccount = async (token,userId) => {
    var urlString = serverUrl +"/customers/" + userId;
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
        console.warn('getInfoUser failed: ', error);
        throw error;
      });
  }
  export const updateInfoAccount = async (token,userId,formData) => {
    var urlString = serverUrl +"/customers/" + userId;
    var authToken = "Bearer " + token;
  
    return await fetch(urlString, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Authorization": authToken,
        // "Content-Type": "application/json",
      },
      body: formData,
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
        console.log("call API success", result);
        return result;
      })
      // catch fail fetch
      .catch(error => {
        console.warn('getInfoUser failed: ', error);
        throw error;
      });
  }