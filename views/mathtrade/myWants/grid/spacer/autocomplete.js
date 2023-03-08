import { useState } from "react";
import Icon from "components/icon";
import { Button, Modal, ModalBody } from "reactstrap";
import Question from "components/question";
import I18N from "i18n";
import { useApi, MathTradeService } from "api_serv";
import ErrorAlert from "components/errorAlert";
import { LoadingBox } from "components/loading";

const AutoCompleteButton = ({ canEditWants, reloadWants }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen((v) => !v);
  };

  const [autocompleteWants, , loading, errors] = useApi({
    promise: MathTradeService.autocompleteWants,
    // initialState: [],
    afterLoad: () => {
      setModalOpen(false);
      reloadWants();
    },
  });

  return (
    <>
      <Button
        color="primary"
        size="xs"
        className="py-1"
        onClick={() => {
          setModalOpen(true);
        }}
        disabled={!canEditWants}
      >
        <Icon type="star" className="me-2" />
        <I18N id="btn.Autocomplete" />
      </Button>
      <Question question="Autocomplete.help" />

      {modalOpen ? (
        <Modal isOpen={true} toggle={toggleModal} centered size="md">
          <ModalBody className="text-center p-4 relative">
            <p>
              <I18N id="Autocomplete.modal.help" />
            </p>
            <ErrorAlert errors={errors} />
            <div className="pt-3">
              <Button
                color="link"
                // tag="a"
                className="me-2 mb-sm-0 mb-2"
                outline
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                <I18N id="btn.Cancel" />
              </Button>
              <Button
                color="danger"
                type="submit"
                onClick={() => {
                  autocompleteWants();
                }}
              >
                <Icon type="star" className="me-2" />
                <I18N id="btn.YesAutocomplete" />
              </Button>
            </div>
            {loading ? <LoadingBox /> : null}
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};

export default AutoCompleteButton;
