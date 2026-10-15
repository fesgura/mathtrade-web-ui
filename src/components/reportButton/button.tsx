import I18N, { getI18Ntext } from "@/i18n";
import Icon from "../icon";
import useReport from "./useReport";
import Modal from "../modal";
import { Form, InputContainer, Label, Textarea } from "../form";
import SuccessAlert from "../successAlert";
import ErrorAlert from "../errorAlert";
import { resolveApiErrorMessage } from "@/utils/apiError";
import { LoadingBox } from "../loading";

// again: the item already has an open report (staff view); same modal, the
// backend adds the text to that report's conversation.
const ReportButtonBtn = ({
  id = null,
  again = false,
}: {
  id?: number | string | null;
  again?: boolean;
}) => {
  const {
    showModal,
    onOpen,
    onClose,
    validations,
    onSubmit,
    loading,
    showSuccess,
    merged,
    error,
  } = useReport(id);

  return (
    <>
      <div
        className="w-fit shrink-0"
        data-tooltip={getI18Ntext(again ? "reportItem.again.tooltip" : "reportItem.tooltip")}
      >
        <button
          className="flex items-center gap-1 text-[13px] leading-none  border border-yellow-600 text-yellow-700 py-[1px] px-1 rounded-full"
          onClick={onOpen}
        >
          <Icon type="report" />

          <span className="text-[10px] font-bold whitespace-nowrap">
            <I18N id={again ? "reportItem.again" : "reportItem.btn"} />
          </span>
        </button>
      </div>
      <Modal isOpen={showModal} onClose={onClose} size="md">
        <p className="text-balance text-center mb-4">
          <I18N id="reportItem.help" />
        </p>
        <Form validations={validations} onSubmit={onSubmit}>
          <InputContainer validate="comment">
            <Label text="report.Comment" name="comment" required />
            <Textarea name="comment" data={{}} className="" />
          </InputContainer>
          {showSuccess ? <SuccessAlert text={merged ? "reportItem.success.merged" : "reportItem.success"} /> : null}
          <ErrorAlert error={error} errorMessage={resolveApiErrorMessage(error)} />
          <div className="flex items-center justify-center gap-4 pt-2 pb-5">
            <button
              className="border border-gray-300 text-gray-400 font-bold text-lg px-6 py-1 rounded-full hover:bg-gray-400 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
              type="submit"
              className=" text-white bg-primary font-bold text-lg px-6 py-1 rounded-full hover:bg-sky-700 hover:text-white transition-colors"
            >
              <I18N id="reportItem.btn" />
            </button>
          </div>
        </Form>
        <LoadingBox loading={loading} />
      </Modal>
    </>
  );
};
export default ReportButtonBtn;
