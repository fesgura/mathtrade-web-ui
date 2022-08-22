import { useState } from "react";
import BGGsearch from "components/bgg-search";
import ElementEdit from "../edit/index";
import { Button } from "reactstrap";

const ElementCreateStep2 = ({
  setStep,
  onSaveElement,
  loading,
  errors,
  // BGG ELEMENT
  fetchBGGelement,
  BGGelement,
  loadingBGGelement,
}) => {
  const [newElement, setNewElement] = useState(null);

  return (
    <div className="element-create-step-2 fade-in">
      <div className="element-create_bgg-search">
        <BGGsearch
          label="Buscar en la BGG"
          question="Escribí parte del nombre del juego o expansión, y luego seleccioná una de las opciones que aparecen."
          onResult={(ops) => {
            setNewElement(null);
            setTimeout(() => {
              setNewElement({
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
      {newElement ? (
        <div className="element-create_edit fade-in">
          <ElementEdit
            element={newElement}
            create={true}
            item={null}
            onCancel={() => {
              setStep(1);
            }}
            onSaveElement={onSaveElement}
            loading={loading}
            errors={errors}
            // BGG ELEMENT
            fetchBGGelement={fetchBGGelement}
            BGGelement={BGGelement}
            loadingBGGelement={loadingBGGelement}
          />
        </div>
      ) : (
        <div className="text-center">
          <Button
            color="secondary"
            outline
            size="sm"
            onClick={() => {
              setStep(1);
            }}
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};
export default ElementCreateStep2;
