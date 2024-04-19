import CanvasRenderer from "./canvas";
import useRenderer from "./useRenderer";

const PrintTagRenderer = () => {
  const { canvasList } = useRenderer();

  return (
    <div className="">
      {canvasList.map((content, k) => {
        return <CanvasRenderer content={content} key={k} />;
      })}
    </div>
  );
};

export default PrintTagRenderer;
