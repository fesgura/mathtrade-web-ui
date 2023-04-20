import addToMTsrc from "assets/img/icons/addToMT.svg";
import quitFromMTsrc from "assets/img/icons/quitFromMT.svg";
import { ReactSVG } from "react-svg";

const dicc = {
  // FA
  loading: {
    prefix: "fa fa-",
    value: "refresh fa-spin fa-fw",
  },
  iwantit: {
    prefix: "fa fa-",
    value: "heart",
  },
  inmywantlist: {
    prefix: "fa fa-",
    value: "heart",
  },
  ban: {
    prefix: "fa fa-",
    value: "trash",
  },
  // icomoon
  bgg: {
    prefix: "icomoon-",
    value: "bgg",
  },
  telegram: {
    prefix: "icomoon-",
    value: "telegram",
  },
  // mt
  "yo-ofrezco": {
    prefix: "mt-icon-",
    value: "yo-ofrezco",
  },
  "otros-ofrecen": {
    prefix: "mt-icon-",
    value: "otros-ofrecen",
  },
};

//class="mt-icon-otros-ofrecen"

const diccSVG = {
  addToMT: <ReactSVG src={addToMTsrc.src} />,
  quitFromMT: <ReactSVG src={quitFromMTsrc.src} />,
};

const Icon = ({ type = "times", className }) => {
  return (
    diccSVG[type] || (
      <i
        className={`icon ${
          dicc[type] ? dicc[type].prefix + dicc[type].value : "fa fa-" + type
        } ${className || ""}`}
        aria-hidden="true"
      />
    )
  );
};
export default Icon;
