import { useMemo, useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { colorTagStyles } from "@/utils/color";
import { isEmptyWantGroup } from "@/components/want-components/utils";

const useWantGroup = (wantGroup = null, itemId = null) => {
  const { canI } = useContext(PageContext);

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
  } = wantGroup || {};

  const isCombo = type === "item" && (wants?.[0]?.elements?.length || 0) > 1;

  const elementsThumbnails = useMemo(() => {
    let game_thumbnail = null;
    const items = (wants || []).concat(availables || []);

    if (type === "item" || type === "tag") {
      game_thumbnail = items?.[0]?.elements?.[0]?.element?.thumbnail;
      return [{ thumbnail: game_thumbnail || "" }];
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
      })?.[0]?.thumbnail;
    } else {
      game_thumbnail = games?.[0]?.thumbnail;
    }

    return [{ thumbnail: game_thumbnail || "" }];
  }, [type, wants, availables, bgg_id]);

  const style = useMemo(() => {
    return type === "tag" ? colorTagStyles(tag?.color) : null;
  }, [type, tag]);

  const { setChanges } = useContext(MyWantsContext);

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
    canIwant: canI.want && !isEmptyWantGroup(wantGroup),
    onToggle,
  };
};

export default useWantGroup;
