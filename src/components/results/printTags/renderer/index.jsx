import CanvasRenderer from "./canvas";
import useRenderer from "./useRenderer";

const PrintTagRenderer = () => {
  const { canvasList } = useRenderer();

  return canvasList.length ? (
    <div className="">
      {canvasList.map((content, k) => {
        return <CanvasRenderer content={content} key={k} />;
      })}
    </div>
  ) : null;
};

export default PrintTagRenderer;
