import GameQuadCard from "components/gameQuadCard";
import WantEditor from "components/wantEditor";

const Game_in_list = ({ game, afterAnyChange }) => {
  /*
  const [wantInfo, setWantInfo] = useState(null);

  useEffect(() => {
    const newWantInfoArr = itemWants.filter((itm) => {
      return itm.want.id === item.id;
    });
    if (newWantInfoArr.length) {
      const newWantInfo = newWantInfoArr[0].items.map((itm) => {
        return itm.id;
      });
      setWantInfo(newWantInfo);
    } else {
      setWantInfo(null);
    }
  }, [item, itemWants]);
*/
  return (
    <GameQuadCard
      game={game}
      //wanted={wantInfo !== null}
      wanted={false}
      rightHeader={
        <div className="py-3">
          <WantEditor
            type="game"
            objectToWant={game}
            afterAnyChange={afterAnyChange}
            // wantInfo={wantInfo}
          />
        </div>
      }
    />
  );
};
export default Game_in_list;
