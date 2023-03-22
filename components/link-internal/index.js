import Link from "next/link";
import { privateRoutes } from "config/routes";
import Icon from "components/icon";

const LinkInternal = ({
  path,
  mathtrade = false,
  children,
  className,
  withIcon,
}) => {
  const href = mathtrade
    ? privateRoutes.mathtrade[path].path || ""
    : privateRoutes[path].path || "";

  const icon = mathtrade
    ? privateRoutes.mathtrade[path].icon || ""
    : privateRoutes[path].icon || "";

  return (
    <Link href={`/${href}`}>
      <a className={className}>
        {withIcon && icon ? <Icon type={icon} className="me-2" /> : null}
        {children}
      </a>
    </Link>
  );
};

export default LinkInternal;
