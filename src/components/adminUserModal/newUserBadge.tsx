import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
// Circular with ./index, but only used at render time.
import { useAdminUser } from ".";

/** Admins only: a violet "Nuevo" pill for members with no items in other
 *  editions. Renders nothing for everybody else. */
const NewUserBadge = ({
  userId = null,
  className = "",
}: {
  userId?: number | string | null;
  className?: string;
}) => {
  const { isNewUser } = useAdminUser();
  if (!isNewUser(userId)) return null;
  return (
    <span
      title={getI18Ntext("newUser.help")}
      className={clsx(
        "ml-1 inline-block rounded-full bg-violet-100 text-violet-800 text-[10px] font-semibold px-1.5 py-0.5 align-middle whitespace-nowrap",
        className
      )}
    >
      <I18N id="newUser.badge" />
    </span>
  );
};

export default NewUserBadge;
