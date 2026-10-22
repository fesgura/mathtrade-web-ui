"use client";
import Link from "next/link";
import Button from "@/components/button";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import type { DuplicatesResponse } from "@/hooks/useDuplicateWants";
import { decodeEntities, displayGroups } from "@/utils/duplicateDisplay";

type DuplicatesModalProps = {
  isOpen: boolean;
  data: DuplicatesResponse | null;
  onClose: () => void;
  // "commit": before "Confirmar compromiso" (Revisar / Confirmar igual).
  // "view": from the banner (Cerrar / Ir a Mis deseos).
  mode: "commit" | "view";
  onConfirm?: () => void;
};

// "ejemplar suelto" / "N ejemplares sueltos": item wants on the same copy
// title, collapsed by displayGroups.
const CopiesLabel = ({ count }: { count: number }) => (
  <I18N
    id={`commitDuplicates.items.${count === 1 ? "one" : "many"}`}
    values={[count]}
  />
);

// Lists the wants that could bring the same game twice. Names and owners are
// user-provided, so they render as JSX text, never through I18N `values`
// (I18N renders its text as HTML); decodeEntities only turns BGG's `&amp;`
// and friends into plain characters.
const DuplicatesModal = ({
  isOpen,
  data,
  onClose,
  mode,
  onConfirm = () => {},
}: DuplicatesModalProps) => {
  if (!data) return null;
  const count = data.count;

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <div className="text-center">
          <h3 className="text-xl font-bold text-center mb-2">
            <I18N
              id={`commitDuplicates.title.${count === 1 ? "one" : "many"}`}
              values={[count]}
            />
          </h3>
          <p className="text-sm text-gray-700 text-center text-balance">
            <I18N id="commitDuplicates.intro" />
          </p>
        </div>
        <ul className="mt-3 max-h-[60dvh] overflow-y-auto divide-y divide-gray-200 text-left text-sm">
          {data.duplicates.map((dup) => (
            <li
              key={`${dup.kind}-${dup.bgg_id ?? dup.item_id}`}
              className="py-1.5 break-words"
            >
              <strong>{decodeEntities(dup.name)}</strong>
              {dup.owner ? <> · {decodeEntities(dup.owner)}</> : null}
              {" — "}
              {displayGroups(dup).map((g, i) => (
                <span key={g.key}>
                  {i > 0 ? ", " : null}
                  {g.type !== "item" ? (
                    <>
                      {g.name} (
                      <I18N id={`commitDuplicates.type.${g.type}`} />)
                    </>
                  ) : g.name === null ? (
                    <CopiesLabel count={g.count} />
                  ) : (
                    <>
                      {g.name} (<CopiesLabel count={g.count} />)
                    </>
                  )}
                </span>
              ))}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {mode === "commit" ? (
            <>
              <Button type="button" color="cancel" outline onClick={onClose}>
                <I18N id="commitDuplicates.review" />
              </Button>
              <Button
                type="button"
                color="danger"
                className="px-6"
                onClick={onConfirm}
              >
                <I18N id="commitDuplicates.confirm" />
              </Button>
            </>
          ) : (
            <>
              <Button type="button" color="cancel" outline onClick={onClose}>
                <I18N id="commitDuplicates.close" />
              </Button>
              <Link
                href={PRIVATE_ROUTES.WANTS.path}
                onClick={onClose}
                className="inline-block rounded-full bg-primary text-white hover:opacity-75 transition-opacity px-6 py-3 text-lg"
              >
                <I18N id="commitDuplicates.goWants" />
              </Link>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DuplicatesModal;
