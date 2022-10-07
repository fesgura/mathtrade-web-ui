import { useState } from "react";
import BGGsearch from "components/bgg-search";
import ElementEdit from "./edit";
import ElementCreateStep0 from "./step0";

//////////////////////////////////////////////

const ElementEditorView = ({
  objToEdit,
  onSaveElement,
  loading,
  errors,
  deleteElement,
  // BGG ELEMENT
  fetchBGGelement,
  BGGelement,
  loadingBGGelement,
}) => {
  const [step, setStep] = useState(objToEdit.element ? 1 : 0);

  const [ElementToEdit, setElementToEdit] = useState(objToEdit.element);

  return step === 0 ? (
    <ElementCreateStep0 setStep={setStep} />
  ) : (
    <div className="element-create-step-2 fade-in">
      {!objToEdit.element ? (
        <div className="element-create_bgg-search">
          <BGGsearch
            label="Buscar en la BGG"
            question="Escribí parte del nombre del juego o expansión, y luego seleccioná una de las opciones que aparecen."
            onResult={(ops) => {
              setElementToEdit(null);
              setTimeout(() => {
                setElementToEdit({
                  ...ops,
                  id: null,
                  bgg_version_id: "",
                  thumbnail: "",
                  language: "",
                  publisher: "",
                  year: "",
                  dependency: "",
                  status: "",
                  comment: "",
                });
              }, 200);
            }}
          />
        </div>
      ) : null}
      {ElementToEdit ? (
        <div className="element-create_edit fade-in">
          <ElementEdit
            element={ElementToEdit}
            create={!objToEdit.element}
            item={objToEdit.item}
            onCancel={() => {
              //setStep(1);
            }}
            onSaveElement={onSaveElement}
            loading={loading}
            errors={errors}
            deleteElement={deleteElement}
            // BGG ELEMENT
            fetchBGGelement={fetchBGGelement}
            BGGelement={BGGelement}
            loadingBGGelement={loadingBGGelement}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ElementEditorView;
