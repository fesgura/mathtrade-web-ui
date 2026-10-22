// Tagged copies as MYTAGS returns them. Kept free of `@/` imports so that
// `node --test src/utils/tagItems.test.ts` can load it.

export type TagItem = {
  id: number;
  title: string;
  elements: { bgg_id: number }[];
  contains_offered: boolean;
  ignored?: boolean; // BE MYTAGS since 2026-10-21; missing = not ignored
};

// A MYTAGS tag as stored in PageContext.itemTags: `items` are ids,
// `itemsComplete` the full rows.
export type MyTag = {
  id: string;
  name: string;
  color: string;
  items: (number | string)[];
  itemsComplete?: TagItem[];
  [key: string]: any;
};

/** Tagged copies you can want: ignored ones are hidden (they stay tagged).
 * Never filter `tag.items` (the ids) with this: the tag editor PUTs them
 * back, and a filtered list would untag the ignored copies. */
export const visibleTagItems = (
  items: TagItem[] | undefined | null
): TagItem[] => (items || []).filter((item) => !item?.ignored);

/** True when `itemId` is tagged in `tag` and ignored. */
export const isIgnoredInTag = (
  tag: MyTag | null | undefined,
  itemId: number | string
): boolean =>
  !!(tag?.itemsComplete || []).find((item) => `${item.id}` === `${itemId}`)
    ?.ignored;

/** MYTAGS `results` → PageContext.itemTags (same mapping as the offer page's
 * loader): `items` become ids, the full rows go to `itemsComplete`. */
export const toItemTags = (results: any[] | undefined | null): MyTag[] =>
  (results || []).map((tag, i) => ({
    ...tag,
    id: `${tag?.id || i}`,
    itemsComplete: tag.items,
    items: (tag.items || []).map(({ id }: TagItem) => id),
  }));
