import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  valuatePostItem: (props) => {
    setAuth();
    return api.post(endpoints.POST_VALUE_ITEMS, props.data);
  },
  listGames: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(
      endpoints.compose("GET_GAMES_LIST", [mathTradeId]),
      props.query
    );
  },
  listItems: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(
      endpoints.compose("GET_ITEMS_LIST", [mathTradeId]),
      props.query
    );
  },
  listItemGroups: () => {
    setAuth();
    const mathTradeId = getMathtradeId();

    return api.get(endpoints.compose("GET_ITEM_GROUPS", [mathTradeId]));
  },

  //
};

export default services;
