import clsx from "clsx";

const Container = ({ children, size = "lg", maxWidth }) => {
  return (
    <div
      className={clsx("relative px-2 mx-auto", {
        container: size === "lg",
        "max-w-4xl": size === "md",
      })}
      style={maxWidth ? { maxWidth } : null}
    >
      {children}
    </div>
  );
};

export default Container;
