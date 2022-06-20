import { api } from "../utils";

const LocationService = {
  getList: () => {
    return api.get("api/locations");
  },
};

export default LocationService;
