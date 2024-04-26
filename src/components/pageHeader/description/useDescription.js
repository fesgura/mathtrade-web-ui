import { useCallback, useEffect, useState } from "react";
import { useOptions } from "@/store";

const useDescription = (name) => {
  /* OPTIONS */
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  /* end OPTIONS */

  const [invisible, setInvisible] = useState(
    options[`description_${name}_invisible`] || false
  );

  const toggleInvisible = useCallback(() => {
    setInvisible((v) => !v);
  }, []);

  useEffect(() => {
    if (name) {
      updateOptions({
        [`description_${name}_invisible`]: invisible,
      });
    }
  }, [updateOptions, name, invisible]);

  return { invisible, toggleInvisible };
};
export default useDescription;
