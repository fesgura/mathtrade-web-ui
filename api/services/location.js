import { api } from "../utils";

const LocationService = {
  getList: () => {
    return api.get("locations");
  },
};

export default LocationService;
