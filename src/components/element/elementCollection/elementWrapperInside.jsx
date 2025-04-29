import clsx from "clsx";

const ElementWrapperInside = ({ children, padded = true, className }) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg border border-gray-400",
        {
          "p-4": padded,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default ElementWrapperInside;
