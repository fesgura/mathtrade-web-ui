import { useContext } from "react";
import { PageContext } from "@/context/page";
import { getNewUserOfferLimit } from "@/config/newUserOfferLimit";

/** The offer limit for a first-time member (BE `api/math_item/limits.py`).
 *  Counts the items already loaded into PageContext by Yo ofrezco and Mi
 *  ludoteca (`myItemsInMT`), so it makes no request of its own. The BE
 *  enforces the same cap, so this only keeps the UI from offering what the
 *  BE would reject. */
const useNewUserOfferLimit = () => {
  const { isNewUser, myItemsInMT, membership } = useContext(PageContext);
  const limit = getNewUserOfferLimit(membership);
  const count = (myItemsInMT || []).length;
  return {
    isNewUser: !!isNewUser,
    limit,
    count,
    reached: !!isNewUser && count >= limit,
  };
};

export default useNewUserOfferLimit;
