import Flicking from "@egjs/flicking";
import { EVENTS } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import { useEffect, useRef, useState } from "react";

const list = Array.from({ length: 10 }, (_, i) => i);

const MemelogyUI = () => {
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
      resizeOnContentsReady: true,
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
      flicking.destroy();
    };
  }, []);

  return (
    <div className="p-5">
      <div className="relative">
        <div ref={sliderNode} className="flicking-viewport">
          <div className="flicking-camera">
            {list.map((item, i) => {
              return (
                <div className="card-panel px-2" key={item}>
                  <div
                    className="bg-red-500 w-96  rounded-md"
                    style={{ height: `${30 * item + 200}px` }}
                  >
                    {" "}
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {viewLabel && (
          <div className="absolute top-1/2 left-1/2 bg-white text-gray-600 w-40 font-bold p-2 rounded-full z-50 text-center -translate-x-1/2 -translate-y-1/2 uppercase shadow-md pointer-events-none">
            ⬅️ Arrastrá ➡️
          </div>
        )}
      </div>
    </div>
  );
};

export default MemelogyUI;
