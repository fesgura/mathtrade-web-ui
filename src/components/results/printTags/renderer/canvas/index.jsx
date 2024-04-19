import useCanvasRenderer from "./useCanvasRenderer";
import { canvasWidth, canvasHeight } from "../../config";

const CanvasRenderer = ({ content }) => {
  const { canvasRef } = useCanvasRenderer(content);

  return (
    <div className="">
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        ref={canvasRef}
        className="bg-white hidden shadow-xl mx-auto mb-5"
      />
    </div>
  );
};

export default CanvasRenderer;
