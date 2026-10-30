import CanvasRenderer from "./canvas";
import useRenderer from "./useRenderer";
import type { Tag } from "../types";

const PrintTagRenderer = ({ tags = [] }: { tags?: Tag[] }) => {
  const { canvasList } = useRenderer(tags);

  return canvasList.length ? (
    <div className="">
      {canvasList.map((content, k) => {
        return <CanvasRenderer content={content} key={k} />;
      })}
    </div>
  ) : null;
};

export default PrintTagRenderer;
