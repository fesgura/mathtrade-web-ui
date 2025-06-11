import Thumbnail from "@/components/thumbnail";
import useReceivedItems from "./useReceivedItems";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import clsx from "clsx";
import I18N from "@/i18n";
import Modal from "@/components/modal";
import ModalReceivedItem from "./modal";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const ReceivedItems = () => {
  const {
    results,
    loading,
    error,
    modalOpen,
    toggleModal,
    itemData,
    setItemData,
    setReloadData,
  } = useReceivedItems();

  return (
    <>
      <div className="relative p-4 max-w-3xl mx-auto">
        <p className="mb-4 text-center text-balance">
          <I18N id="received.p.1" />
        </p>
        <p className="mb-4 text-center text-balance">
          <I18N id="received.p.2" />
        </p>
        <ErrorAlert error={error} />
        <div className="flex flex-col gap-3 min-h-96 relative">
          {results.map(({ delivered, item_from, membership_from }, k) => {
            const { id, elements, title } = item_from;
            const { avatar, location, first_name, last_name } = membership_from;

            return (
              <div
                className="sm:flex items-stretch gap-4 justify-between p-3 bg-white shadow-md"
                key={id}
              >
                <div className="flex gap-4">
                  <div className="">
                    <Thumbnail
                      elements={[elements?.[0]?.element]}
                      className="w-16 rounded-md"
                    />
                  </div>
                  <div className="">
                    <h4 className="font-bold pb-2">{title}</h4>
                    <div className="border-t border-gray-300 pt-2">
                      <div className="text-xs">entregado por:</div>
                      <div className="flex items-center gap-2">
                        <div className="w-6">
                          <Avatar avatar={avatar} width="100%" />
                        </div>
                        <div className="">
                          <div className="cropped leading-none font-bold text-[10px]">{`${first_name} ${last_name}`}</div>
                          <div className="text-gray-600 leading-none text-[11px]">
                            {location?.name || ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:border-l sm:pt-0 pt-3">
                  <div className="w-[220px] sm:flex justify-end text-sm font-bold sm:pl-2">
                    {delivered ? (
                      <div className="flex gap-1 items-center py-1 px-3 rounded-md text-lime-700 bg-lime-100/20">
                        <Icon type="check" />
                        <I18N id="received.already" />
                      </div>
                    ) : (
                      <button
                        className="flex gap-1 items-center py-1 px-3 rounded-md  bg-primary text-white transition-colors hover:bg-sky-800"
                        onClick={() => {
                          setItemData({ title, id });
                          toggleModal();
                        }}
                      >
                        <Icon type="check" />
                        <I18N id="received.btn" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
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
