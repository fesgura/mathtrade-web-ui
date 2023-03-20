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
  getItemById: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_ITEM", [mathTradeId, props.id]));
  },
  getGameById: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(endpoints.compose("GET_GAME", [mathTradeId, props.id]));
  },
  listItemGroups: () => {
    setAuth();
    const mathTradeId = getMathtradeId();

    return api.get(endpoints.compose("GET_ITEM_GROUPS", [mathTradeId]));
  },

  //
};

export default services;
