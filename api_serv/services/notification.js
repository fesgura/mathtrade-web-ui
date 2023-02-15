import { api, setAuth } from "api_serv/utils";
import endpoints from "api_serv/utils/endpoints";

const services = {
  listNotifications: (props) => {
    setAuth();
    return api.get(endpoints.GET_NOTIFICATIONS, props?.query);
  },
  putNotificationRead: (props) => {
    setAuth();
    return api.put(
      endpoints.compose("PUT_NOTIFICATIONS", [props.id]),
      props.data
    );
  },
  //
};

export default services;
