import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  getWants: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("MYWANTS", [mathTradeId]));
  },
  getWant: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_WANT", [mathTradeId, props.id]));
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
  postWantBatch: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(
      endpoints.compose("PUT_MYWANTS_BATCH", [mathTradeId]),
      props.data
    );
  },
  commitChanges: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(endpoints.compose("COMMIT_CHANGES", [mathTradeId]));
  },
  deleteWant: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(
      endpoints.compose("DELETE_MYWANTS", [mathTradeId, props.id])
    );
  },
  autocompleteWants: () => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(endpoints.compose("AUTOCOMPLETE_WANTS", [mathTradeId]));
  },
};

export default services;
