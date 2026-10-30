import { PrintTagsContextProvider } from "./context";
import PrintTagRenderer from "./renderer";
import Viewer from "./doc";
import { elementPerPage } from "./config";
import type { Tag } from "./types";

const PrintTags = ({
  tags = [],
  fileName = "etiquetas_para_imprimir",
}: {
  tags?: Tag[];
  fileName?: string;
}) => {
  return (
    <PrintTagsContextProvider>
      <PrintTagRenderer tags={tags} />
      <Viewer
        fileName={fileName}
        total={Math.ceil(tags.length / elementPerPage)}
      />
    </PrintTagsContextProvider>
  );
};

export default PrintTags;
