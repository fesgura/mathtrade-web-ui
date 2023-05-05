import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  getMathTradeResults: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_MT_RESULTS", [mathTradeId]), props);
  },

  getPrices: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_PRICES", [mathTradeId]), props);
  },
  postImgPrices: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(endpoints.compose("POST_IMG_PRICES", [mathTradeId]), props);
  },
};

export default services;
