import { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";

const useChangePassword = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((v) => !v);

  const [showSuccess, setShowSuccess] = useState(false);

  const validations = useMemo(() => {
    return {
      old_password: ["required", "password"],
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
    };
  }, []);

  const afterLoad = useCallback(() => {
    setShowSuccess(true);
  }, []);

  const [changePassword, , loading, error] = useFetch({
    endpoint: "PUT_PASSWORD",
    method: "PUT",
    afterLoad,
  });

  const onSubmit = useCallback(
    (data) => {
      changePassword({
        params: {
          new_password: data.new_password,
          old_password: data.old_password,
        },
      });
    },
    [changePassword]
  );

  useEffect(() => {
    let timer = null;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
        setOpen(false);
      }, 1100);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showSuccess]);

  return {
    open,
    toggleOpen,
    validations,
    onSubmit,
    loading,
    error,
    showSuccess,
  };
};

export default useChangePassword;
