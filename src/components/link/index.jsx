import Link from "next/link";

const Alink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="text-primary underline hover:text-primary-hover"
    >
      {children}
    </Link>
  );
};

export default Alink;
