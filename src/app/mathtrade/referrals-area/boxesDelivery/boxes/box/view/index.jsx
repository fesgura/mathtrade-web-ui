import { Label } from "@/components/form";
import useView from "./useView";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import ButtonAlert from "@/components/buttonAlert";
import InnerButton from "@/components/button/inner-button";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const BoxView = ({ box }) => {
  const {
    editBox,
    deleteBox,
    loading,
    error,
    number,
    destinyName,
    math_items_full,
  } = useView(box);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-5">
        <div className="w-24">
          <Label text="boxesDelivery.number" name="number" />
          <div className="bg-white/20 border border-gray-400/70 text-xl font-bold py-1 rounded-md text-center px-3">
            {number}
          </div>
        </div>
        <div>
          <Label text="boxesDelivery.city" name="destiny" />
          <div className="bg-white/20 border border-gray-400/70 text-xl font-bold py-1 rounded-md text-center px-3">
            {destinyName}
          </div>
        </div>
      </div>
      <div>
        <Label
          text="boxesDelivery.items"
          name="items"
          values={[math_items_full.length]}
        />
        <div className="bg-white/70 border border-gray-400/70 p-2 rounded-md flex flex-col gap-1">
          {math_items_full.map(({ id, text }) => {
            return (
              <div
                key={id}
                className="w-full bg-sky-100 border border-sky-400 font-bold rounded px-2  py-1 text-sm"
              >
                {text}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <button
          className="text-white  font-bold text-lg px-6 py-1 rounded-full  hover:text-white transition-colors bg-primary hover:bg-sky-700"
          onClick={editBox}
        >
          <I18N id="boxesDelivery.btn.edit" />
        </button>

        <ButtonAlert
          className="text-sm flex items-center gap-1 text-red-600"
          onClick={deleteBox}
          title="boxesDelivery.btn.deleteBoxTitle"
        >
          <InnerButton>
            <Icon type="trash" />
            <I18N id="boxesDelivery.btn.delete" />
          </InnerButton>
        </ButtonAlert>
      </div>
      <ErrorAlert error={error} />
      <LoadingBox loading={loading} transparent />
    </div>
  );
};
export default BoxView;
