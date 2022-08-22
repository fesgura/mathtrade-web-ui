import classNames from "classnames";

const Picture = ({ className, src, width }) => {
  return (
    <div className={classNames("picture", className)} style={{ width }}>
      {src ? <img src={src} alt="" /> : <div className="img_placeholder" />}
    </div>
  );
};

export default Picture;
