import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // In case a user has very slow internet connection, we want to abort mission of fetching the data and throw an error.
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    // The getJSON function returns an unfulfilled promise that will become fulfilled even if the error occurs and is caught here. Additionally, the function that is calling getJSON won't see that error and will throw an error that is a consequence if the empty fulfilled promise.
    // To allow a function that is calling getJSON to throw actual error before proceding with the fulfilled promise that it empty, we need to rethrow the error. By doing that we manually reject the promise that we returned from the getJSON function.
    throw err;
  }
};
