import useFetch from "@/hooks/useFetch";
import { useCallback, useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import { useStore } from "@/store";

const useMyAccount = () => {
  const updateUser = useStore((state) => state.updateUser);

  /* PAGE CONTEXT **********************************************/
  const { setPageType, userId } = useContext(PageContext);

  useEffect(() => {
    setPageType("myAccount");
  }, [setPageType]);
  /* end PAGE CONTEXT *********************************************/

  /* GET USER ***********************************/
  const [, userData, loadingGetUser, errorGetUser] = useFetch({
    endpoint: "GET_USER",
    autoLoad: true,
  });
  /* end GET USER ***********************************/

  /* PUT USER ***********************************/
  const afterLoad = useCallback(
    (data) => {
      updateUser(data);
    },
    [updateUser]
  );

  const [saveUser, , loadingPutUser, errorPutUser] = useFetch({
    endpoint: "PUT_USER",
    method: "PUT",
    afterLoad,
  });
  /* end PUT USER ***********************************/

  const onSubmit = useCallback(
    (params) => {
      saveUser({ params });
    },
    [saveUser]
  );

  return {
    userData,
    loading: loadingGetUser || loadingPutUser,
    errorGetUser,
    errorPutUser,
    validations: {
      first_name: ["required"],
      last_name: ["required"],
      phone: ["required", "phone"],
    },
    onSubmit,
  };
};

export default useMyAccount;
