import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  listMyItems: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_MYITEMS", [mathTradeId]));
  },
  publishItem: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(
      endpoints.compose("PUBLISH_ITEM", [mathTradeId]),
      props.data
    );
  },
  unpublishItem: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(
      endpoints.compose("UNPUBLISH_ITEM", [mathTradeId, props.itemId])
    );
  },
  listMyItemGroups: () => {
    setAuth();
    const mathTradeId = getMathtradeId();

    return api.get(endpoints.compose("GET_MYITEM_GROUPS", [mathTradeId]));
  },
  postMyItemGroups: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();

    return api.post(
      endpoints.compose("POST_MYITEM_GROUPS", [mathTradeId]),
      props.data
    );
  },
  putMyItemGroups: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();

    return api.put(
      endpoints.compose("PUT_MYITEM_GROUPS", [mathTradeId, props.id]),
      props.data
    );
  },
  deleteMyItemGroups: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();

    return api.delete(
      endpoints.compose("DELETE_MYITEM_GROUPS", [mathTradeId, props.id])
    );
  },
};

export default services;
