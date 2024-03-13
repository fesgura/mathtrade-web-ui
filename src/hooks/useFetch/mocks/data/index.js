import LOGIN from "./login.json";

// COLLECTION
import GET_MYCOLLECTION_ITEMS from "./collection/list.json";
import EDIT_MYCOLLECTION_ITEM from "./collection/edit.json";
import DELETE_MYCOLLECTION_ITEM from "./collection/delete.json";

// MY ITEMS
import GET_MYITEMS from "./myItems/list.json";
import GET_MYITEM_GROUPS from "./items/groups.json";

// ITEMS
import GET_ITEMS_LIST from "./items/list.json";
import GET_ITEM from "./items/by-id.json";

// TAGS
import MYTAGS from "./tags/list.json";

// GAMES
import GET_GAMES_LIST from "./games/list.json";
import GET_GAME from "./games/by-id.json";

// WANTS
import MYWANTS from "./wants/list.json";
import GET_WANT from "./wants/by-id.json";

const data = {
  LOGIN,

  // COLLECTION
  GET_MYCOLLECTION_ITEMS,
  EDIT_MYCOLLECTION_ITEM,
  DELETE_MYCOLLECTION_ITEM,

  // MY ITEMS
  GET_MYITEMS,
  GET_MYITEM_GROUPS,

  //ITEMS
  GET_ITEMS_LIST,
  GET_ITEM,

  // TAGS
  MYTAGS,

  // GAMES
  GET_GAMES_LIST,
  GET_GAME,

  // WANTS
  MYWANTS,
  GET_WANT,
};

export default data;
