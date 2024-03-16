import { useRef, useContext } from "react";
import { WantVisualSectionContext } from "@/context/wantVisualSection";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import VisualSectionUI from "./ui";

const VisualSectionContainer = ({ wantGroup, myItemList }) => {
  const { forceShow } = useContext(WantVisualSectionContext);

  const targetRef = useRef(null);
  const visible = useIntersectionObserver(
    { current: window.document },
    targetRef,
    0,
    forceShow
  );

  return (
    <div className="visual-section-want mb-4" ref={targetRef}>
      {visible ? (
        <VisualSectionUI wantGroup={wantGroup} myItemList={myItemList} />
      ) : null}
    </div>
  );
};

export default VisualSectionContainer;
