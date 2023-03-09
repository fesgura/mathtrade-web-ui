import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  getMathTradeResults: (userId) => {
    setAuth();
    const mathTradeId = getMathtradeId();

    const userGet = userId ? { user: userId } : null;

    return api.get(endpoints.compose("GET_MT_RESULTS", [mathTradeId]), userGet);
  },
};

export default services;
