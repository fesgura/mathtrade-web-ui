import { useCallback, useState } from "react";

const useItemComments = ({ itemId }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleShowComments = useCallback(() => {
    setShowComments((v) => !v);
  }, []);

  return { showComments, toggleShowComments, list: [] };
};

export default useItemComments;
