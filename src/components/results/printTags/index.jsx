import Doc from "./doc";

import { PrintTagsContextProvider } from "./context";
import PrintTagRenderer from "./renderer";
import Viewer from "./doc";

const PrintTags = () => {
  return (
    <PrintTagsContextProvider>
      <PrintTagRenderer />
      <Viewer />
    </PrintTagsContextProvider>
  );
};

export default PrintTags;
