import clsx from "clsx";

const Wrapper = ({ children, className, tag = "div" }) => {
  const VariableTag = tag;
  return (
    <VariableTag
      className={clsx(
        "wrapper",

        className
      )}
    >
      <div className="px-3">{children}</div>
    </VariableTag>
  );
};

export default Wrapper;
