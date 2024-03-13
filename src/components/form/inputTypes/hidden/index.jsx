import { useEffect, useState } from "react";
const Hidden = ({ name, data }) => {
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    setValueInput((data && data[name]) || "");
  }, [data, name]);
  return <input type="hidden" name={name} value={valueInput} />;
};

export default Hidden;
