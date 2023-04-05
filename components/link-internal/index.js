import Link from "next/link";
import { privateRoutes } from "config/routes";
import Icon from "components/icon";

const LinkInternal = ({
  hrefPrecise,
  blank,
  path,
  mathtrade = false,
  children,
  className,
  withIcon,
  onClick,
}) => {
  const href =
    hrefPrecise ||
    (mathtrade
      ? privateRoutes.mathtrade[path].path || ""
      : privateRoutes[path].path || "");

  const icon = mathtrade
    ? privateRoutes.mathtrade[path].icon || ""
    : privateRoutes[path]?.icon || "";

  return blank ? (
    <Link href={`/${href}`} passHref>
      <a
        className={className}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {withIcon && icon ? <Icon type={icon} className="me-2" /> : null}
        {children}
      </a>
    </Link>
  ) : (
    <Link href={`/${href}`}>
      <a className={className} onClick={onClick}>
        {withIcon && icon ? <Icon type={icon} className="me-2" /> : null}
        {children}
      </a>
    </Link>
  );
};

export default LinkInternal;
