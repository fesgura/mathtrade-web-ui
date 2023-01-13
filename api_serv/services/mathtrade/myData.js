import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  signInMathTrade: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(
      endpoints.compose("SINGIN_MATHTRADE", [mathTradeId]),
      props.data
    );
  },
  editMemberMathTrade: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.put(
      endpoints.compose("EDIT_MYDATA_MATHTRADE", [mathTradeId, props.userId]),
      props.data
    );
  },
  cancelMemberMathTrade: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(
      endpoints.compose("SIGNOUT_MYDATA_MATHTRADE", [mathTradeId, props.userId])
    );
  },
};

export default services;
