import { useId, useEffect, useRef, useState } from "react";
import Icon from "components/icon";
import I18N from "i18n";
import ErrorAlert from "components/errorAlert";
import { Button, UncontrolledTooltip } from "reactstrap";
import { useApi, ImageService } from "api_serv";
import { photoUploaderConfig } from "config";
import { LoadingBox } from "components/loading";

const twoPointsReg = new RegExp(":", "g");

const canvasSize = {
  width: 500,
  height: 500,
  crop: {
    width: 300,
    height: 300,
    style: {},
  },
};
canvasSize.midH = 0.5 * canvasSize.width;
canvasSize.midV = 0.5 * canvasSize.height;

canvasSize.crop.style = {
  left: 0.5 * (canvasSize.width - canvasSize.crop.width),
  top: 0.5 * (canvasSize.height - canvasSize.crop.height),
  width: canvasSize.crop.width,
  height: canvasSize.crop.height,
};

//
const canvasSizeMobile = {
  width: 250,
  height: 250,
  crop: {
    width: 150,
    height: 150,
    style: {},
  },
};
canvasSizeMobile.midH = 0.5 * canvasSizeMobile.width;
canvasSizeMobile.midV = 0.5 * canvasSizeMobile.height;

canvasSizeMobile.crop.style = {
  left: 0.5 * (canvasSizeMobile.width - canvasSizeMobile.crop.width),
  top: 0.5 * (canvasSizeMobile.height - canvasSizeMobile.crop.height),
  width: canvasSizeMobile.crop.width,
  height: canvasSizeMobile.crop.height,
};

