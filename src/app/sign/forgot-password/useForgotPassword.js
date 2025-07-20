import { useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";

const useForgotPassword = () => {
  const [step, setStep] = useState(0);

  const afterLoad = useCallback(() => {
    setStep(1);
  }, []);

  const [forgotPassword, , loadingRecover, errorRecover] = useFetch({
    endpoint: "FORGOT_PASSWORD",
    method: "POST",
    afterLoad,
  });

  const onSubmit = useCallback(
    (data) => {
      forgotPassword({
        params: {
          ...data,
        },
      });
    },
    [forgotPassword]
  );

  return {
    step,
    validations: {
      target: ["required", "email"],
    },
    onSubmit,
    loading: loadingRecover,
    error: errorRecover,
  };
};

export default useForgotPassword;