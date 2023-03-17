import { useState } from "react";
import BGGsearch from "components/bgg-search";
import { NOGAMEresult } from "config";
import ElementEdit from "./edit";
import ElementCreateStep0 from "./step0";
import { Button } from "reactstrap";
import I18N from "i18n";

//////////////////////////////////////////////

const defaultElementToEdit = {
  id: null,
  bgg_version_id: "",
  thumbnail: "",
  language: "",
  publisher: "",
  year: "",
  dependency: "",
  status: "",
  comment: "",
};

const ElementEditorView = ({
  onClose,
  objToEdit,
  itemList,
  onSaveElement,
  loading,
  errors,
  deleteElement,
  // BGG ELEMENT
  fetchBGGelement,
  BGGelement,
  loadingBGGelement,
  afterAnyChange,
}) => {
  const [step, setStep] = useState(objToEdit.element ? 1 : 0);
  const [type, setType] = useState(0);
  const [repeatedGame, setRepeatedGame] = useState(false);

  const [ElementToEdit, setElementToEdit] = useState(objToEdit.element);

  return step === 0 ? (
    <ElementCreateStep0
      setStep={setStep}
      setType={setType}
      setElementToEdit={() => {
        setElementToEdit({
          ...defaultElementToEdit,
          ...NOGAMEresult,
        });
      }}
      onClose={onClose}
    />
  ) : (
    <div className="element-create-step-2 fade-in">
      {type === 0 && !objToEdit.element ? (
        <div className="element-create_bgg-search">
          <BGGsearch
            label="BGGsearch.Label"
            question="BGGsearch.help"
            onResult={(ops) => {
              let isInItem = false;
              itemList.forEach((itm) => {
                itm.elements.forEach((elem) => {
                  if (elem.bgg_id === ops.bgg_id) {
                    isInItem = true;
                  }
                });
              });
              setRepeatedGame(isInItem);

              setElementToEdit(null);
              setTimeout(() => {
                setElementToEdit({
                  ...ops,
                  ...defaultElementToEdit,
                });
              }, 200);
            }}
          />
          {ElementToEdit ? null : (
            <div className="text-center">
              <Button
                color="link"
                tag="a"
                className="me-2 mb-sm-0 mb-2"
                outline
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                <I18N id="btn.Cancel" />
              </Button>
            </div>
          )}
        </div>
      ) : null}
      {ElementToEdit ? (
        <div className="element-create_edit fade-in">
          <ElementEdit
            element={ElementToEdit}
            create={!objToEdit.element}
            repeatedGame={repeatedGame}
            setRepeatedGame={setRepeatedGame}
            item={objToEdit.item}
            onClose={onClose}
            onSaveElement={onSaveElement}
            loading={loading}
            errors={errors}
            deleteElement={deleteElement}
            // BGG ELEMENT
            fetchBGGelement={fetchBGGelement}
            BGGelement={BGGelement}
            loadingBGGelement={loadingBGGelement}
            afterAnyChange={afterAnyChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ElementEditorView;
