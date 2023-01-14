import { storageName, storageOptionsName, daysExpireToken } from "config";

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
  clear: () => {
    if (window) {
      window.localStorage.removeItem(storageName);
    }
  },
  getOptions: () => {
    if (window) {
      const dataString = window.localStorage.getItem(storageOptionsName);
      if (dataString) {
        return JSON.parse(dataString);
      }
    }
    return null;
  },
  setOptions: (data) => {
    if (window && data) {
      window.localStorage.setItem(storageOptionsName, JSON.stringify(data));
    }
  },
};

const defaultModel = {
  user: {
    data: {},
    bgg: {},
  },
  auth: {
    token: null,
    expires: 0,
  },
  mathtrade: null,
};

const defaultOptionsModel = {};

storage.setToStorage = (opts) => {
  /*
  user => user.data
  token => auth.token
  bggUser => user.bgg
  mathtrade => mathtrade
  */
  const store = storage.get() || { ...defaultModel };

  for (let a in opts) {
    const value = opts[a];
    if (value) {
      switch (a) {
        case "user":
          delete value.token;
          store.user.data = value;
          break;
        case "token":
          store.auth.token = value;
          const d = new Date();
          store.auth.expires = d.getTime() + 86400000 * daysExpireToken;
          break;
        case "bggUser":
          store.user.bgg = value;
          break;
        case "mathtrade":
          if (value) {
            store.mathtrade = value;
          } else {
            store.mathtrade = null;
          }

          break;
        default:
        //
      }
    }
  }
  storage.set(store);
};
storage.getFromStore = (item) => {
  /*
  user => user.data
  auth => auth
  bggUser => user.bgg
  mathtrade => mathtrade
  */

  const store = storage.get() || { ...defaultModel };

  if (!store) {
    return null;
  }

  switch (item) {
    case "user":
      return store.user ? store.user.data : null;
    case "bggUser":
      return store.user ? store.user.bgg : null;
    case "auth":
      return store.auth;
    case "token":
      return store.auth.token;
    case "mathtrade":
      return store.mathtrade;
    case "options":
      return store.options || {};
    default:
      return store[item] || null;
  }
};

storage.setToOptions = (opts) => {
  const optionStored = storage.getOptions() || { ...defaultOptionsModel };

  for (let a in opts) {
    const value = opts[a];
    if (value) {
      optionStored[a] = value;
    }
  }
  storage.setOptions(optionStored);
};
storage.setMathtradeIamIn = (status) => {
  const store = storage.get() || { ...defaultModel };
  if (store.mathtrade) {
    store.mathtrade.IamIn = status;
    storage.set(store);
  }
};
storage.getFromOptions = (itemName) => {
  const optionStored = storage.getOptions();

  if (!optionStored || !optionStored[itemName]) {
    return null;
  }

  return optionStored[itemName];
};

export default storage;
