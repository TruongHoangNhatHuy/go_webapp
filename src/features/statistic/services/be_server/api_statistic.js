import config from 'config.json';

const serverUrl = config.be_rootUrl;

export const getStatistic = async (token, unit, from, to = null) => {
  var urlString = serverUrl +`/admin/statistics?unit=${unit}&from=${from}`;
  var params = (to === null) ? '' : `&to=${to}`
  var authToken = "Bearer " + token;

  return await fetch(urlString+params, {
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
      // if (!response.ok)
      //   throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.warn('getStatistic failed: ', error);
      throw error;
    });
}