import { Button } from "reactstrap";
import { useApi, BggService } from "api_serv";
import Icon from "components/icon";
import I18N from "i18n";

const TestBGGuser = ({ username, onValidateUser, onGetAvatar }) => {
  const [getBGGuser, , loading] = useApi({
    promise: BggService.getUser,
    forBGG: true,
    afterLoad: (data) => {
      if (data && data.user && data.user.id && data.user.id !== "") {
        onValidateUser("yes");
      } else {
        onValidateUser("no");
      }
      if (
        data &&
        data.user &&
        data.user.avatarlink &&
        data.user.avatarlink.value
      ) {
        onGetAvatar(data.user.avatarlink.value);
      }
    },
  });
  return (
    <Button
      color="orange"
      size="sm"
      outline
      disabled={loading}
      onClick={() => {
        getBGGuser(username);
      }}
    >
      {loading ? <Icon type="loading" className="me-1" /> : null}

      <I18N id="btn.TestBGGuser" />
    </Button>
  );
};
export default TestBGGuser;
