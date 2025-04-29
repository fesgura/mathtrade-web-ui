"use client";
import I18N from "@/i18n";
import PageHeader from "@/components/pageHeader";
import Tabs from "@/components/tabs";
import BanUsersModal from "@/components/ban/users/modal";
import GamesView from "./games";
import ItemsView from "./items";
import HelpContext from "@/components/help-context";
import useOffer from "./useOffer";

const OfferPage = () => {
  const { screenOfferView, setScreenOfferView } = useOffer();

  return (
    <>
      <PageHeader
        title="title.OfferGames"
        name="games"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="Offer.page.explanation" />
            </p>
          </>
        }
      />
      <Tabs
        list={["offer.screen.games", "offer.screen.items"]}
        value={screenOfferView}
        onChange={setScreenOfferView}
      />

      {screenOfferView === 0 ? (
        <>
          <div className="w-fit mx-auto">
            <HelpContext id="advanceMeaning.items" />
          </div>
          <GamesView />
        </>
      ) : (
        <ItemsView />
      )}
      <BanUsersModal />
    </>
  );
};

export default OfferPage;
