import { useContext, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { ElementContext } from "@/context/element";
import { maxCharacters } from "@/config/maxCharacters";
import I18N, { getI18Ntext } from "@/i18n";

// What whoever gave you this game last edition wrote about it (status and
// comment). Receiving a game moves only the game to your collection, so this
// is the way to recover, e.g., which component was missing.
const ReceivedCopies = ({ onUseComment }) => {
  const { element } = useContext(ElementContext);
  const game = element?.game?.bgg_id;

  const params = useMemo(() => ({ game }), [game]);
  const [, copies] = useFetch({
    endpoint: "GET_RECEIVED_COPIES",
    params,
    autoLoad: Boolean(game),
    initialState: [],
  });

  if (!Array.isArray(copies) || !copies.length) return null;

  return (
    <div className="mb-4 flex flex-col gap-2">
      {copies.map((copy, k) => (
        <div
          key={k}
          className="rounded-md border border-sky-200 bg-sky-50 p-3 text-sm"
        >
          <p className="font-bold mb-1">
            <I18N id="receivedCopy.title" values={[copy.mathtrade]} />
          </p>
          <p className="text-gray-700">
            <I18N id="receivedCopy.box" />:{" "}
            {getI18Ntext(`statusType.box.${copy.box_status}`)} ·{" "}
            <I18N id="receivedCopy.components" />:{" "}
            {getI18Ntext(`statusType.components.${copy.component_status}`)}
          </p>
          {copy.comment ? (
            <>
              <p className="italic text-gray-800 mt-1">“{copy.comment}”</p>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="text-primary font-bold underline hover:text-sky-700"
                  onClick={() =>
                    onUseComment(copy.comment.slice(0, maxCharacters))
                  }
                >
                  <I18N id="receivedCopy.useComment" />
                </button>
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ReceivedCopies;
