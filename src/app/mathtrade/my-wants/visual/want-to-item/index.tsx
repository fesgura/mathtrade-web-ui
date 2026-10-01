"use client";
import useWantToItem from "./useWantToItem";
import useTour from "@/tours/useTour";
import VisualSection from "@/components/want-components/visual";
import EmptyList from "@/components/emptyList";
import CommitHeaderVisual from "@/components/want-components/commit/headers/header-visual";
import CommitFooter from "@/components/want-components/commit/footer";
import { PRIVATE_ROUTES } from "@/config/routes";

const WantToItem = ({ changeScreenViewOffer = () => {} }) => {
  const { isLoadedWants, myWants, wantList, myItemList, readyToRender } =
    useWantToItem();

  useTour("my-wants", { ready: readyToRender && (wantList?.length || 0) > 0 });

  return readyToRender ? (
    <div className="md:px-8 px-3">
      <CommitHeaderVisual />
      <EmptyList
        visible={isLoadedWants && !(myWants?.length || 0)}
        message="MyWants.EmptyList"
        icon="heart"
        ctaText="MyWants.EmptyList.cta"
        ctaHref={PRIVATE_ROUTES.OFFER.path}
      />
      {wantList.map((wantGroup) => {
        return (
          <VisualSection
            wantGroup={wantGroup}
            myItemList={myItemList}
            key={wantGroup.id}
          />
        );
      })}
      <CommitFooter
        acceptNum="1"
        changeScreenViewOffer={changeScreenViewOffer}
      />
    </div>
  ) : null;
};

export default WantToItem;
