import config from 'config.json';

const serverUrl = config.be_rootUrl;

export const registerCustomer = async (token, formData) => {
  var urlString = serverUrl + "/account/register-customer";
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: {
      "Authorization": authToken,
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
      return result;
    })
    // catch fail fetch
    .catch(error => {
      console.warn('Register customer failed: ', error);
      throw error;
    });
}

export const registerDriver = async (token, formData) => {
  var urlString = serverUrl + "/account/register-driver";
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: {
      "Authorization": authToken,
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
      return result;
    })
    // catch fail fetch
    .catch(error => {
      console.warn('Register customer failed: ', error);
      throw error;
    });
}