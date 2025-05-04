import PreviewerItem from "@/components/previewerItem";
import ValueMini from "@/components/value/mini";
import { colorTagStyles } from "@/utils/color";

const Item = ({ myItem }) => {
  const { id, color, title, value } = myItem;

  return (
    <div
      className="w-8 h-40 border-b border-r border-gray-300 relative"
      style={{ backgroundColor: colorTagStyles(color).backgroundColor }}
    >
      <div className="text-left h-8 w-40 leading-none absolute bottom-0 left-8 origin-bottom-left -rotate-90 flex items-center gap-2 justify-between">
        <h4 className="cropped_1 text-xs font-bold pl-2" title={title}>
          {title}
        </h4>
        <div className="flex items-center gap-1 pr-1">
          <div className="rotate-90">
            <PreviewerItem itemId={id} notooltip />
          </div>
          <div className="rotate-90">
            <ValueMini currentValue={value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
