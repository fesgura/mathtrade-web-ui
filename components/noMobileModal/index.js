import { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import storage from "utils/storage";

const NoMobileModal = () => {
  const [visible, set_visible] = useState(false);

  useEffect(() => {
    const cancelMobileAdv = storage.getFromOptions("cancelMobileAdv");
    set_visible(!cancelMobileAdv);
  }, []);

  return (
    <Modal
      isOpen={visible}
      toggle={() => {
        set_visible(false);
      }}
      centered
      size="sm"
    >
      <ModalBody>
        <div className="text-center">
          <p>
            Este sitio <b>NO ESTÁ</b> preparado para MOBILE todavía.
            <br />
            (Pantallas pequeñas y teléfonos celulares).
          </p>

          <Button
            color="primary"
            onClick={() => {
              storage.setToOptions({
                cancelMobileAdv: true,
              });
              set_visible(false);
            }}
          >
            Ok, lo entiendo
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default NoMobileModal;