const Editor = ({ srcBlob, onBack, onCancel, widthSend, onLoaded }) => {
  const [postBase64Image, , loading, errors] = useApi({
    promise: ImageService.postBase64Image,
    afterLoad: (dataUrl) => {
      if (onLoaded) onLoaded(dataUrl?.url || "");
    },
  });

  const id = useId("img_loader").replace(twoPointsReg, "");

  const canvasRef = useRef(null);
  const canvasRefOut = useRef(null);
  const imageRef = useRef(null);
  const imageLoaded = useRef(false);
  const scale = useRef({ now: 1, prev: 1 });
  const rotate = useRef({ now: 0, prev: 0, value: 0 });
  //
  const mouseMove = useRef(false);
  const xPos = useRef(0);
  const yPos = useRef(0);
  const xPosInitial = useRef(0);
  const yPosInitial = useRef(0);
  const xMouseInitial = useRef(0);
  const yMouseInitial = useRef(0);

  const [currentCanvasSize, setCurrentCanvasSize] = useState(canvasSize);

  const draw = (ctx, centerImage) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#aaa";
    ctx.fillRect(0, 0, currentCanvasSize.width, currentCanvasSize.height);
    //
    ctx.translate(currentCanvasSize.midH, currentCanvasSize.midV);

    //

    const scalePrevdiff =
      scale.current.prev + 0.3 * (scale.current.now - scale.current.prev);
    scale.current = { ...scale.current, prev: scalePrevdiff };

    ctx.scale(scalePrevdiff, scalePrevdiff);

    //

    const rotatePrevdiff =
      rotate.current.prev + 0.3 * (rotate.current.now - rotate.current.prev);
    rotate.current = { ...rotate.current, prev: rotatePrevdiff };

    ctx.rotate(rotatePrevdiff);

    ctx.drawImage(
      imageRef.current,
      centerImage.x + xPos.current,
      centerImage.y + yPos.current
    );
  };

  const drawOut = () => {
    const canvasOut = canvasRefOut.current;
    const ctxOut = canvasOut.getContext("2d");

    const centerImageOut = {
      x: -0.5 * imageRef.current.width,
      y: -0.5 * imageRef.current.height,
    };

    ctxOut.setTransform(1, 0, 0, 1, 0, 0);
    ctxOut.fillStyle = "#000";
    ctxOut.fillRect(0, 0, widthSend, widthSend);
    const centerCanvas = 0.5 * widthSend;
    ctxOut.translate(centerCanvas, centerCanvas);

    const scaleFit = widthSend / currentCanvasSize.crop.width;
    ctxOut.scale(scale.current.now * scaleFit, scale.current.now * scaleFit);
    ctxOut.rotate(rotate.current.now);

    ctxOut.drawImage(
      imageRef.current,
      centerImageOut.x + xPos.current,
      centerImageOut.y + yPos.current
    );

    const urlData = canvasOut.toDataURL(
      photoUploaderConfig.saveData.format,
      photoUploaderConfig.saveData.quality
    );
    const d = urlData.split("base64,")[1];
    postBase64Image(d);
  };

  useEffect(() => {
    let animationFrameId;

    if (srcBlob && srcBlob.current !== "") {
      const image = new Image();
      image.src = srcBlob.current;

      image.addEventListener("load", function () {
        if (!imageLoaded.current) {
          const scaleFit = Math.min(
            currentCanvasSize.width / image.width,
            currentCanvasSize.height / image.height
          );
          scale.current = { now: scaleFit, prev: scaleFit };
          imageLoaded.current = true;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const centerImage = {
          x: -0.5 * image.width,
          y: -0.5 * image.height,
        };

        imageRef.current = image;

        const render = () => {
          draw(ctx, centerImage);
          animationFrameId = window.requestAnimationFrame(render);
        };
        render();
      });
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, currentCanvasSize, srcBlob]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 992) {
        setCurrentCanvasSize(canvasSizeMobile);
      } else {
        setCurrentCanvasSize(canvasSize);
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="photoUploader_editor">
      <div className="photoUploader_editor-container">
        <div
          className="photoUploader_editor-canvas-container"
          onMouseDown={(e) => {
            xMouseInitial.current = e.pageX;
            yMouseInitial.current = e.pageY;
            xPosInitial.current = xPos.current;
            yPosInitial.current = yPos.current;
            mouseMove.current = true;
          }}
          onMouseMove={(e) => {
            if (mouseMove.current) {
              const newX =
                (e.pageX - xMouseInitial.current) / scale.current.now;

              const newY =
                (e.pageY - yMouseInitial.current) / scale.current.now;
              //
              const rotValue = rotate.current.value % 4;
              switch (rotValue) {
                case 0:
                  xPos.current = xPosInitial.current + newX;
                  yPos.current = yPosInitial.current + newY;
                  break;
                case 1:
                  xPos.current = xPosInitial.current + newY;
                  yPos.current = yPosInitial.current + -1 * newX;
                  break;
                case 2:
                  xPos.current = xPosInitial.current + -1 * newX;
                  yPos.current = yPosInitial.current + -1 * newY;
                  break;
                case 3:
                  xPos.current = xPosInitial.current + -1 * newY;
                  yPos.current = yPosInitial.current + newX;
                  break;
                default:
              }
            }
          }}
          onMouseUp={() => {
            if (mouseMove.current) {
              mouseMove.current = false;
            }
          }}
        >
          <canvas
            width={currentCanvasSize.width}
            height={currentCanvasSize.height}
            ref={canvasRef}
          />
          <div
            className="photoUploader_editor-canvas-mark"
            style={currentCanvasSize.crop.style}
          />
        </div>
        <div className="photoUploader_editor-tool-container">
          <div
            className="photoUploader_editor-back-btn"
            onClick={onBack}
            id={`img_loader-back-${id}`}
          >
            <Icon />
          </div>
          <div className="photoUploader_editor-tool-container-center">
            <div className="photoUploader_editor-tool-box">
              <div
                className="photoUploader_editor-tool-btn"
                onClick={() => {
                  scale.current.now = scale.current.now + 0.05;
                }}
                id={`img_loader-zoomin-${id}`}
              >
                <Icon type="search-plus" />
              </div>
              <div
                className="photoUploader_editor-tool-btn"
                onClick={() => {
                  const newScale = scale.current.now - 0.05;
                  if (newScale >= 0) {
                    scale.current.now = newScale;
                  }
                }}
                id={`img_loader-zoomout-${id}`}
              >
                <Icon type="search-minus" />
              </div>
            </div>
            <div className="photoUploader_editor-tool-box">
              <div
                className="photoUploader_editor-tool-btn"
                onClick={() => {
                  rotate.current.now = rotate.current.now + 0.5 * Math.PI;
                  rotate.current.value = rotate.current.value + 1;
                }}
                id={`img_loader-rotate-${id}`}
              >
                <Icon type="repeat" />
              </div>
            </div>
            <UncontrolledTooltip target={`img_loader-back-${id}`}>
              <I18N id="photoUploader.edit.btn.chooseAnotherImage" />
            </UncontrolledTooltip>
            <UncontrolledTooltip target={`img_loader-zoomin-${id}`}>
              <I18N id="photoUploader.edit.btn.Zoom.In" />
            </UncontrolledTooltip>
            <UncontrolledTooltip target={`img_loader-zoomout-${id}`}>
              <I18N id="photoUploader.edit.btn.Zoom.Out" />
            </UncontrolledTooltip>
            <UncontrolledTooltip target={`img_loader-rotate-${id}`}>
              <I18N id="photoUploader.edit.btn.Rotate" />
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="photoUploader_editor-footer">
        <ErrorAlert errors={errors} className="mb-3" />
        <Button color="link" outline className="me-2 mb-2" onClick={onCancel}>
          <I18N id="btn.Cancel" />
        </Button>
        <Button color="primary" onClick={drawOut} className="mb-2">
          <I18N id="photoUploader.edit.btn.LoadImage" />
        </Button>
      </div>
      <div className="photoUploader_editor-hidden_canvas">
        <canvas width={widthSend} height={widthSend} ref={canvasRefOut} />
      </div>
      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default Editor;
