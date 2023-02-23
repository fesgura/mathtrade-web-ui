import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  getBans: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_BANS", [mathTradeId]));
  },
  postBan: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(endpoints.compose("POST_BAN", [mathTradeId]), props.data);
  },
  deleteBan: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(endpoints.compose("DELETE_BAN", [mathTradeId, props.id]));
  },
};

export default services;
