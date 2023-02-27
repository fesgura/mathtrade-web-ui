import { api, setAuth } from "../utils";
import endpoints from "api_serv/utils/endpoints";

const ImageService = {
  postBase64Image: (data) => {
    setAuth();
    return api.post(endpoints.POST_IMAGE, { img_code: data });
  },
};

//{'img_code':'textB64'}

export default ImageService;
