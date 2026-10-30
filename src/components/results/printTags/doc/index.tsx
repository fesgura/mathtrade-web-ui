import I18N from "@/i18n";
import Icon from "@/components/icon";
import useLabelsPdf from "../useLabelsPdf";
import Tutorial from "../tutorial";
import type { Tag } from "../types";

// Preview + download of one PDF. The PDF is built once (useLabelsPdf) and
// the same blob URL feeds the iframe, the download and the "open" link;
// nothing is offered until it's ready.
const Viewer = ({
  tags = [],
  fileName = "etiquetas_para_imprimir",
}: {
  tags?: Tag[];
  fileName?: string;
}) => {
  const { status, drawn, total, url } = useLabelsPdf(tags);

  if (status === "error") {
    return (
      <div className="text-center py-4 text-xl text-red-700">
        <I18N id="results.tags.error" />
      </div>
    );
  }

  if (status !== "ready") {
    return (
      <div className="text-center py-4 text-xl">
        {status === "building" ? (
          <I18N id="results.tags.building" />
        ) : (
          <I18N id="results.tags.generating" values={[drawn, total]} />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="py-5 text-center">
        <Tutorial />
        <a
          className="inline-block bg-primary text-white py-3 px-7 text-2xl rounded-xl"
          href={url}
          download={`${fileName}.pdf`}
        >
          <Icon type="download" className="mr-1" />
          <I18N id="results.tags.btn.download" />
        </a>
        <div className="pt-6 xl:hidden block">
          <a
            href={url}
            className="text-primary hover:text-sky-900 underline"
            target="_blank"
            rel="noreferrer"
          >
            <I18N id="results.tags.btn.open" />
            <Icon type="external-link" className="mr-1" />
          </a>
        </div>
      </div>

      <div className="xl:block hidden">
        <iframe
          src={url}
          title={fileName}
          width="100%"
          height={900}
          className="border-0"
        />
      </div>
    </>
  );
};

export default Viewer;
