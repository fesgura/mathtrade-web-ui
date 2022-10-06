const { default: classNames } = require("classnames");

const Box = ({ color = "", className, minimal, children }) => {
  return (
    <div className={classNames("box", `bg-${color}`, { minimal }, className)}>
      {children}
    </div>
  );
};
export default Box;
