import { useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import Logo from "components/logo";
import storage from "utils/storage";
import Link from "next/link";
import CancelInviteMT from "./cancel";
import I18N from "i18n";
import useCanEdit from "hooks/useCanEdit";

const InviteRegisterMT = ({ className }) => {
  const canEditList = useCanEdit("list");
  const [mathtradeName, set_mathtradeName] = useState("");
  const [visible, set_visible] = useState(false);

  useEffect(() => {
    const storeData = storage.get();
    if (storeData && storeData.mathtrade && !storeData.mathtrade.IamIn) {
      set_mathtradeName(storeData?.mathtrade?.data.name || "");

      const cancelInviteMT = storage.getFromOptions("cancelInviteMT");

      set_visible(!cancelInviteMT);
    }
  }, []);

  return canEditList ? (
    <div className={classNames("invite", className, { visible })}>
      <div
        className="invite-close"
        onClick={() => {
          set_visible(false);
        }}
      >
        <Icon />
      </div>
      <div className="invite-container text-center">
        <Logo type="vertical" className="mb-5" />
        <h3 className="mb-3">
          <I18N id="inviteToMathTrade.lead" /> {mathtradeName}!
        </h3>
        <p>
          <I18N id="inviteToMathTrade.lead2" />
        </p>
        <p>
          <Link href={`/mathtrade/my-data`}>
            <a className="btn btn-secondary btn-lg">
              <Icon type="star" className="me-2" />
              <I18N id="inviteToMathTrade.btn.Participate" />
            </a>
          </Link>
        </p>
        <div className="text-center">
          <CancelInviteMT
            onClick={() => {
              set_visible(false);
            }}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default InviteRegisterMT;
