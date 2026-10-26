"use client";
import { useState } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import Button from "@/components/button";
import { getProvisionalDates } from "@/utils/provisionalDates";
import { toLocalInput } from "./useAdminPanel";

const MAX_DATES = 10;

// The edition's provisional-run dates as a list of datetime-local rows. The
// rows are unnamed (not collected by the Form); a hidden input carries them
// as a JSON array, which buildParams turns into provisional_results_dates.
const ProvisionalDatesField = ({
  initial = {},
}: {
  initial?: Record<string, any>;
}) => {
  const [rows, setRows] = useState<string[]>(() =>
    getProvisionalDates(initial).map((t) => toLocalInput(new Date(t).toISOString()))
  );

  const inputClass = "w-full border border-stroke rounded-md p-2 text-sm";
  return (
    <fieldset className="border border-stroke rounded-lg p-3 my-4">
      <legend className="px-1 text-sm font-semibold">
        <I18N id="adminPanel.field.provisionalResultsDates" />
      </legend>
      <p className="text-xs text-gray-600 mb-2">
        <I18N id="adminPanel.provisionalDates.help" />
      </p>
      {rows.map((value, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="datetime-local"
            className={inputClass}
            value={value}
            aria-label={`${getI18Ntext("adminPanel.field.provisionalResultsDates")} ${index + 1}`}
            onChange={(e) =>
              setRows((prev) => prev.map((r, i) => (i === index ? e.target.value : r)))
            }
          />
          <Button
            type="button"
            sm
            outline
            color="danger"
            onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}
          >
            <I18N id="adminPanel.provisionalDates.remove" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        sm
        outline
        disabled={rows.length >= MAX_DATES}
        onClick={() => setRows((prev) => [...prev, ""])}
      >
        <I18N id="adminPanel.provisionalDates.add" />
      </Button>
      <input type="hidden" name="provisional_results_dates" value={JSON.stringify(rows)} />
    </fieldset>
  );
};

export default ProvisionalDatesField;
