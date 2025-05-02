"use client";
import { lazy } from "react";
import I18N from "@/i18n";
import PageHeader from "@/components/pageHeader";
import Tabs from "@/components/tabs";
import BanUsersModal from "@/components/ban/users/modal";
import HelpContext from "@/components/help-context";
import useOffer from "./useOffer";
import Dynamic from "@/components/dynamic";

const GamesView = lazy(() => import("./games"));
const ItemsView = lazy(() => import("./items"));

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
          <Dynamic h={600}>
            <GamesView />
          </Dynamic>
        </>
      ) : (
        <Dynamic h={600}>
          <ItemsView />
        </Dynamic>
      )}
      <BanUsersModal />
    </>
  );
};

export default OfferPage;
