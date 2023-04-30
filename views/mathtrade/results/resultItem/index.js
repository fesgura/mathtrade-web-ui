import User from "./user";
import Item from "./item";
import I18N from "i18n";

const BG = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 380"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
    >
      <path
        d="M680.391,53.954l0.972,-12.148l29.967,20.942l-32.88,15.452l0.968,-12.101c-30.519,-2.19 -198.991,-13.359 -285.93,0.303c-97.9,15.385 -296.485,92.355 -296.485,92.355c-3.019,1.169 -6.379,-0.442 -7.499,-3.596c-1.119,-3.154 0.423,-6.664 3.442,-7.833c0,0 200.148,-77.475 298.806,-92.979c87.861,-13.807 258.255,-2.563 288.639,-0.395Z"
        className="arrow-right"
      />
      <path
        d="M120.764,190.28c33.371,13.312 203.676,80.202 292.149,94.743c96.172,15.806 292.1,-0.057 292.1,-0.057c3.226,-0.26 6.048,2.251 6.299,5.605c0.25,3.353 -2.166,6.287 -5.392,6.548c0,-0 -197.765,15.897 -294.839,-0.057c-88.985,-14.625 -260.12,-81.707 -294.305,-95.321l-3.718,10.685l-23.823,-28.377l35.774,-5.967l-4.245,12.198Z"
        className="arrow-left"
      />
    </svg>
  );
};

const ResultItem = ({ user, isMyUser, data }) => {
  return (
    <div className="results-item">
      <div className="results-item-wrap">
        <div className="results-item-bg">
          <BG />
        </div>
        <div className="results-float results-item-label-right">
          <I18N id={`results.label.send.${isMyUser ? "myself" : "other"}`} />
        </div>
        <div className="results-float results-item-label-left">
          <I18N id={`results.label.reseive.${isMyUser ? "myself" : "other"}`} />
        </div>
        <User
          user={user}
          isMyUser={isMyUser}
          className="results-float results_user-my"
        />
        {data.trade_to ? (
          <User
            user={data?.trade_to?.user}
            className="results-float results_user-to"
          />
        ) : (
          <div className="results-float results_user-to for-nothing">Nadie</div>
        )}
        {data.trade_from ? (
          <User
            user={data?.trade_from?.user}
            className="results-float results_user-from"
          />
        ) : (
          <div className="results-float results_user-from for-nothing">
            Nadie
          </div>
        )}
        {data.trade_to ? (
          <Item
            item={data?.trade_to?.item}
            className="results-float results_item-to"
          />
        ) : (
          <div className="results-float results_item-to for-nothing">Nada</div>
        )}
        {data.trade_from ? (
          <Item
            item={data?.trade_from?.item}
            className="results-float results_item-from"
          />
        ) : (
          <div className="results-float results_item-from for-nothing">
            Nada
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultItem;
