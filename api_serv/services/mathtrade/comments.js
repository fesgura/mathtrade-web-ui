import { api, setAuth, getMathtradeId } from "../../utils";
import endpoints from "../../utils/endpoints";

const services = {
  getComments: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.get(
      endpoints.compose("GET_COMMENTS", [mathTradeId, props.item_id])
    );
  },
  postComment: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.post(
      endpoints.compose("POST_COMMENT", [mathTradeId, props.item_id]),
      props.data
    );
  },
  putComment: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.put(
      endpoints.compose("PUT_COMMENT", [
        mathTradeId,
        props.item_id,
        props.comment_id,
      ]),
      props.data
    );
  },
  deleteComment: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.delete(
      endpoints.compose("PUT_COMMENT", [
        mathTradeId,
        props.item_id,
        props.comment_id,
      ])
    );
  },
  voteComment: (props) => {
    setAuth();
    const mathTradeId = getMathtradeId();
    return api.put(
      endpoints.compose("PUT_COMMENT", [
        mathTradeId,
        props.item_id,
        props.comment_id,
      ]),
      { vote: props.vote }
    );
  },

  //
};

export default services;
