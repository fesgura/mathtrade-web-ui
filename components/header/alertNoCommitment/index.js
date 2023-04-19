import I18N from "i18n";
import { useApi, MathTradeService } from "api_serv";
import { Alert } from "reactstrap";
import LinkInternal from "components/link-internal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import storage from "utils/storage";
import { toggleAlertNoCommitment } from "utils";
import useCanEdit from "hooks/useCanEdit";

const AlertNoCommitmentView = () => {
  const router = useRouter();

  const [isMyWants, setIsMyWants] = useState(false);

  const [getUser] = useApi({
    promise: MathTradeService.getMathTradeUser,
    // initialState: [],
    afterLoad: (data) => {
      if (typeof data.commitment !== "undefined") {
        toggleAlertNoCommitment(!data.commitment);
      } else {
        toggleAlertNoCommitment(false);
      }
    },
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      const isMyWantsPage = router.pathname.indexOf("my-wants") > 0;
      setIsMyWants(isMyWantsPage);

      if (!isMyWantsPage) {
        const storeData = storage.get();
        getUser({ userId: storeData?.user?.data?.id });
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  // active:
  return (
    <div className="alert-no-commitment">
      <Alert color="danger">
        <I18N id={`AlertNoCommitment${isMyWants ? ".myWants" : ""}`} />

        {isMyWants ? null : (
          <LinkInternal
            path="myWants"
            withIcon
            mathtrade
            className="commint-no"
          >
            <I18N id="title.MyWants" />
          </LinkInternal>
        )}
      </Alert>
    </div>
  );
};

const AlertNoCommitment = () => {
  const canEditList = useCanEdit("list");
  const canViewResults = useCanEdit("results");

  if (canEditList || canViewResults) {
    return null;
  }
  return <AlertNoCommitmentView />;
};

export default AlertNoCommitment;
