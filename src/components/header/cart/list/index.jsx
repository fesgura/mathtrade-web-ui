import { useCallback, useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { PRIVATE_ROUTES } from "@/config/routes";
import WantGroup from "./wantGroup";
import Link from "next/link";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";
import clsx from "clsx";

const limit = 7;

const CartList = ({ toggleMobile }) => {
  /* PAGE CONTEXT **********************************************/
  const { myWants, loadingMyWants } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const myWantsReverse = useMemo(() => {
    return [...myWants].reverse();
  }, [myWants]);

  return (
    <div className="relative">
      <div
        className={clsx({
          "min-h-[192px]": loadingMyWants,
        })}
      >
        {myWantsReverse.map((wantGroup, k) => {
          if (k > limit) {
            return null;
          }

          return <WantGroup key={wantGroup?.id || k} wantGroup={wantGroup} />;
        })}
      </div>
      <div className="text-center p-3">
        <Link
          href={PRIVATE_ROUTES.WANTS.path}
          className="text-xs underline text-primary font-bold hover:opacity-60"
          onClick={toggleMobile}
        >
          <I18N id="wants.SeeAll" />
        </Link>
      </div>
      <LoadingBox min loading={loadingMyWants} />
    </div>
  );
};

export default CartList;
