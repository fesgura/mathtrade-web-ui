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
  listMyItemValues: (props) => {
    setAuth();
    return api.get("api/items/item-values/");
  },
  valuatePostItem: (props) => {
    setAuth();
    return api.post("api/items/item-values/", props.data);
  },
  listGames: (props) => {
    setAuth();
    return api.get(
      "api/mathtrades/" + props.mathTradeId + "/games/",
      props.query
    );
  },
  listItems: (props) => {
    setAuth();
    return api.get(
      "api/mathtrades/" + props.mathTradeId + "/items/",
      props.query
    );
  },
  wants: (props) => {
    setAuth();
    return api.get("api/mathtrades/" + props.mathTradeId + "/user-wants/");
  },
  setWant: (props) => {
    setAuth();
    return api.post(
      "api/mathtrades/" + props.mathTradeId + "/user-wants/",
      props.data
    );
  },
};

export default MathTradeService;
