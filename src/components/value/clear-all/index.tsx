import ButtonAlert from "@/components/buttonAlert";
import ErrorAlert from "@/components/errorAlert";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import useClearAllScores, { ClearScoresScope } from "./useClearAllScores";

type Props = {
  scope: ClearScoresScope;
  className?: string;
};

// Same pill as the header's other controls (SelectModeButton, PageSize),
// in the danger color since it deletes; confirms through ButtonAlert.
const ClearAllScores = ({ scope, className = "mt-2" }: Props) => {
  const { clearAll, loading, error } = useClearAllScores(scope);
  const prefix = scope === "own" ? "value.clearAll.own" : "value.clearAll.others";

  return (
    <div className={className}>
      <ButtonAlert
        className="shrink-0 flex items-center gap-1.5 h-[34px] px-3 rounded-full border border-gray-200 bg-white text-caption font-semibold text-danger transition-colors hover:bg-danger/10 hover:border-danger disabled:opacity-50"
        title={`${prefix}.title`}
        description={`${prefix}.warning`}
        confirmId={`${prefix}.confirm`}
        disabled={loading}
        onClick={clearAll}
      >
        <Icon type="trash" className="text-[13px]" />
        <I18N id={prefix} />
      </ButtonAlert>
      <ErrorAlert error={error} className="mt-2" />
    </div>
  );
};

export default ClearAllScores;
