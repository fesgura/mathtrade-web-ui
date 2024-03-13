import { useContext } from "react";
import FormContext from "@/components/form/form/context";

const useInputContainer = (validateName, errorMessageFromForcedError) => {
  const { errors } = useContext(FormContext);
  if (errorMessageFromForcedError)
    return { errorMessage: errorMessageFromForcedError };
  if (!validateName) return { errorMessage: null };
  const errorMessage =
    errors && errors[validateName] ? errors[validateName] : null;
  return { errorMessage };
};

export default useInputContainer;
