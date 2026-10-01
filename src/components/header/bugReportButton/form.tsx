"use client";
import I18N from "@/i18n";
import ErrorAlert from "@/components/errorAlert";
import { resolveApiErrorMessage } from "@/utils/apiError";
import { LoadingBox } from "@/components/loading";
import { Form, InputContainer, Label, Textarea } from "@/components/form";
import useBugReportForm from "./useBugReportForm";
import RecaptchaNotice from "@/components/recaptchaNotice";

type BugReportFormProps = {
  toggleEditingMode: () => void;
  screenshot: string | null;
  consoleLog: string;
};

const BugReportForm = ({
  toggleEditingMode,
  screenshot,
  consoleLog,
}: BugReportFormProps) => {
  const { validations, onSubmit, loading, submitted, error } = useBugReportForm(
    screenshot,
    consoleLog
  );

  return (
    <div className="relative">
      <h2 className="text-heading mb-3">
        <I18N id="bugReport.title" />
      </h2>

      {submitted ? (
        <p className="text-body-lg py-4">
          <I18N id="bugReport.success" />
        </p>
      ) : (
        <Form validations={validations} onSubmit={onSubmit}>
          <InputContainer validate="description" className="mb-3">
            <Label text="bugReport.description.label" name="description" required />
            <Textarea name="description" data={{}} className="h-32" size="md" />
          </InputContainer>

          {screenshot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={screenshot}
              alt=""
              className="mb-3 rounded-md border border-gray-300 max-h-48 w-full object-cover object-top"
            />
          ) : null}

          <ErrorAlert error={error} errorMessage={resolveApiErrorMessage(error)} />

          <div className="flex items-center justify-center gap-4 pt-2 pb-1">
            <button
              className="border border-gray-400 text-gray-500 font-bold text-lg px-6 py-1 rounded-full hover:bg-gray-400 hover:text-white transition-colors"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleEditingMode();
              }}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
              type="submit"
              disabled={loading || submitted}
              className="text-white bg-primary font-bold text-lg px-6 py-1 rounded-full hover:bg-sky-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <I18N id="bugReport.submit" />
            </button>
          </div>
          <RecaptchaNotice />
        </Form>
      )}

      <LoadingBox loading={loading} />
    </div>
  );
};

export default BugReportForm;
