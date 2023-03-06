import Game from "./game";
import Item from "./item";
import Tag from "./tag";

const ObjectToWant = ({
  objectToWant,
  type,
  want_ids,
  setWantId,
  dup_protection,
  set_dup_protection,
  afterAnyChange,
  canEditWants,
}) => {
  switch (type) {
    case "game":
      return (
        <Game
          game={objectToWant}
          want_ids={want_ids}
          setWantId={setWantId}
          afterAnyChange={afterAnyChange}
          canEditWants={canEditWants}
        />
      );
    case "item":
      return (
        <Item
          item={objectToWant}
          afterAnyChange={afterAnyChange}
          canEditWants={canEditWants}
        />
      );
    case "tag":
      return (
        <Tag
          tag={objectToWant}
          dup_protection={dup_protection}
          set_dup_protection={set_dup_protection}
          afterAnyChange={afterAnyChange}
          canEditWants={canEditWants}
        />
      );

    default:
      return null;
  }
};

export default ObjectToWant;
