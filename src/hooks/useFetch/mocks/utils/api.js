import data from "../data";

const loadingTimeMS = 300;

const setPromiseAPI = (endpoint) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const dataToSend = data[endpoint] || {
        message: "No hay un ENDPOINT asociado",
      };
      if (dataToSend) {
        res({
          ok: true,
          data: dataToSend,
        });
      } else {
        // Error
        res({
          ok: false,
          data: null,
        });
      }
    }, loadingTimeMS);
  });
};

const apiMock = {
  headers: { Authorization: null },
  setHeaders: () => {},
  get: setPromiseAPI,
  post: setPromiseAPI,
  put: setPromiseAPI,
  delete: setPromiseAPI,
};

export default apiMock;
