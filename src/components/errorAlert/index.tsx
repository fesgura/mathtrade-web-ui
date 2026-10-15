import I18N from "@/i18n";
import clsx from "clsx";
import { resolveApiErrorMessage } from "@/utils/apiError";
import { useStore } from "@/store";
import { getNewUserOfferLimit } from "@/config/newUserOfferLimit";

// Error texts that need a number filled in.
const useErrorValues = (id: string): (string | number)[] => {
  const membership = useStore((state) => state.data?.membership);
  if (id === "error.item.newUserLimit") {
    return [getNewUserOfferLimit(membership)];
  }
  return [];
};

const ErrorAlert = ({
  error = null,
  errorMessage = "",
  className = "",
}: {
  error?: any;
  errorMessage?: string;
  className?: string;
}) => {
  const id = !error
    ? ""
    : errorMessage
    ? errorMessage
    : typeof error === "string"
    ? error
    : resolveApiErrorMessage(error) || "error.General";
  const values = useErrorValues(id);

  return error ? (
    <div
      className={clsx(
        "animate-fadein bg-danger text-white text-sm p-3 mb-3 rounded-md text-center",
        className
      )}
    >
      <I18N id={id} values={values} />
    </div>
  ) : null;
};

export default ErrorAlert;
