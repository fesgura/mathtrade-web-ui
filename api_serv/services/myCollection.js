import { api, setAuth } from "../utils";
import endpoints from "api_serv/utils/endpoints";

const myCollectionService = {
  listItems: () => {
    setAuth();
    return api.get(endpoints.GET_MYCOLLECTION_ITEMS);
  },
  deleteItem: (id) => {
    setAuth();
    return api.delete(endpoints.compose("DELETE_MYCOLLECTION_ITEM", [id]));
  },
};

export default myCollectionService;
