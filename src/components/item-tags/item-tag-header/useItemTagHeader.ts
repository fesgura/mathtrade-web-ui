import {
  useState,
  useMemo,
  useContext,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import { colorTagStyles } from "@/utils/color";
import { TagContext } from "@/context/tag";
import { PageContext } from "@/context/page";
import { visibleTagItems, type MyTag } from "@/utils/tagItems";

type ItemTagHeaderState = {
  tag: MyTag | null;
  showingBans: boolean;
  tagColor: ReturnType<typeof colorTagStyles>;
  count: number;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  visibleEdit: boolean;
  setVisibleEdit: Dispatch<SetStateAction<boolean>>;
  onChangeValue: () => void;
  canIEdit: boolean;
};

const useItemTagHeader = (): ItemTagHeaderState => {
  /* PAGE CONTEXT **********************************************/
  const { forceReloadPage, canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* TAG CONTEXT **********************************************/
  const { tag, showingBans } = useContext(TagContext);
  /* end TAG CONTEXT */

  const [expanded, setExpanded] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const tagColor = useMemo(() => {
    return colorTagStyles(tag ? tag.color : "#000");
  }, [tag]);

  const onChangeValue = useCallback(() => {
    forceReloadPage();
  }, [forceReloadPage]);

  return {
    tag,
    showingBans,
    tagColor,
    // Ignored copies stay tagged but can't be wanted: not counted.
    count: visibleTagItems(tag?.itemsComplete).length,
    expanded,
    setExpanded,
    visibleEdit,
    setVisibleEdit,
    onChangeValue,
    canIEdit: canI.offer || canI.want,
  };
};
export default useItemTagHeader;
