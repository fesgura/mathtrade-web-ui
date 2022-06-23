const dicc = {
  bgg: true,
  telegram: true,
};

const diccFa = {
  loading: "refresh fa-spin fa-fw",
};

const Icon = ({ type = "times", className }) => {
  return (
    <i
      className={`icon ${dicc[type] ? "icomoon-" : "fa fa-"}${
        diccFa[type] ? diccFa[type] : type
      } ${className || ""}`}
      aria-hidden="true"
    />
  );
};
export default Icon;
