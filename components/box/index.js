const { default: classNames } = require("classnames");

const Box = ({ color = "", className, children }) => {
  return (
    <div className={classNames("box", `bg-${color}`, className)}>
      {children}
    </div>
  );
};
export default Box;
