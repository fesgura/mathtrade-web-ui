import classNames from "classnames";

const Thumbnail = ({ src = "", className, width, noRadius }) => {
  let style = null;
  if (width || noRadius) {
    style = {};
    if (width) {
      style.width = width;
    }
    if (noRadius) {
      style.borderRadius = 0;
    }
  }

  return (
    <div className={classNames("thumbnail", className)} style={style}>
      {src ? (
        <img src={src} alt="" style={style} />
      ) : (
        <div className="img_placeholder" style={style} />
      )}
    </div>
  );
};

export default Thumbnail;
