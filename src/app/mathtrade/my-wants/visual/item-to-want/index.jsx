import useItemToWant from "./useItemToWant";
import VisualSection2 from "@/components/want-components/visual2";
import EmptyList from "@/components/emptyList";
import CommitHeaderVisual from "@/components/want-components/commit/headers/header-visual";
import CommitFooter from "@/components/want-components/commit/footer";

const ItemToWant = ({ changeScreenViewOffer }) => {
  const { isLoadedWants, myList, readyToRender } = useItemToWant();

  return readyToRender ? (
    <div className="md:px-8 px-3">
      <CommitHeaderVisual />
      <EmptyList
        visible={isLoadedWants && !(myList?.length || 0)}
        message="MyWants.EmptyList"
      />
      {myList.map((item) => {
        return <VisualSection2 key={item.id} item={item} />;
      })}
      <CommitFooter
        acceptNum="2"
        changeScreenViewOffer={changeScreenViewOffer}
      />
    </div>
  ) : null;
};

export default ItemToWant;
