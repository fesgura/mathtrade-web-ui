const storageName = "MathTradeArgentina";

const storage = {
  get: () => {
    if (window) {
      const dataString = window.localStorage.getItem(storageName);
      if (dataString) {
        return JSON.parse(dataString);
      }
    }
    return null;
  },
  set: (data) => {
    if (window && data) {
      window.localStorage.setItem(storageName, JSON.stringify(data));
    }
  },
};
/*
const model = {
  user: {
    data: {},
    bgg: {},
  },
  auth: {
    token: "",
    expires: 123,
  },
};
*/

export default storage;
