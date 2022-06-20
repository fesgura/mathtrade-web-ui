const dicc = {
  bgg: true,
  telegram: true,
};

const Icon = ({ type = "times", className }) => {
  return (
    <i
      className={`icon ${dicc[type] ? "icomoon-" : "fa fa-"}${type} ${
        className || ""
      }`}
      aria-hidden="true"
    />
  );
};
export default Icon;
