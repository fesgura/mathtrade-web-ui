import { Form, Input, InputContainer, Label, Select } from "@/components/form";
import I18N from "@/i18n";
import useEditor from "./useEditor";
import clsx from "clsx";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const Editor = ({ track }) => {
  const {
    validations,
    onSubmit,
    onCancel,
    loading,
    error,
    //
    locationOptionsForTracking,
    locationId,
    setLocationId,
    //
    id,
    tracking_code,
    boxes,
    boxOptions,
  } = useEditor(track);

  return (
    <Form validations={validations} onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-5">
          <InputContainer validate="destiny" className="w-[250px] m-0">
            <Label text="boxesDelivery.city" name="destiny" required />
            <Select
              data={{ destiny: locationId }}
              name="destiny"
              options={locationOptionsForTracking}
              icon="location"
              size="sm"
              onChange={(newLocationId) => {
                setLocationId(newLocationId);
              }}
            />
          </InputContainer>
          <InputContainer
            validate="tracking_code"
            className="min-w-[250px] flex-1 m-0"
          >
            <Label
              text="boxesDelivery.tracking_code"
              name="tracking_code"
              required
            />
            <Input
              data={{ tracking_code }}
              name="tracking_code"
              type="text"
              size="sm"
              icon="map"
              placeholder="boxesDelivery.tracking_code.placeholder"
            />
          </InputContainer>
        </div>

        <InputContainer validate="boxes">
          <Label text="boxesDelivery.trackingBoxLabel" name="boxes" required />
          <Select
            data={{ boxes }}
            name="boxes"
            options={boxOptions}
            multiple
            customRenderTag={(box, deleteBtn) => {
              return (
                <div
                  className="flex items-center justify-between  bg-item-200 border border-item-400 font-bold rounded px-2  py-1 text-sm"
                  key={box.value}
                >
                  <div className="">{box.text}</div>
                  <div className="text-red-600">{deleteBtn}</div>
                </div>
              );
            }}
            customRenderOption={(op) => {
              return (
                <div className="py-2" key={op.value}>
                  {op.text}
                </div>
              );
            }}
          />
        </InputContainer>
        <ErrorAlert error={error} />
        <div
          className={clsx("flex items-end gap-4", {
            "justify-center": !id,
            "justify-between": id,
          })}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-gray-500 border border-gray-400  font-bold text-lg px-8 py-2 rounded-full  hover:text-white hover:bg-gray-500 transition-colors"
              onClick={onCancel}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
              type="submit"
              className={clsx(
                "text-white  font-bold text-lg px-8 py-2 rounded-full  hover:text-white transition-colors",
                {
                  "bg-primary hover:bg-sky-700": id,
                  "bg-green-600 hover:bg-green-800": !id,
                }
              )}
            >
              <I18N
                id={`boxesDelivery.btn.tracking.${id ? "update" : "create"}`}
              />
            </button>
          </div>
        </div>
      </div>
      <LoadingBox loading={loading} transparent />
    </Form>
  );
};
export default Editor;
