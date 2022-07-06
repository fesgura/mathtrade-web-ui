import { storageName, daysExpireToken } from "config";

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

const defaultModel = {
  user: {
    data: {},
    bgg: {},
  },
  auth: {
    token: null,
    expires: 0,
  },
};

storage.setToStorage = (options) => {
  /*
  user => user.data
  token => auth.token
  bggUser => user.bgg
  */
  const store = storage.get() || { ...defaultModel };

  for (let a in options) {
    const value = options[a];
    if (value) {
      switch (a) {
        case "user":
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
  */

  const store = storage.get();

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
    default:
      return store[item] || null;
  }
};
storage.mergeStore = (store, options) => {
  const newStore = JSON.parse(JSON.stringify(store));
  for (let a in options) {
    const value = options[a];
    if (value) {
      switch (a) {
        case "user":
          newStore.user.data = value;
          break;
        case "bggUser":
          newStore.user.bgg = value;
          break;
        default:
        //
      }
    }
  }
  return newStore;
};

export default storage;
