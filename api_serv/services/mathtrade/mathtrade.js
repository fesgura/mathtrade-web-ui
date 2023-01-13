import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  listMathTrades: () => {
    setAuth();
    return api.get(endpoints.GET_MATHTRADES);
  },
  getMathTradeUser: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(
      endpoints.compose("GET_MATHTRADE_USERS", [mathTradeId, props.userId])
    );
  },
};

export default services;
