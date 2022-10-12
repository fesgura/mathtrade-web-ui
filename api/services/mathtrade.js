import { api, setAuth, getMathtradeId } from "../utils";

const MathTradeService = {
  // MathTrades
  listMathTrades: () => {
    setAuth();
    return api.get("api/mathtrades/");
  },
  signInMathTrade: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post("api/mathtrades/" + mathTradeId + "/members/", props.data);
  },
  editMemberMathTrade: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.put(
      "api/mathtrades/" + mathTradeId + "/members/" + props.userId + "/",
      props.data
    );
  },
  cancelMemberMathTrade: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(
      "api/mathtrades/" + mathTradeId + "/members/" + props.userId + "/"
    );
  },
  getMathTradeUser: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(
      "api/mathtrades/" + mathTradeId + "/users/" + props.userId + "/"
    );
  },
  listMyItems: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get("api/mathtrades/" + mathTradeId + "/user-items/");
  },
  publishItem: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post("api/mathtrades/" + mathTradeId + "/items/", props.data);
  },
  unpublishItem: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(
      "api/mathtrades/" + mathTradeId + "/items/" + props.itemId + "/"
    );
  },
  // listMyItemValues: (props) => {
  //   setAuth();
  //   return api.get("api/items/item-values/");
  // },
  valuatePostItem: (props) => {
    setAuth();
    return api.post("api/items/item-values/", props.data);
  },
  listGames: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get("api/mathtrades/" + mathTradeId + "/games/", props.query);
  },
  listItems: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get("api/mathtrades/" + mathTradeId + "/items/", props.query);
  },
  wants: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get("api/mathtrades/" + mathTradeId + "/user-wants/");
  },
  setWant: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(
      "api/mathtrades/" + mathTradeId + "/user-wants/",
      props.data
    );
  },
  //
  listMyItemGroups: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(
      "api/mathtrades/" + mathTradeId + "/user-item-groups/",
      props.query
    );
  },
};

export default MathTradeService;
