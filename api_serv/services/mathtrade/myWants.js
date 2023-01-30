import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  getWants: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("MYWANTS", [mathTradeId]));
  },
  postWant: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(
      endpoints.compose("POST_MYWANTS", [mathTradeId]),
      props.data
    );
  },
  putWant: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.put(
      endpoints.compose("PUT_MYWANTS", [mathTradeId, props.id]),
      props.data
    );
  },
  deleteWant: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(
      endpoints.compose("DELETE_MYWANTS", [mathTradeId, props.id])
    );
  },
};

export default services;
