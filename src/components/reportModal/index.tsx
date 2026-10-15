"use client";
import { useCallback, useContext, useMemo } from "react";
import Link from "next/link";
import { FloatingPortal } from "@floating-ui/react";
import Modal from "@/components/modal";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import PhotoGallery from "@/components/photoGallery";
import I18N from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import { PRIVATE_ROUTES } from "@/config/routes";
import { useStore } from "@/store";
import { AdminUserName } from "@/components/adminUserModal";
import CopyLinkButton from "@/components/previewer/modal/copyLinkButton";
import ReportThread from "@/components/item/item-my/item-ui/reportThread";
import { closeReport, useReportModalState } from "./reportModalStore";
import useReportFromUrl, {
  clearReportParam,
  reportPermalink,
} from "./useReportFromUrl";

// BE reports/serializers.report_view_payload: shaped by the viewer's role.
type ReportView = {
  id: number;
  role: "staff" | "owner" | "reporter";
  created: string | null;
  resolved_at: string | null;
  resolution: string | null;
  comment: string;
  item: { id: number; title: string } | null;
  from_staff: boolean;
  can_comment: boolean;
  // staff: with id; owner: name or "Otro usuario"; reporter: null (it's you).
  reporter?: { id?: number; first_name: string; last_name: string } | null;
  images?: string;
  box_number?: number | null;
  internal?: boolean;
};

// 404: the report doesn't exist or this user may not see it (the backend
// answers the same for both, so a hidden report doesn't leak).
const errorKey = (error: any): string =>
  error?.status === 404 || error?.status === 403
    ? "reportView.notFound"
    : "reportView.error";

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-x-2 text-sm">
    <span className="text-gray-600">
      <I18N id={label} />:
    </span>
    <span className="min-w-0 break-words">{children}</span>
  </div>
);

const ReportDetail = ({ reportId }: { reportId: number }) => {
  const isAdmin = useStore((state) => !!state.data.user?.math_admin);
  const { setItemPreviewId, setCustomMathtradeId, setShowModalPreview } =
    useContext(PageContext);
  const urlParams = useMemo(() => [reportId], [reportId]);
  const [, data, loading, error] = useFetch({
    endpoint: "GET_REPORT_VIEW",
    urlParams,
    autoLoad: true,
    initialState: null,
  });
  const report = (data && !error ? data : null) as ReportView | null;

  const openItem = useCallback(
    (id: number) => {
      // The report modal closes first: the item preview may already be open
      // underneath (the report was opened from it).
      closeReport();
      clearReportParam();
      setCustomMathtradeId(null);
      setItemPreviewId(id);
      setShowModalPreview(true);
    },
    [setCustomMathtradeId, setItemPreviewId, setShowModalPreview]
  );

  if (error) {
    return (
      <ErrorAlert error={error} errorMessage={errorKey(error)} className="mt-2" />
    );
  }
  if (!report) {
    return (
      <div className="relative min-h-[120px]">
        <LoadingBox loading={loading} />
      </div>
    );
  }

  const reporterName = report.reporter
    ? `${report.reporter.first_name} ${report.reporter.last_name}`.trim()
    : "";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {report.resolved_at ? (
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 font-semibold text-green-900">
            <I18N id="reportView.resolved" values={[report.resolved_at]} />
            {report.resolution === "withdrawn" ? (
              <>
                {" · "}
                <I18N id="adminReports.resolution.withdrawn" />
              </>
            ) : null}
          </span>
        ) : (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-semibold text-amber-900">
            <I18N id="reportView.open" />
          </span>
        )}
        {report.internal ? (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
            <I18N id="adminReports.internal" />
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <Row label="reportView.item">
          {report.item ? (
            <button
              type="button"
              className="font-bold text-left text-primary underline hover:opacity-75"
              onClick={() => openItem(report.item.id)}
            >
              {report.item.title}
            </button>
          ) : (
            <I18N id="reportView.noItem" />
          )}
        </Row>
        <Row label="reportView.by">
          {report.role === "reporter" ? (
            <I18N id="reportView.byYou" />
          ) : report.role === "staff" && report.reporter?.id ? (
            <AdminUserName userId={report.reporter.id}>{reporterName}</AdminUserName>
          ) : (
            reporterName || "-"
          )}
        </Row>
        {report.created ? <Row label="reportView.created">{report.created}</Row> : null}
        {report.box_number ? (
          <Row label="reportView.box">{report.box_number}</Row>
        ) : null}
      </div>

      <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950">
        <p className="whitespace-pre-line break-words">“{report.comment}”</p>
        {report.images ? (
          <PhotoGallery images={report.images} extended noTitled noEdit className="mt-2" />
        ) : null}
        {!report.resolved_at ? (
          <p className="mt-1 text-xs opacity-90">
            <I18N
              id={
                report.role === "owner"
                  ? report.from_staff
                    ? "myOffer.staffObservation.corrida"
                    : "myOffer.userReport.hint"
                  : report.role === "reporter"
                  ? "reportView.reporterHint"
                  : "reportView.staffHint"
              }
            />
          </p>
        ) : null}
        {report.can_comment ? <ReportThread reportId={report.id} /> : null}
      </div>

      {report.role === "staff" && isAdmin ? (
        <Link
          href={PRIVATE_ROUTES.ADMIN_REPORTS.path}
          className="text-sm text-primary underline"
          onClick={() => {
            closeReport();
            clearReportParam();
          }}
        >
          <I18N id="reportView.adminLink" />
        </Link>
      ) : null}
    </div>
  );
};

// The report permalink's modal (`/mathtrade?report=<id>`), also opened from
// notifications ("Ver reporte") and from the report box on item cards.
// Portaled and keyed by the open counter, so it stacks above whatever opened
// it (the item preview is portaled too).
const ReportModal = () => {
  const { reportId, openCount } = useReportModalState();

  useReportFromUrl();

  const onClose = useCallback(() => {
    closeReport();
    clearReportParam();
  }, []);

  return reportId ? (
    <FloatingPortal key={openCount}>
      <Modal isOpen onClose={onClose} size="md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pr-8">
          <h2 className="text-xl font-bold">
            <I18N id="reportView.title" values={[reportId]} />
          </h2>
          <CopyLinkButton link={reportPermalink(reportId)} className="mb-0" />
        </div>
        <ReportDetail reportId={reportId} />
        <div className="text-center pt-8">
          <button
            className="border border-gray-400 py-2 px-7 rounded-full hover:bg-gray-400 hover:text-white shadow"
            onClick={onClose}
          >
            <I18N id="btn.Close" />
          </button>
        </div>
      </Modal>
    </FloatingPortal>
  ) : null;
};

export default ReportModal;
