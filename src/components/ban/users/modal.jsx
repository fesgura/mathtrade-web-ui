import Modal from "@/components/modal";
import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import BanUserList from "./userlist";

const BanUsersModal = () => {
  /* PAGE CONTEXT **********************************************/
  const { showBanUsers, setShowBanUsers } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const onClose = useCallback(() => {
    setShowBanUsers(false);
  }, [setShowBanUsers]);

  return (
    <>
      <Modal isOpen={showBanUsers} onClose={onClose} size="md">
        <BanUserList onClose={onClose} />
      </Modal>
    </>
  );
};

export default BanUsersModal;
