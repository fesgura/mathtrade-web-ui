import Game from "./game";
import Item from "./item";

const ObjectToWant = ({ objectToWant, type, want_ids, setWantId }) => {
  switch (type) {
    case "game":
      return (
        <Game game={objectToWant} want_ids={want_ids} setWantId={setWantId} />
      );
    case "item":
      return <Item item={objectToWant} />;

    default:
      return null;
  }
};

export default ObjectToWant;
