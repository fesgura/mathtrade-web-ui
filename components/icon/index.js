const Icon = ({ type = "times", className }) => {
  return (
    <i className={`icon fa fa-${type} ${className || ""}`} aria-hidden="true" />
  );
};
export default Icon;
