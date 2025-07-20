import { useState, useCallback, useEffect } from "react";
import fetchBGG from "@/hooks/useFetchBGG/fetchBGG";
import useFetch from "@/hooks/useFetch";

const useSignUp = () => {
  const [dataInitial, setDataInitial] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorBGG, setErrorBGG] = useState(false);
  const [isSuccess, set_isSuccess] = useState(false);

  const afterLoad = useCallback(() => {
    setLoading(false);
    set_isSuccess(true);
  }, []);
  const afterError = useCallback(() => {
    setLoading(false);
  }, []);

  const [createUser, , , errorRegister] = useFetch({
    endpoint: "POST_USER",
    method: "POST",
    afterLoad,
    afterError,
  });

  const onSubmit = useCallback(
    async (data) => {
      setErrorBGG(false);
      setLoading(true);

      let avatar = "";

      const [, responseBGG, bggData] = await fetchBGG("USER", {
        name: data.bgg_user,
      });

      if (!responseBGG.ok) {
        setErrorBGG(true);
        setLoading(false);
        return;
      }

      if (!bggData?.user?.id) {
        setErrorBGG(true);
        setLoading(false);
        return;
      }

      avatar = bggData?.user?.avatarlink?.value || "";

      createUser({
        params: {
          ...data,
          avatar,
        },
      });
    },
    [createUser]
  );

  useEffect(() => {
    let params = new URLSearchParams(
      decodeURIComponent(window.location.search)
    );
    const referral_code = params.get("code") ?? "";
    const email = params.get("referred") ?? "";
    setDataInitial({ referral_code, email });
  }, []);

  return {
    validations: {
      referral_code: ["required"],
      email: ["required", "email"],
      first_name: ["required"],
      last_name: ["required"],
      phone: ["required", "phone"],
      bgg_user: ["required"],
      terms_acceptance: ["required"],
    },
    formatTypes: {
      terms_acceptance: "boolean",
    },
    onSubmit,
    loading,
    errorRegister,
    errorBGG: errorBGG ? "form.BGGuser.error" : null,
    isSuccess,
    dataInitial,
  };
};

export default useSignUp;