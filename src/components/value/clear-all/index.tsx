import ButtonAlert from "@/components/buttonAlert";
import ErrorAlert from "@/components/errorAlert";
import I18N from "@/i18n";
import useClearAllScores, { ClearScoresScope } from "./useClearAllScores";

type Props = {
  scope: ClearScoresScope;
  className?: string;
};

// Mirrors UnignoreAll: underline confirm-link + ButtonAlert modal.
const ClearAllScores = ({ scope, className = "mt-2" }: Props) => {
  const { clearAll, loading, error } = useClearAllScores(scope);
  const prefix = scope === "own" ? "value.clearAll.own" : "value.clearAll.others";

  return (
    <div className={className}>
      <ButtonAlert
        className="text-primary underline hover:text-sky-700 text-xs font-bold"
        title={`${prefix}.title`}
        description={`${prefix}.warning`}
        confirmId={`${prefix}.confirm`}
        disabled={loading}
        onClick={clearAll}
      >
        <I18N id={prefix} />
      </ButtonAlert>
      <ErrorAlert error={error} className="mt-2" />
    </div>
  );
};

export default ClearAllScores;
