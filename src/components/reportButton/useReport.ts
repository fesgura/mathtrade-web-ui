import { useState, useCallback, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const useReport = (id: number | string | null = null) => {
  const [showModal, setShowModal] = useState(false);

  const onOpen = useCallback(() => {
    setShowModal(true);
  }, []);
  const onClose = useCallback(() => {
    setShowModal(false);
  }, []);

  /*****************************/
  const [showSuccess, setShowSuccess] = useState(false);
  // The backend added the text to an open report of this copy instead of
  // creating a new one (POST reports/ answers `merged: true`).
  const [merged, setMerged] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
        setShowModal(false);
      }, merged ? 4000 : 1600);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showSuccess, merged]);

  const afterLoad = useCallback((data: { merged?: boolean } | null) => {
    setMerged(Boolean(data?.merged));
    setShowSuccess(true);
  }, []);

  // No afterError: a failed POST must not show the success message.
  // useFetch exposes the API error, which the modal renders instead.
  const [createReport, , loading, error] = useFetch({
    endpoint: "POST_REPORT",
    method: "POST",
    afterLoad,
  });

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
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
    merged,
    error,
  };
};

export default useReport;
