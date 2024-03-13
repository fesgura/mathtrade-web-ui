import { useState, useMemo, useContext, useCallback } from "react";
import { colorTagStyles } from "@/utils/color";
import { TagContext } from "@/context/tag";
import { PageContext } from "@/context/page";

const useItemTagHeader = () => {
  /* PAGE CONTEXT **********************************************/
  const { forceReloadPage } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* TAG CONTEXT **********************************************/
  const { tag } = useContext(TagContext);
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
    tagColor,
    count: tag?.items?.length || 0,
    expanded,
    setExpanded,
    visibleEdit,
    setVisibleEdit,
    onChangeValue,
  };
};
export default useItemTagHeader;
