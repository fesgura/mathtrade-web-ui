import Link from "next/link";
import { privateRoutes } from "config/routes";

const LinkInternal = ({ path, children, className }) => {
  const href = privateRoutes[path] ? privateRoutes[path].path : path;
  return (
    <Link href={`/${href}`}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default LinkInternal;
