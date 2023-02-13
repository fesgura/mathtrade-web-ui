import addToMTsrc from "assets/img/icons/addToMT.svg";
import quitFromMTsrc from "assets/img/icons/quitFromMT.svg";
import { ReactSVG } from "react-svg";

const dicc = {
  bgg: true,
  telegram: true,
};

const diccFa = {
  loading: "refresh fa-spin fa-fw",
  iwantit: "heart",
  inmywantlist: "heart",
};

const diccSVG = {
  addToMT: <ReactSVG src={addToMTsrc.src} />,
  quitFromMT: <ReactSVG src={quitFromMTsrc.src} />,
};

const Icon = ({ type = "times", className }) => {
  return (
    diccSVG[type] || (
      <i
        className={`icon ${dicc[type] ? "icomoon-" : "fa fa-"}${
          diccFa[type] ? diccFa[type] : type
        } ${className || ""}`}
        aria-hidden="true"
      />
    )
  );
};
export default Icon;
