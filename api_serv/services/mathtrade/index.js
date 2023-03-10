import mathtrade from "./mathtrade";
import myItems from "./myItems";
import list from "./list";
import myWants from "./myWants";
import results from "./results";
import myData from "./myData";
import myTags from "./myTags";
import bans from "./ban";
import comments from "./comments";

const MathTradeService = {
  ...mathtrade,
  ...myItems,
  ...list,
  ...myWants,
  ...results,
  ...myData,
  ...myTags,
  ...bans,
  ...comments,
};

export default MathTradeService;
