import { useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import Logo from "components/logo";
import { privateRoutes } from "config/routes";
import { IamInMathtrade } from "utils";
import Link from "next/link";
import CancelInviteMT from "./cancel";

const InviteRegisterMT = ({ className }) => {
  const [mathtradeName, set_mathtradeName] = useState("");
  const [visible, set_visible] = useState(false);

  useEffect(() => {
    const mathtradeData = IamInMathtrade();

    if (mathtradeData.mathtrade && !mathtradeData.IamIn) {
      set_mathtradeName(mathtradeData.mathtrade.name || "");
      set_visible(!mathtradeData.cancelInviteMT);
    }
  }, []);

  return (
    <div className={classNames("invite", className, { visible })}>
      <div
        className="invite-close"
        title="Cerrar"
        onClick={() => {
          set_visible(false);
        }}
      >
        <Icon />
      </div>
      <div className="invite-container text-center">
        <Logo type="vertical" className="mb-5" />
        <h3 className="mb-3">
          ¡Ya arrancó el Math Trade Argentina {mathtradeName}!
        </h3>
        <p>Inscribite para participar aquí:</p>
        <p>
          <Link
            href={`/${
              privateRoutes.mathTradeDisabled.path +
              privateRoutes.mathTradeDisabled.myData.path
            }`}
          >
            <a className="btn btn-secondary btn-lg">
              <Icon type="star" className="me-2" />
              Participar
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
  );
};

export default InviteRegisterMT;
