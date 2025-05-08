import { GridContextProvider } from "@/context/myWants/grid";
import GridUI from "./ui";
import { useEffect, useState } from "react";
import I18N from "@/i18n";
import CommitHeaderGrid from "@/components/want-components/commit/headers/header-grid";
import Wrapper from "@/components/wrapper";

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
      <Wrapper className="mb-1">
        <div className="bg-colorMain shadow-main px-3 py-4">
          <CommitHeaderGrid />
        </div>
      </Wrapper>

      {enabledUseOfGrid === "pending" ? null : enabledUseOfGrid === "yes" ? (
        <GridUI />
      ) : (
        <Wrapper className="mb-1">
          <div className="bg-colorMain shadow-main px-3 py-4 rounded-b-main">
            <p className="text-center text-balance">
              <I18N
                id="want.screen.grid.disabled"
                values={[enabledUseOfGrid_limit]}
              />
            </p>
          </div>
        </Wrapper>
      )}
    </GridContextProvider>
  );
};

export default Grid;

/*  */
