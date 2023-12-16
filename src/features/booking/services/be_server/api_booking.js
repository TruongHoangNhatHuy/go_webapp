import config from 'config.json';

const serverUrl = config.be_rootUrl;

export const getAmount = async (pickUpLngLat, dropOffLngLat) => {
  var urlString = serverUrl + "/bookings/travel-info?pickUpLocation="+ pickUpLngLat +"&dropOffLocation="+ dropOffLngLat;

  return await fetch(urlString, {
    method: "GET",
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
      console.warn('Booking getAmounts failed: ', error);
      throw error;
    });
}

export const createBooking = async (token, jsonBody) => {
  var urlString = serverUrl + "/bookings";
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Authorization": authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
    redirect: "follow"
  })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.warn('Create booking failed: ', error);
      throw error;
    });
}

export const getActiveBooking = async (token) => {
  var urlString = serverUrl + "/bookings/active";
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Authorization": authToken,
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.warn('Get active booking failed: ', error);
      throw error;
    });
}

export const createReview = async (token, jsonBody) => {
  var urlString = serverUrl + "/reviews";
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Authorization": authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
    redirect: "follow"
  })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.warn('Create review failed: ', error);
      throw error;
    });
}