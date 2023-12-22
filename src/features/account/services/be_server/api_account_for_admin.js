import config from 'config.json';

const serverUrl = config.be_rootUrl;

// driver interview api
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
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.warn('getNotActivatedDriver failed: ', error);
      throw error;
    });
}
export const activateDriver = async (token, ids) => {
  var urlString = serverUrl +`/drivers/active/${ids}`;
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Authorization": authToken,
      "Content-Type": "application/json",
    },
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
      console.warn('activateDriver failed: ', error);
      throw error;
    });
}
export const refuseDriver = async (token, ids) => {
  var urlString = serverUrl +`/drivers/refuse/${ids}`;
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Authorization": authToken,
      "Content-Type": "application/json",
    },
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
      console.warn('refuseDriver failed: ', error);
      throw error;
    });
}

// driver manage api
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
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.warn('getDrivers failed: ', error);
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
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.warn('getDriverDetail failed: ', error);
      throw error;
    });
}

// customer manage api
export const getCustomers = async (token, size = 30, page = 0, isNonBlock = null, searchName = "") => {
  var urlString = serverUrl +`/customers?size=${size}&page=${page}`;
  var params1 = (isNonBlock === null) ? "" : `&isNonBlock=${isNonBlock}`;
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
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.warn('getCustomers failed: ', error);
      throw error;
    });
}