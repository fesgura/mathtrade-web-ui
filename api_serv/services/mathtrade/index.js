import mathtrade from "./mathtrade";
import myItems from "./myItems";
import list from "./list";
import myWants from "./myWants";
import results from "./results";
import myData from "./myData";

const MathTradeService = {
  ...mathtrade,
  ...myItems,
  ...list,
  ...myWants,
  ...results,
  ...myData,
};

export default MathTradeService;
