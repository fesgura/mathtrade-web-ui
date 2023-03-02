import { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import CanvasMultiple from "./multiple";

const Thumbnail = ({
  src = "",
  className,
  width,
  height,
  noRadius,
  quad,
  isMultiple,
}) => {
  const [sizing, setSizing] = useState("horizontal");
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const prop = imageRef.current.width / imageRef.current.height;
      if (prop < 1) {
        setSizing("vertical");
      } else {
        setSizing("horizontal");
      }
    }
  }, [imageRef]);

  let style = null;
  if (width || noRadius || height) {
    style = {};
    if (width) {
      style.width = width;
    }
    if (height) {
      style.height = height;
    }
    if (noRadius) {
      style.borderRadius = 0;
    }
  }

  return (
    <div
      className={classNames("thumbnail", className, { quad }, sizing)}
      style={style}
    >
      {quad ? <div className="thumbnail-filler" /> : null}

      {isMultiple ? (
        <CanvasMultiple list={src} />
      ) : (
        <>
          {src && src !== "none" ? (
            <img src={src} alt="" ref={imageRef} />
          ) : (
            <div className="img_placeholder" />
          )}
        </>
      )}
    </div>
  );
};

export default Thumbnail;
