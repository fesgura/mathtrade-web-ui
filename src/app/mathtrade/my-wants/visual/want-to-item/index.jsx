import Container from "@/components/container";
import useWantToItem from "./useWantToItem";
import VisualSection from "@/components/want-components/visual";
import EmptyList from "@/components/emptyList";

const WantToItem = () => {
  const { isLoadedWants, myWants, wantList, myItemList, readyToRender } =
    useWantToItem();

  return readyToRender ? (
    <Container>
      {wantList.map((wantGroup) => {
        return (
          <VisualSection
            wantGroup={wantGroup}
            myItemList={myItemList}
            key={wantGroup.id}
          />
        );
      })}
      <EmptyList
        visible={isLoadedWants && !(myWants?.length || 0)}
        message="MyWants.EmptyList"
      />
    </Container>
  ) : null;
};

export default WantToItem;
