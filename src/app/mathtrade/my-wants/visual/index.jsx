import Container from "@/components/container";
import useVisual from "./useVisual";
import VisualSection from "@/components/want-components/visual/section";
import EmptyList from "@/components/emptyList";

const Visual = () => {
  const { isLoadedWants, myWants, wantList, myItemList, readyToRender } =
    useVisual();

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

export default Visual;
