import { useEffect, useRef, useState } from "react";

import Flicking from "@egjs/flicking";
import { EVENTS } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import Meme from "./meme";

const list = Array.from({ length: 10 }, (_, i) => i);

const MemelogyUI = ({ data }) => {
  const sliderNode = useRef(null);

  const [viewLabel, setViewLabel] = useState(true);

  useEffect(() => {
    const flicking = new Flicking(sliderNode.current, {
      align: "center",
      //circular: true,
      bound: true,
      renderOnlyVisible: true,
      horizontal: true,
      adaptive: true,
      moveType: "freeScroll",
      interruptable: true,
      preventClickOnDrag: true,
      autoResize: true,
    });

    let isHiddenLabel = false;

    flicking.on(EVENTS.MOVE, (evt) => {
      if (!isHiddenLabel) {
        isHiddenLabel = true;
        setViewLabel(false);
      }
    });
    return () => {
      //flicking.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-96 cursor-grab">
      <div ref={sliderNode} className="flicking-viewport">
        <div className="flicking-camera">
          {data.map((meme, i) => {
            return <Meme data={meme} key={`${meme?.title || "m"}-${i}`} />;
          })}
        </div>
      </div>
      {viewLabel && (
        <div className="absolute top-1/2 left-1/2 bg-white text-gray-600 w-40 font-bold p-2 rounded-full z-50 text-center -translate-x-1/2 -translate-y-1/2 uppercase shadow-md pointer-events-none">
          ⬅️ Arrastrá ➡️
        </div>
      )}
    </div>
  );
};

export default MemelogyUI;
