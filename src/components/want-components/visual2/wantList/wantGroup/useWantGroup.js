import { useMemo, useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { colorTagStyles } from "@/utils/color";

const useWantGroup = (wantGroup, itemId) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const {
    id: wantGroupId,
    name,
    type,
    game_type,
    tag,
    wants,
    bgg_id,
    value,
    availables,
  } = wantGroup;

  const isCombo = type === "item" && wants?.[0].elements.length > 1;

  const elementsThumbnails = useMemo(() => {
    let game_thumbnail = null;

    const items = wants.concat(availables);

    if (type === "item" || type === "tag") {
      game_thumbnail = items?.[0]?.elements?.[0]?.element?.thumbnail;
      return [{ thumbnail: game_thumbnail || "" }]; //[elementThumb];
    }

    const games = items
      ?.reduce((arr, item) => {
        const { elements } = item;
        return arr.concat(elements);
      }, [])
      ?.map(({ element }) => {
        return element.game;
      });

    if (bgg_id) {
      game_thumbnail = games?.filter(({ bgg_id: bggId }) => {
        return `${bggId}` === `${bgg_id}`;
      })?.[0]?.game_thumbnail;
    } else {
      game_thumbnail = games?.[0]?.game_thumbnail;
    }

    return [{ thumbnail: game_thumbnail || "" }]; //[elementThumb];
  }, [type, wants, availables, bgg_id]);

  const style = useMemo(() => {
    return type === "tag" ? colorTagStyles(tag?.color) : null;
  }, [type, tag]);

  //////////////////////
  /* MYWANTS CONTEXT **********************************************/
  const { setChanges, changes /*, setMatchValues*/ } =
    useContext(MyWantsContext);
  /* end MYWANTS CONTEXT */

  const onToggle = useCallback(
    (valueToChange) => {
      setChanges((oldChanges) => {
        const oldChangesCopy = { ...oldChanges };
        oldChangesCopy[`${wantGroupId}_${itemId}`] = valueToChange;
        return oldChangesCopy;
      });
    },
    [setChanges, wantGroupId, itemId]
  );

  return {
    isCombo,
    elementsThumbnails,
    style,
    name,
    type,
    game_type,
    value,
    canIwant: canI.want,
    onToggle,
  };
};

export default useWantGroup;
