import { GridContextProvider } from "@/context/myWants/grid";
import GridUI from "./ui";
import { useEffect, useState } from "react";
import I18N from "@/i18n";

const enabledUseOfGrid_limit = 1200;

const Grid = () => {
  const [enabledUseOfGrid, setEnabledUseOfGrid] = useState("pending");

  useEffect(() => {
    if (window.innerWidth < enabledUseOfGrid_limit) {
      setEnabledUseOfGrid("no");
    } else {
      setEnabledUseOfGrid("yes");
    }
  }, []);

  return (
    <GridContextProvider>
      {enabledUseOfGrid === "pending" ? null : enabledUseOfGrid === "yes" ? (
        <GridUI />
      ) : (
        <div className="text-center px-4">
          <p className="">
            <I18N
              id="want.screen.grid.disabled"
              values={[enabledUseOfGrid_limit]}
            />
          </p>
        </div>
      )}
    </GridContextProvider>
  );
};

export default Grid;

/*  */
