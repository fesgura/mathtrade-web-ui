import useReceivedItems from "./useReceivedItems";
import I18N from "@/i18n";
import ModalReceivedItem from "./modal";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import Item from "./item";

const ReceivedItems = () => {
  const {
    results,
    loading,
    error,
    modalOpen,
    toggleModal,
    onOpenReceived,
    itemData,
    setItemData,
    setReloadData,
  } = useReceivedItems();

  return (
    <>
      <div className="relative p-4 max-w-4xl mx-auto">
        <p className="mb-4 text-center text-balance">
          <I18N id="received.p.1" />
        </p>
        <p className="mb-4 text-center text-balance">
          <I18N id="received.p.2" />
        </p>
        <ErrorAlert error={error} />
        <div className="flex flex-col gap-5 min-h-96 relative">
          {results.map(({ received, item_from, idResult }) => {
            return (
              <Item
                key={item_from?.id}
                itemRaw={item_from}
                idResult={idResult}
                received={received}
                onOpenReceived={onOpenReceived}
              />
            );
          })}
          <LoadingBox loading={loading} transparent />
        </div>
      </div>
      <ModalReceivedItem
        isOpen={modalOpen}
        onClose={toggleModal}
        itemData={itemData}
        setReloadData={setReloadData}
      />
    </>
  );
};

export default ReceivedItems;
