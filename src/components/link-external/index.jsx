import { getI18Ntext } from "@/i18n";

const LinkExternal = ({ href, children, tooltip }) => {
  return href ? (
    <a
      href={href}
      className="hover:text-bgg hover:underline"
      target="_blank"
      rel="nofollow noopener"
      data-tooltip={tooltip ? getI18Ntext(tooltip) : null}
    >
      {children}
    </a>
  ) : (
    children
  );
};
export default LinkExternal;
