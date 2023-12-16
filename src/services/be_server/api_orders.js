import config from 'config.json';

const serverUrl = config.be_rootUrl;


export const getAllOrders = async (token, page, size,from = null,to = null,sortType = "desc",sortField = "createAt") => {
    const urlStringFrom = (from != null) ? "&from=" + from : ""
    const urlStringTo = (to != null) ? "&to=" + to : ""
    const urlString = serverUrl +"/bookings?" + "sortField=" + sortField + urlStringFrom + urlStringTo + "&sortType=" + sortType + "&size=" +  size  + "&page=" + page;
    const authToken = "Bearer " + token;
  
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
      .then(data => {
        console.log("server send",data);
        return data;
      })
      // catch fail fetch
      .catch(error => {
        console.warn('getBooking failed: ', error);
        throw error;
      });
  }