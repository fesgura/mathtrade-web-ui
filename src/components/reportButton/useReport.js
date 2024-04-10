import { useState, useCallback, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const useReport = (id) => {
  const [showModal, setShowModal] = useState(false);

  const onOpen = useCallback(() => {
    setShowModal(true);
  }, []);
  const onClose = useCallback(() => {
    setShowModal(false);
  }, []);

  /*****************************/
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let timer = null;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
        setShowModal(false);
      }, 1600);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showSuccess]);

  const afterLoad = useCallback(() => {
    setShowSuccess(true);
  }, []);

  const [createReport, , loading] = useFetch({
    endpoint: "POST_REPORT",
    method: "POST",
    afterLoad,
    afterError: afterLoad,
  });

  const onSubmit = useCallback(
    (data) => {
      const params = {
        ...data,
        item: id,
      };
      createReport({ params });
    },
    [createReport, id]
  );

  return {
    showModal,
    onOpen,
    onClose,
    validations: {
      comment: ["required"],
    },
    onSubmit,
    loading,
    showSuccess,
  };
};

export default useReport;
