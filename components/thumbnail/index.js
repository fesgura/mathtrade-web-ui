import classNames from "classnames";

const Thumbnail = ({ src = "", className, width, height, noRadius }) => {
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
    <div className={classNames("thumbnail", className)}>
      {src ? <img src={src} alt="" /> : <div className="img_placeholder" />}
    </div>
  );
};

export default Thumbnail;
