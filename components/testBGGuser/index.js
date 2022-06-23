import { Button } from "reactstrap";
import { useApi, BggUserService } from "api";
import Icon from "components/icon";

const TestBGGuser = ({ username, onValidateUser }) => {
  const [getBGGuser, , loading] = useApi({
    promise: BggUserService.get,
    forBGG: true,
    afterLoad: (data) => {
      if (data && data.user && data.user.id && data.user.id !== "") {
        onValidateUser("yes");
      } else {
        onValidateUser("no");
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
      Comprobar usuario en BGG
    </Button>
  );
};
export default TestBGGuser;
