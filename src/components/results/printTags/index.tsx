import { useMemo, useState } from "react";
import I18N from "@/i18n";
import { SegmentButton, SegmentedGroup } from "@/components/segmented";
import Viewer from "./doc";
import { labelsPerPart } from "./config";
import type { Tag } from "./types";

// Labels PDF. Sets bigger than `labelsPerPart` are split into parts, each its
// own PDF ("<fileName>_parteN"); only the selected part is drawn and built,
// so memory stays bounded by one part.
const PrintTags = ({
  tags = [],
  fileName = "etiquetas_para_imprimir",
}: {
  tags?: Tag[];
  fileName?: string;
}) => {
  const parts = useMemo(() => {
    const list: Tag[][] = [];
    for (let d = 0; d < tags.length; d += labelsPerPart) {
      list.push(tags.slice(d, d + labelsPerPart));
    }
    return list;
  }, [tags]);
  const [selected, setSelected] = useState(0);
  const part = Math.min(selected, Math.max(parts.length - 1, 0));

  if (!parts.length) {
    return (
      <div className="text-center py-4 text-xl">
        <I18N id="results.tags.notags" />
      </div>
    );
  }

  const single = parts.length === 1;

  return (
    <>
      {single ? null : (
        <div className="text-center pt-2">
          <p className="text-sm text-gray-600 mb-2">
            <I18N id="results.tags.parts" values={[tags.length, parts.length]} />
          </p>
          <SegmentedGroup>
            {parts.map((_part, k) => (
              <SegmentButton
                key={k}
                active={k === part}
                onClick={() => setSelected(k)}
              >
                <I18N id="results.tags.part" values={[k + 1, parts.length]} />
              </SegmentButton>
            ))}
          </SegmentedGroup>
        </div>
      )}
      <Viewer
        key={part}
        tags={parts[part]}
        fileName={single ? fileName : `${fileName}_parte${part + 1}`}
      />
    </>
  );
};

export default PrintTags;
