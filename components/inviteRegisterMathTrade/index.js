import { useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import Logo from "components/logo";
import storage from "utils/storage";
import Link from "next/link";
import CancelInviteMT from "./cancel";
import { useSelector } from "react-redux";
import { selectStoreData } from "store/slices/storeData";

const InviteRegisterMT = ({ className }) => {
  const [mathtradeName, set_mathtradeName] = useState("");
  const [visible, set_visible] = useState(false);
  const storeData = useSelector(selectStoreData);

  useEffect(() => {
    if (storeData && storeData.mathtrade && !storeData.mathtrade.IamIn) {
      set_mathtradeName(storeData?.mathtrade?.data.name || "");

      const cancelInviteMT = storage.getFromOptions("cancelInviteMT");

      set_visible(!cancelInviteMT);
    }
  }, [storeData]);

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
          <Link href={`/mathtrade/my-data`}>
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
