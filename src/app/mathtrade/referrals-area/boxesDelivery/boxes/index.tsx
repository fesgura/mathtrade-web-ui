import I18N from "@/i18n";
import { useContext, useEffect, useRef } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import { useReferrerView } from "@/context/referrerView";
import Box from "./box";
import ErrorAlert from "@/components/errorAlert";
import Icon from "@/components/icon";
import { LoadingBox } from "@/components/loading";

const Boxes = () => {
  const { boxes, addNewBox, loading, error } = useContext(BoxDeliveryContext);
  const { readOnly } = useReferrerView();

  // A box being created has no id yet. It goes first, right under the button
  // that made it, instead of at the bottom of a long list.
  const drafts = boxes.filter((box: any) => !box.id);
  const open = boxes.filter((box: any) => box.id && !box.closed_at);
  const closed = boxes.filter((box: any) => box.id && box.closed_at);

  // Scroll to a new draft: the bar is sticky, so the user can be far down.
  const draftRef = useRef<HTMLDivElement>(null);
  const draftsCount = useRef(drafts.length);
  useEffect(() => {
    if (drafts.length > draftsCount.current) {
      draftRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    draftsCount.current = drafts.length;
  }, [drafts.length]);

  return (
    <section className="flex flex-col gap-3 sm:gap-4 relative min-h-80">
      {!readOnly && (
        <div className="sticky top-0 z-sticky -mx-1 px-1 py-2 bg-white/95 backdrop-blur-sm border-b border-gray-200 flex sm:justify-end">
          <button
            type="button"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 text-body font-bold text-white bg-primary px-[18px] py-[9px] rounded-full hover:opacity-90 transition-opacity"
            onClick={addNewBox}
          >
            <Icon type="plus" className="w-4 h-4" />
            <I18N id="boxesDelivery.btn.newBox" />
          </button>
        </div>
      )}
      <ErrorAlert error={error} />
      {drafts.map((box: any, index: number) => (
        <div
          key={box.id || `draft-${box.number}`}
          ref={index === 0 ? draftRef : undefined}
          className="scroll-mt-16"
        >
          <Box box={box} />
        </div>
      ))}
      {open.map((box: any) => (
        <Box key={box.id} box={box} />
      ))}
      {closed.map((box: any) => (
        <Box key={box.id} box={box} />
      ))}
      <LoadingBox loading={loading} transparent />
    </section>
  );
};
export default Boxes;
