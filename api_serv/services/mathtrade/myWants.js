import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  wants: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("MYWANTS", [mathTradeId]));
  },
  setWant: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(
      endpoints.compose("POST_MYWANTS", [mathTradeId]),
      props.data
    );
  },
};

export default services;
