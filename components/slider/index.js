import classNames from "classnames";
import { useState, useEffect } from "react";

const Slider = ({ images = [], ...rest }) => {
  const [current, set_current] = useState(0);
  const [prev, set_prev] = useState(images.length - 1);

  useEffect(() => {
    let Timer = setInterval(() => {
      set_prev((v) => {
        let c = v + 1;
        if (c >= images.length) {
          return 0;
        }
        return c;
      });
      set_current((v) => {
        let c = v + 1;
        if (c >= images.length) {
          return 0;
        }
        return c;
      });
    }, 7000);

    return () => {
      clearInterval(Timer);
    };
  }, [images]);

  return images.length ? (
    <div className="slider-fade" {...rest}>
      {images.map((img, k) => {
        return (
          <div
            className={classNames("slider-fade-item", {
              current: k === current,
              prev: k === prev,
            })}
            key={k}
            style={{
              backgroundImage: `url(${img.src.src})`,
            }}
          />
        );
      })}
    </div>
  ) : null;
};

export default Slider;
