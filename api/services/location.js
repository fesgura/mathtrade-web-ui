import { api } from "../utils";
import endpoints from "api/utils/endpoints";

const LocationService = {
  getList: () => {
    return api.get(endpoints.GET_LOCATIONS);
  },
};

export default LocationService;
