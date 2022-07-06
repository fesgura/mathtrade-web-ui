import { api, setAuth } from "../utils";

const ItemService = {
  list: () => {
    setAuth();
    return api.get("api/items/");
  },
};

export default ItemService;
