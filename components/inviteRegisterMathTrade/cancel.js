import { useCallback } from "react";
import Link from "next/link";
import storage from "utils/storage";
import I18N from "i18n";

const textLink = <I18N id="inviteToMathTrade.btn.NoThanks" />;

const CancelInviteMT = ({ path, onClick = () => {} }) => {
  const onCancelInviteMT = useCallback(() => {
    storage.setToOptions({
      cancelInviteMT: true,
    });
    onClick();
  }, [onClick]);

  return path ? (
    <Link href={path}>
      <a onClick={onCancelInviteMT} className="cancel-invite-mt">
        {textLink}
      </a>
    </Link>
  ) : (
    <a
      href="#"
      className="cancel-invite-mt"
      onClick={(e) => {
        e.preventDefault();
        onCancelInviteMT();
      }}
    >
      {textLink}
    </a>
  );
};

export default CancelInviteMT;
