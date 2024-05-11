import Container from "@/components/container";
import useItemToWant from "./useItemToWant";
import VisualSection2 from "@/components/want-components/visual2";
import EmptyList from "@/components/emptyList";

const ItemToWant = () => {
  const { isLoadedWants, myList, readyToRender } = useItemToWant();

  return readyToRender ? (
    <Container>
      {myList.map((item) => {
        return <VisualSection2 key={item.id} item={item} />;
      })}
      <EmptyList
        visible={isLoadedWants && !(myList?.length || 0)}
        message="MyWants.EmptyList"
      />
    </Container>
  ) : null;
};

export default ItemToWant;
