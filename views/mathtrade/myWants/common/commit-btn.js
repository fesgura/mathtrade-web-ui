import Icon from "components/icon";
import I18N from "i18n";
import { Button } from "reactstrap";

const CommitBtn = ({
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
  canEditWants,
}) => {
  return (
    <>
      <Button
        color={
          !mustCommitChanges || commitChangesLoading || !canEditWants
            ? "gray"
            : "danger"
        }
        disabled={!mustCommitChanges || commitChangesLoading || !canEditWants}
        onClick={commitChanges}
      >
        <Icon
          type={commitChangesLoading ? "refresh fa-spin" : "check"}
          className="me-2"
        />
        <I18N id="MyWants.btn.Commit" />
      </Button>
      {!mustCommitChanges || commitChangesLoading || !canEditWants ? null : (
        <p className="muted small italic m-0 pt-2 px-4">
          <I18N id="MyWants.btn.Commit.help" />
        </p>
      )}
    </>
  );
};

export default CommitBtn;
