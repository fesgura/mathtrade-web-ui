import Game from "./game";

const ObjectToWant = ({ objectToWant, type, want_ids, setWantId }) => {
  switch (type) {
    case "game":
      return (
        <Game game={objectToWant} want_ids={want_ids} setWantId={setWantId} />
      );

    default:
      return null;
  }
};

export default ObjectToWant;
