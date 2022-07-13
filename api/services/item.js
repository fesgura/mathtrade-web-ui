import { api, setAuth } from "../utils";

const ItemService = {
  list: () => {
    setAuth();
    return api.get("api/items/");
  },
  delete: (id) => {
    setAuth();
    return api.delete("api/items/" + id + "/");
  },
};

export default ItemService;
