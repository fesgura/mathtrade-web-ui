import Link from "next/link";
import { privateRoutes } from "config/routes";

const LinkInternal = ({ path, mathtrade = false, children, className }) => {
  const href = mathtrade
    ? privateRoutes.mathtrade[path].path || ""
    : privateRoutes[path].path || "";

  return (
    <Link href={`/${href}`}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default LinkInternal;
