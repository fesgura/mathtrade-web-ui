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
  listMyItemGroups: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();

    return api.get(
      endpoints.compose("GET_MYITEM_GROUPS", [mathTradeId]),
      props.query
    );
  },
};

export default services;
