import { useCallback, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

const useVotacion = () => {
  const [value, setValue] = useState(null);
  const [voted, setVoted] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const format = useCallback((options) => {
    if (!options || !options.length) {
      return [];
    }
    const voted =
      typeof options[0].voted !== "undefined" ? options[0].voted : true;
    setDisabled(voted);
    setVoted(voted);
    return options;
  }, []);

  const [, optList, loadingGet, errorGet] = useFetch({
    endpoint: "GET_VOTACION",
    initialState: [],
    autoLoad: true,
    format,
  });
  /* end FETCH */

  ////////////////////////
  const [showSuccess, setShowSuccess] = useState(false);

  const afterLoad = useCallback(() => {
    setShowSuccess(true);
    setDisabled(true);
  }, []);

  useEffect(() => {
    let timer = null;

    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showSuccess]);

  const [postVote, , loadingPost, errorPost] = useFetch({
    endpoint: "POST_VOTACION",
    method: "POST",
    afterLoad,
  });

  const submit = useCallback(() => {
    postVote({ params: { question: value } });
  }, [postVote, value]);

  return {
    voted,
    disabled: disabled || voted,
    disabledBtn: disabled || voted || !value,
    value,
    setValue,
    optList,
    loading: loadingGet || loadingPost,
    error: errorGet || errorPost,
    submit,
    showSuccess,
  };
};

export default useVotacion;
