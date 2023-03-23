import { UncontrolledTooltip } from "reactstrap";
import { useCallback, useEffect, useId, useState } from "react";
import I18N from "i18n";
import Icon from "components/icon";
import { useApi, MathTradeService } from "api_serv";

const twoPointsReg = new RegExp(":", "g");

const QuickIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 71 65"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
    >
      <g>
        <path
          d="M65.011,12.774c2.24,2.89 3.36,6.63 3.36,11.221c0,5.43 -2.8,10.958 -8.401,16.585l-22.856,22.114c-0.44,0.442 -0.978,0.663 -1.614,0.663c-0.636,0 -1.174,-0.221 -1.614,-0.663l-11.174,-10.83l8.465,-7.704c0,0 17.222,2.267 17.222,2.267c2.264,0.298 4.435,-1.007 5.233,-3.147l11.379,-30.506Zm-54.933,26.87c-0.031,-0.031 -0.062,-0.063 -0.094,-0.096c-0.428,-0.442 -1.106,-1.247 -2.036,-2.414c-0.929,-1.167 -1.761,-2.365 -2.494,-3.593c-0.734,-1.229 -1.388,-2.716 -1.963,-4.46c-0.575,-1.745 -0.862,-3.44 -0.862,-5.086c-0,-5.406 1.553,-9.632 4.659,-12.679c3.106,-3.047 7.398,-4.57 12.877,-4.57c1.516,-0 3.063,0.264 4.641,0.792c1.577,0.529 3.045,1.241 4.402,2.138c1.358,0.897 2.525,1.738 3.504,2.525c0.978,0.786 1.908,1.621 2.788,2.506c0.88,-0.885 1.81,-1.72 2.788,-2.506c0.978,-0.787 2.146,-1.628 3.504,-2.525c1.357,-0.897 2.825,-1.609 4.402,-2.138c1.578,-0.528 3.125,-0.792 4.641,-0.792c0.484,-0 0.959,0.012 1.424,0.036l-14.419,15.294c-0,-0 -12.593,-2.811 -12.593,-2.811c-2.133,-0.476 -4.323,0.517 -5.371,2.435l-9.798,17.944Zm33.116,-16.102l-3.215,3.41l0.044,0.01l3.171,-3.42Z"
          style={{
            fillRule: "nonzero",
            fillOpacity: 0.5,
          }}
        />
        <path
          d="M2.629,63.515l21.55,-39.466l15.314,3.419l24.497,-25.983l-14.951,40.082l-19.478,-2.564l-26.932,24.512Z"
          style={{
            fillRule: "nonzero",
          }}
        />
      </g>
    </svg>
  );
};

const WantQuick = ({ objectToWant, type, afterAnyChange }) => {
  const id = useId("bq").replace(twoPointsReg, "");
  const [disabled, setDisabled] = useState(false);

  /* API *****************************/

  const [postWant, , loading, errors] = useApi({
    promise: MathTradeService.postWant,
    afterLoad: () => {
      afterAnyChange();
    },
  });
  /*********************************/

  const onPostWant = useCallback(() => {
    let name = "";
    let bgg_id = null;
    let want_ids = [];

    if (type === "item") {
      name = objectToWant.title;
      want_ids.push(objectToWant.id);
    }
    if (type === "game") {
      bgg_id = objectToWant.bgg_id;
      name = objectToWant.name;
      want_ids = objectToWant.items.map((item) => {
        return item.id;
      });
    }

    setDisabled(true);

    postWant({
      data: {
        name,
        bgg_id,
        want_ids,
        item_ids: [],
      },
    });
  }, [objectToWant, type]);

  useEffect(() => {
    if (errors) {
      setDisabled(false);
    }
  }, [errors]);

  return (
    <>
      <button
        className="btn btn_quick"
        id={`tt-btnq-circle-q-${id}`}
        onClick={onPostWant}
        disabled={disabled}
      >
        {loading ? <Icon type="loading" /> : <QuickIcon />}
      </button>
      <UncontrolledTooltip
        //placement="right"
        target={`tt-btnq-circle-q-${id}`}
      >
        <I18N id="wantEditor.btn.IwantItQuick" />
      </UncontrolledTooltip>
    </>
  );
};

export default WantQuick;
