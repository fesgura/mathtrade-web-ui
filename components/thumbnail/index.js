import classNames from "classnames";

const Thumbnail = ({ src = "", className }) => {
  return (
    <div className={classNames("thumbnail", className)}>
      {src ? <img src={src} alt="" /> : <div className="img_placeholder" />}
    </div>
  );
};

export default Thumbnail;
