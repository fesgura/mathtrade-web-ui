import { api, setAuth } from "../utils";

const MathTradeService = {
  // MathTrades
  listMathTrades: () => {
    setAuth();
    return api.get("api/mathtrades/");
  },
  signInMathTrade: (props) => {
    setAuth();
    return api.post(
      "api/mathtrades/" + props.mathTradeId + "/members/",
      props.data
    );
  },
  editMemberMathTrade: (props) => {
    setAuth();
    return api.put(
      "api/mathtrades/" + props.mathTradeId + "/members/" + props.userId + "/",
      props.data
    );
  },
  cancelMemberMathTrade: (props) => {
    setAuth();
    return api.delete(
      "api/mathtrades/" + props.mathTradeId + "/members/" + props.userId + "/"
    );
  },
  getMathTradeUser: (props) => {
    setAuth();
    return api.get(
      "api/mathtrades/" + props.mathTradeId + "/users/" + props.userId + "/"
    );
  },
  listMyItems: (props) => {
    setAuth();
    return api.get("api/mathtrades/" + props.mathTradeId + "/user-items/");
  },
  listMyItemValues: (props) => {
    setAuth();
    return api.get("api/mathtrades/" + props.mathTradeId + "/user-values/");
  },
  publishItem: (props) => {
    setAuth();
    return api.post(
      "api/mathtrades/" + props.mathTradeId + "/items/",
      props.data
    );
  },
  unpublishItem: (props) => {
    setAuth();
    return api.delete(
      "api/mathtrades/" + props.mathTradeId + "/items/" + props.itemId + "/"
    );
  },
  valuatePutItem: (props) => {
    setAuth();
    return api.put(
      "api/mathtrades/" +
        props.mathTradeId +
        "/user-values/" +
        props.itemId +
        "/",
      props.data
    );
  },
  listGames: (props) => {
    setAuth();
    return api.get("api/mathtrades/" + props.mathTradeId + "/games/");
  },
  listItems: (props) => {
    setAuth();
    return api.get(
      "api/mathtrades/" + props.mathTradeId + "/items/",
      props.query
    );
  },
};

export default MathTradeService;
