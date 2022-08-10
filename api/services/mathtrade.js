import { api, setAuth } from "../utils";

const MathTradeService = {
  // MathTrades
  listMathTrades: () => {
    setAuth();
    return api.get("api/mathtrades/");
  },
  signInMathTrade: (mathTradeId) => {
    setAuth();
    return api.put("api/mathtrades/" + mathTradeId + "/");
  },
};

export default MathTradeService;
