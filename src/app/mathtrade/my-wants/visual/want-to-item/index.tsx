"use client";
import useWantToItem from "./useWantToItem";
import useTour from "@/tours/useTour";
import { useTourDemo } from "@/tours/context";
import TourDemo from "@/tours/demo/TourDemo";
import DemoWantRow from "@/tours/demo/DemoWantRow";
import VisualSection from "@/components/want-components/visual";
import EmptyList from "@/components/emptyList";
import CommitHeaderVisual from "@/components/want-components/commit/headers/header-visual";
import CommitFooter from "@/components/want-components/commit/footer";
import { PRIVATE_ROUTES } from "@/config/routes";

const WantToItem = ({ changeScreenViewOffer = () => {} }) => {
  const { isLoadedWants, myWants, wantList, myItemList, readyToRender } =
    useWantToItem();

  // Ready once rendered, even with no wishes: then it shows an example row.
  useTour("my-wants", { ready: readyToRender });
  const showDemo = useTourDemo("my-wants") && !(wantList?.length || 0);

  return readyToRender ? (
    <div className="md:px-8 px-3">
      <CommitHeaderVisual />
      <EmptyList
        visible={isLoadedWants && !(myWants?.length || 0) && !showDemo}
        message="MyWants.EmptyList"
        icon="heart"
        ctaText="MyWants.EmptyList.cta"
        ctaHref={PRIVATE_ROUTES.OFFER.path}
      />
      {showDemo ? (
        <TourDemo>
          <DemoWantRow myItemList={myItemList} />
        </TourDemo>
      ) : null}
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
