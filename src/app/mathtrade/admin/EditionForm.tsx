"use client";
import I18N from "@/i18n";
import { Form, InputContainer, Label, Input, Select, Switch } from "@/components/form";
import Button from "@/components/button";
import { DATE_FIELDS, VENUE_FIELDS, toLocalInput } from "./useAdminPanel";
import FieldErrors from "./FieldErrors";
import ProvisionalDatesField from "./ProvisionalDatesField";
import { FIELD_LABELS } from "./fieldLabels";

const VENUE_PLACEHOLDERS: Record<string, string> = {
  venue_name: "adminPanel.venue.namePlaceholder",
  venue_address: "adminPanel.venue.addressPlaceholder",
  venue_map_url: "adminPanel.venue.mapUrlPlaceholder",
};

type EditionFormProps = {
  mode: "edit" | "create";
  initial: Record<string, any>;
  onSubmit: (formProps: Record<string, any>) => void;
  onCancel: () => void;
  saving: boolean;
  error: any;
  locationOptions: { value: number; text: string }[];
};

// The edition's settings, for editing an edition and for creating one.
// Creating has no Activa / Solo admins: a new edition is always created
// inactive and visible to admins only (the backend enforces it).
const EditionForm = ({
  mode,
  initial,
  onSubmit,
  onCancel,
  saving,
  error,
  locationOptions,
}: EditionFormProps) => (
  <Form
    formatTypes={{
      active: "boolean",
      admin_only: "boolean",
      rules_quiz_required: "boolean",
    }}
    onSubmit={onSubmit}
  >
    <InputContainer>
      <Label text="adminPanel.field.name" name="name" />
      <Input name="name" data={{ name: initial.name || "" }} />
    </InputContainer>

    <InputContainer>
      <Label text="form.Location" name="location" />
      <Select
        name="location"
        data={{ location: initial.location?.id ?? initial.location }}
        options={locationOptions}
      />
    </InputContainer>

    {mode === "edit" ? (
      <>
        <InputContainer className="mb-4">
          <Switch name="active" data={{ active: !!initial.active }}>
            <I18N id="adminPanel.field.active" />
          </Switch>
        </InputContainer>
        <InputContainer className="mb-4">
          <Switch name="admin_only" data={{ admin_only: !!initial.admin_only }}>
            <I18N id="adminPanel.field.adminOnly" />
          </Switch>
        </InputContainer>
      </>
    ) : (
      <p className="text-sm text-gray-700 bg-gray-100 rounded px-3 py-2 mb-4">
        <I18N id="adminPanel.create.startsHidden" />
      </p>
    )}

    <InputContainer className="mb-4">
      <Switch
        name="rules_quiz_required"
        data={{ rules_quiz_required: !!initial.rules_quiz_required }}
      >
        <I18N id="adminPanel.field.rulesQuizRequired" />
      </Switch>
    </InputContainer>

    <InputContainer>
      <Label text="adminPanel.contribution.amount" name="contribution_amount" />
      {/* Text, not number: a number input silently changes on mouse
          wheel / arrow keys, which is too easy to do by accident on
          a money field. */}
      <Input
        name="contribution_amount"
        placeholder="adminPanel.contribution.amountPlaceholder"
        data={{ contribution_amount: initial.contribution_amount ?? "" }}
      />
    </InputContainer>

    <InputContainer>
      <Label
        text="adminPanel.field.directShippingThreshold"
        name="direct_shipping_threshold"
      />
      {/* Text, not number, like the amount above. */}
      <Input
        name="direct_shipping_threshold"
        data={{ direct_shipping_threshold: initial.direct_shipping_threshold ?? 5 }}
      />
      <p className="text-xs text-gray-600 mt-1">
        <I18N id="adminPanel.field.directShippingThresholdHelp" />
      </p>
    </InputContainer>

    <fieldset className="border border-stroke rounded-lg p-3 mb-4">
      <legend className="px-1 text-sm font-semibold">
        <I18N id="adminPanel.venue.title" />
      </legend>
      <p className="text-xs text-gray-600 mb-2">
        <I18N id="adminPanel.venue.help" />
      </p>
      {VENUE_FIELDS.map((field) => (
        <InputContainer key={field}>
          <Label text={FIELD_LABELS[field]} name={field} />
          <Input
            name={field}
            placeholder={VENUE_PLACEHOLDERS[field]}
            data={{ [field]: initial[field] || "" }}
          />
        </InputContainer>
      ))}
    </fieldset>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {DATE_FIELDS.map((field) => (
        <InputContainer key={field}>
          <Label text={FIELD_LABELS[field]} name={field} />
          <Input
            type="datetime-local"
            name={field}
            data={{ [field]: toLocalInput(initial[field]) }}
          />
        </InputContainer>
      ))}
    </div>

    <ProvisionalDatesField initial={initial} />

    <FieldErrors error={error} />

    <div className="flex items-center gap-2 pt-2">
      <Button type="submit" disabled={saving}>
        <I18N id={mode === "create" ? "adminPanel.create.submit" : "btn.Save"} />
      </Button>
      <Button type="button" outline onClick={onCancel}>
        <I18N id="btn.Cancel" />
      </Button>
    </div>
  </Form>
);

export default EditionForm;
