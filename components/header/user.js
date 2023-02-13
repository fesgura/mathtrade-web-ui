import { useId } from "react";
import UserAvatar from "components/avatar";
import Link from "next/link";
import { linkUserAccount } from "config/routes";
import I18N from "i18n";
import { UncontrolledTooltip } from "reactstrap";

const twoPointsReg = new RegExp(":", "g");

const UserHeader = () => {
  const id = useId("user").replace(twoPointsReg, "");

  return (
    <>
      <Link href={`/${linkUserAccount.path}`}>
        <a className="main-user" id={`tt-user-${id}`}>
          <UserAvatar className="pointer" size="auto" />
        </a>
      </Link>
      <UncontrolledTooltip target={`tt-user-${id}`}>
        <I18N id={linkUserAccount.title} />
      </UncontrolledTooltip>
    </>
  );
};
export default UserHeader;
