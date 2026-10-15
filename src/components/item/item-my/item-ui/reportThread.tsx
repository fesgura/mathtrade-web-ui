"use client";
import { useCallback, useState } from "react";
import clsx from "clsx";
import Button from "@/components/button";
import ErrorAlert from "@/components/errorAlert";
import I18N, { getI18Ntext } from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { resolveApiErrorMessage } from "@/utils/apiError";

type ThreadComment = {
  id: number;
  user_info: { id: number; first_name: string; last_name: string } | null;
  comment: string;
  created: string;
};

// The thread endpoints answer 403/404 when the report is gone or no longer
// visible to this user; anything else is a generic "try again" for that
// action, except a network failure, which says so.
export const reportThreadErrorKey = (error: any, fallback: string): string => {
  if (!error) return "";
  if (error.status === 403 || error.status === 404) {
    return "reportThread.error.unavailable";
  }
  return resolveApiErrorMessage(error) === "error.Network" ? "error.Network" : fallback;
};

// Textarea + "Responder" for a report thread. Used by the owner (inside the
// staff observation box) and by admins on the reports page.
export const ReplyBox = ({
  reportId,
  onSent,
  className = "",
}: {
  reportId: number;
  onSent?: () => void;
  className?: string;
}) => {
  const [text, setText] = useState("");
  const [send, , sending, error] = useFetch({
    endpoint: "POST_REPORT_COMMENT",
    method: "POST",
    afterLoad: () => {
      setText("");
      if (onSent) onSent();
    },
  });
  const trimmed = text.trim();

  return (
    <form
      className={clsx("mt-2", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (!trimmed || sending) return;
        send({ urlParams: [reportId], params: { comment: trimmed } });
      }}
    >
      <ErrorAlert
        error={error}
        errorMessage={reportThreadErrorKey(error, "reportThread.error.send")}
        className="mb-2"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder={getI18Ntext("reportThread.placeholder")}
        aria-label={getI18Ntext("reportThread.placeholder")}
        className="input block w-full rounded-md border border-stroke bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:shadow-[0_0_6px_theme(colors.primary)] focus:outline-none"
      />
      <div className="mt-2 flex justify-end">
        <Button type="submit" sm disabled={!trimmed || sending}>
          <I18N id={sending ? "reportThread.sending" : "reportThread.send"} />
        </Button>
      </div>
    </form>
  );
};

const fullName = (person: ThreadComment["user_info"]) =>
  person ? `${person.first_name} ${person.last_name}`.trim() : "-";

// The conversation on a staff report about one of my copies: collapsed by
// default, loaded on first open, with a reply box.
const ReportThread = ({
  reportId,
  initialCount = null,
}: {
  reportId: number;
  initialCount?: number | null;
}) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [load, comments, loading, error] = useFetch({
    endpoint: "GET_REPORT_COMMENTS",
    initialState: [],
    afterLoad: () => setLoaded(true),
  });
  const list: ThreadComment[] = Array.isArray(comments) ? comments : [];
  const count = loaded ? list.length : initialCount;

  const reload = useCallback(() => {
    load({ urlParams: [reportId] });
  }, [load, reportId]);

  const toggle = () => {
    if (!open && !loaded) reload();
    setOpen((v) => !v);
  };

  return (
    <div className="mt-2 border-t border-amber-200 pt-2">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="text-xs font-semibold text-amber-950 underline hover:opacity-75"
      >
        {open ? (
          <I18N id="reportThread.hide" />
        ) : count == null ? (
          <I18N id="reportThread.show" />
        ) : (
          <I18N id="reportThread.showCount" values={[count]} />
        )}
      </button>
      {open ? (
        <div className="mt-2">
          <ErrorAlert
            error={error}
            errorMessage={reportThreadErrorKey(error, "reportThread.error.load")}
            className="mb-2"
          />
          {loading && !loaded ? (
            <p className="text-xs opacity-90">
              <I18N id="reportThread.loading" />
            </p>
          ) : null}
          {loaded && !list.length ? (
            <p className="text-xs opacity-90">
              <I18N id="reportThread.empty" />
            </p>
          ) : null}
          {list.length ? (
            <ul className="flex flex-col gap-2">
              {list.map((c) => (
                <li
                  key={c.id}
                  className="rounded-md border border-amber-200 bg-white px-2 py-1.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs">
                    <strong>{fullName(c.user_info)}</strong>
                    <span className="opacity-75">{c.created}</span>
                  </div>
                  <p className="mt-0.5 whitespace-pre-line break-words">{c.comment}</p>
                </li>
              ))}
            </ul>
          ) : null}
          {loaded || error ? <ReplyBox reportId={reportId} onSent={reload} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default ReportThread;
