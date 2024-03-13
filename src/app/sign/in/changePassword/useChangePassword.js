import useFetch from "@/hooks/useFetch";
import { setTokenToAPI } from "@/hooks/useFetch/constants/api";
import { useCallback, useState } from "react";

const useChangePassword = (token, old_password) => {
  const [step, setStep] = useState(0);

  const beforeLoad = useCallback(() => {
    setTokenToAPI(token);
  }, [token]);

  const afterLoad = useCallback(() => {
    setStep(1);
  }, []);

  const [changePasswordPublic, , loading, error] = useFetch({
    endpoint: "PUT_PASSWORD",
    method: "PUT",
    beforeLoad,
    afterLoad,
  });

  return {
    step,
    validations: {
      new_password: ["required", "password"],
      new_password2: [
        "required",
        "password",
        (new_password2, formProps) => {
          const { new_password } = formProps;
          return new_password !== new_password2
            ? "validation.passwordNotMatch"
            : null;
        },
      ],
    },
    onSubmit: (data) => {
      changePasswordPublic({
        params: {
          new_password: data.new_password,
          old_password,
        },
      });
    },
    loading,
    error,
  };
};

export default useChangePassword;
