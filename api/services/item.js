import { api, setAuth } from "../utils";

const ItemService = {
  listMyItems: () => {
    setAuth();
    return api.get("api/items/");
  },
  delete: (id) => {
    setAuth();
    return api.delete("api/items/" + id + "/");
  },
  // Math Trade
  listMathTradeItems: (params) => {
    setAuth();
    return api.get("api-mathtrade/items/", params);
  },
};

export default ItemService;
