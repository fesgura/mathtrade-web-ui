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
}) => {
  switch (type) {
    case "game":
      return (
        <Game game={objectToWant} want_ids={want_ids} setWantId={setWantId} />
      );
    case "item":
      return <Item item={objectToWant} />;
    case "tag":
      return (
        <Tag
          tag={objectToWant}
          dup_protection={dup_protection}
          set_dup_protection={set_dup_protection}
        />
      );

    default:
      return null;
  }
};

export default ObjectToWant;
