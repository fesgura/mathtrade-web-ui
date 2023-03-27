import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  listMathTrades: () => {
    setAuth();
    return api.get(endpoints.GET_MATHTRADES);
  },
  getMathTrade: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_MATHTRADE", [mathTradeId]));
  },

  getMathTradeUser: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(
      endpoints.compose("GET_MATHTRADE_USER", [mathTradeId, props.userId])
    );
  },
  getMathTradeUsers: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_MATHTRADE_USERS", [mathTradeId]));
  },
  getMathTradeStats: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_MATHTRADE_STATS", [mathTradeId]));
  },
};

export default services;
