/** Fallback for the number of items a first-time member can offer. The BE
 *  sends the real value as `membership.new_user_offer_limit` (login payload);
 *  this is only used by stores saved before that field existed. */
export const NEW_USER_OFFER_LIMIT = 10;

/** The limit from the membership in the store, or the fallback. */
export const getNewUserOfferLimit = (membership?: any): number => {
  const limit = membership?.new_user_offer_limit;
  return typeof limit === "number" ? limit : NEW_USER_OFFER_LIMIT;
};
