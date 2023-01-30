import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  getTags: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("MYTAGS", [mathTradeId]));
  },
  postTag: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(
      endpoints.compose("POST_MYTAGS", [mathTradeId]),
      props.data
    );
  },
  putTag: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.put(
      endpoints.compose("PUT_MYTAGS", [mathTradeId, props.id]),
      props.data
    );
  },
  deleteTag: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(
      endpoints.compose("DELETE_MYTAGS", [mathTradeId, props.id])
    );
  },
};

export default services;
