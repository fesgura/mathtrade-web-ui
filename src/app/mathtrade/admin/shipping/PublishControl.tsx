"use client";
import { useState } from "react";
import Button from "@/components/button";
import ConfirmModal from "@/components/confirmModal";
import ErrorAlert from "@/components/errorAlert";
import I18N from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { DateIntlFormat } from "@/utils/dateUtils";

// Publishing the labels shows members the "Mis etiquetas" tab in results,
// with the labels of the items they send. Asks first, both ways.
const PublishControl = ({
  publishedAt = null,
  onChange = () => {},
}: {
  publishedAt?: string | null;
  onChange?: () => void;
}) => {
  const [confirming, setConfirming] = useState(false);
  const published = !!publishedAt;

  const [publish, , publishing, errorPublish] = useFetch({
    endpoint: "POST_SHIPPING_LABELS_PUBLISH",
    method: "POST",
    afterLoad: onChange,
  });
  const [unpublish, , unpublishing, errorUnpublish] = useFetch({
    endpoint: "DELETE_SHIPPING_LABELS_PUBLISH",
    method: "DELETE",
    afterLoad: onChange,
  });

  const action = published ? "unpublish" : "publish";

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`text-sm font-semibold ${published ? "text-green-700" : "text-gray-600"}`}>
          {published ? (
            <I18N id="adminShipping.publish.published" values={[DateIntlFormat(publishedAt)]} />
          ) : (
            <I18N id="adminShipping.publish.unpublished" />
          )}
        </span>
        <Button
          type="button"
          sm
          outline={published}
          disabled={publishing || unpublishing}
          onClick={() => setConfirming(true)}
        >
          <I18N id={`adminShipping.publish.${action}`} />
        </Button>
      </div>
      <ErrorAlert error={errorPublish || errorUnpublish} />
      <ConfirmModal
        isOpen={confirming}
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          if (published) unpublish();
          else publish();
        }}
        title={`adminShipping.publish.${published ? "unconfirmTitle" : "confirmTitle"}`}
        description={`adminShipping.publish.${published ? "unconfirmDescription" : "confirmDescription"}`}
        confirmId={`adminShipping.publish.${published ? "unconfirm" : "confirm"}`}
        variant={published ? "danger" : "primary"}
      />
    </div>
  );
};

export default PublishControl;
