import { Label } from "@/components/form";
import useView from "./useView";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import ButtonAlert from "@/components/buttonAlert";
import InnerButton from "@/components/button/inner-button";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const View = ({ track }) => {
  const {
    editTracking,
    deleteTracking,
    loading,
    error,
    tracking_code,
    destinyName,
    boxes,
    // math_items_full,
  } = useView(track);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start gap-7">
        <div>
          <Label text="boxesDelivery.city" name="destiny" />
          <div className="border-b border-gray-300 text-xl font-bold pb-1 rounded-md text-gray-500">
            {destinyName}
          </div>
        </div>
        <div className="">
          <Label text="boxesDelivery.tracking_code" name="tracking_code" />

          <a
            href={`https://www.viacargo.com.ar/tracking/${tracking_code}`}
            className="block border-b border-primary text-primary text-xl font-bold pb-1 text-center hover:border-sky-700 hover:text-sky-700"
            target="_blank"
            rel="noreferrer"
          >
            {tracking_code}
          </a>
        </div>
      </div>
      <div>
        <Label text="boxesDelivery.items" name="items" />
        <div className="bg-white border border-gray-300 p-1 rounded-md flex flex-wrap gap-2">
          {boxes.map(({ id, number }) => {
            return (
              <div
                key={id}
                className=" bg-item-100 border border-item-400 font-bold rounded px-2  py-1 text-sm"
              >
                {`Caja Nº ${number}`}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <button
          className="text-white  font-bold text-lg px-6 py-1 rounded-full  hover:text-white transition-colors bg-primary hover:bg-sky-700"
          onClick={editTracking}
        >
          <I18N id="boxesDelivery.btn.edit" />
        </button>

        <ButtonAlert
          className="text-sm flex items-center gap-1 text-red-600"
          onClick={deleteTracking}
          title="boxesDelivery.btn.tracking.deleteBoxTitle"
        >
          <InnerButton>
            <Icon type="trash" />
            <I18N id="boxesDelivery.btn.tracking.delete" />
          </InnerButton>
        </ButtonAlert>
      </div>
      <ErrorAlert error={error} />
      <LoadingBox loading={loading} transparent />
    </div>
  );
};
export default View;
