import Thumbnail from "@/components/thumbnail";

const ElementXSS = ({ element }) => {
  const { title } = element;

  return (
    <div className="border-white/20 border-x border-b p-1">
      <div className="flex items-center gap-x-3 gap-y-2">
        <Thumbnail elements={[element]} className="w-5" />
        <div data-tooltip={title}>
          <h3 className="text-xs font-bold cropped_1 xmax-w-[260px]">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ElementXSS;
