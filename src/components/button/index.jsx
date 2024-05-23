import { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import Link from "next/link";

const Button = ({
  tag = "button",
  type = "submit",
  color = "primary",
  block,
  sm,
  lg,
  children,
  className,
  href = "",
  target,
  outline,
  ariaLabel,
  disabled,
  onClick,
}) => {
  const colorBtn = disabled ? "cancel" : color;

  const cl = clsx(
    "rounded-full outline-none transition-colors transition-opacity",
    {
      sm,
      "inline-block": !block,
      "w-auto": !block,
      block,
      "w-[100%]": block,
      //
    },
    outline ? "" : `bg-${colorBtn}`,
    outline ? `text-${colorBtn}` : "text-white",
    outline ? `border border-${colorBtn}` : "",
    disabled
      ? ""
      : outline
      ? `hover:bg-${colorBtn} hover:text-white`
      : "hover:opacity-75",
    sm
      ? "px-5 py-[2px] text-sm"
      : lg
      ? "px-10 py-3 text-xl"
      : "px-7 py-3 text-lg",
    className
  );

  const content = {
    button: (
      <button
        type={type}
        className={cl}
        aria-label={ariaLabel ? getI18Ntext(ariaLabel) : null}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    ),
    link: (
      <Link
        href={href}
        role="button"
        className={cl}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : null}
        aria-label={ariaLabel ? getI18Ntext(ariaLabel) : null}
        disabled={disabled}
      >
        {children}
      </Link>
    ),
    a: (
      <a
        href={href}
        role="button"
        className={cl}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : null}
        aria-label={ariaLabel ? getI18Ntext(ariaLabel) : null}
        disabled={disabled}
      >
        {children}
      </a>
    ),
  };

  return content[tag] || children;
};

export default Button;
