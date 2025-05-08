import Container from "@/components/container";
import useWantToItem from "./useWantToItem";
import VisualSection from "@/components/want-components/visual";
import EmptyList from "@/components/emptyList";
import { Checkbox } from "@/components/form";
import CommitHeaderVisual from "@/components/want-components/commit/headers/header-visual";
import CommitFooter from "@/components/want-components/commit/footer";

const WantToItem = ({ changeScreenViewOffer }) => {
  const { isLoadedWants, myWants, wantList, myItemList, readyToRender } =
    useWantToItem();

  return readyToRender ? (
    <div className="md:px-8 px-3">
      <CommitHeaderVisual />
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
      <EmptyList
        visible={isLoadedWants && !(myWants?.length || 0)}
        message="MyWants.EmptyList"
      />
    </div>
  ) : null;
};

export default WantToItem;
