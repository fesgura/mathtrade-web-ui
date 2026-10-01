"use client";
import { lazy } from "react";
import PageHeader from "@/components/pageHeader";
import Tabs from "@/components/tabs";
import BanUsersModal from "@/components/ban/users/modal";
import useOffer from "./useOffer";
import Dynamic from "@/components/dynamic";
import Wrapper from "@/components/wrapper";
import I18N from "@/i18n";

const GamesView = lazy(() => import("./games"));
const ItemsView = lazy(() => import("./items"));

const OfferPage = () => {
  const { screenOfferView, setScreenOfferView } = useOffer();

  return (
    <>
      <PageHeader
        variant="compact"
        title="title.OfferGames"
        helpId="page.offer"
        alert={<I18N id="alert.duplicateCopies" />}
      />
      <Wrapper className="mb-1">
        <div className="bg-white rounded-t-main shadow-main">
          <Tabs
            list={["offer.screen.games", "offer.screen.items"]}
            value={screenOfferView}
            onChange={setScreenOfferView}
          />
        </div>
      </Wrapper>

      {screenOfferView === 0 ? (
        <Dynamic h={600}>
          <GamesView />
        </Dynamic>
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
