import Link from "next/link";
import Icon from "@/components/icon";
import clsx from "clsx";

const HeadButton = ({
  onClick,
  icon,
  num,
  href,
  forWants,
  buttonRef,
  onMouseEnter,
}) => {
  return href ? (
    <Link
      href={href}
      className="relative cursor-pointer peer block w-9 h-9 leading-9 text-xl text-center text-white"
      onMouseEnter={onMouseEnter}
    >
      <Icon type={icon} />
    </Link>
  ) : (
    <button
      className="relative cursor-pointer peer block w-9 h-9 text-xl text-center text-white"
      onClick={onClick}
      ref={buttonRef || null}
      onMouseEnter={onMouseEnter}
    >
      <Icon type={icon} />
      {num ? (
        <div
          className={clsx(
            "absolute font-bold text-[9px] leading-[16px] h-[16px] w-[16px] rounded-full top-1 right-0",
            {
              "bg-primary": !forWants,
              "bg-want": forWants,
            }
          )}
        >
          {num}
        </div>
      ) : null}
    </button>
  );
};

export default HeadButton;
