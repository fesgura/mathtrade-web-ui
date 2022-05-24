import logoSrc from "assets/img/logo.png";
import classNames from "classnames";

const Logo = ({ type = "times", className }) => {
  return (
    <div className={classNames("main-logo", className)}>
      <img src={logoSrc} alt="" />
    </div>
  );
};
export default Logo;
