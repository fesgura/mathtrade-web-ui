import { useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import VisualSectionUI from "./ui";

const VisualSection = ({ wantGroup, myItemList }) => {
  const targetRef = useRef(null);
  const visible = useIntersectionObserver(
    { current: window.document },
    targetRef,
    0
  );

  return (
    <div className="visual-section-want mb-4" ref={targetRef}>
      {visible ? (
        <VisualSectionUI wantGroup={wantGroup} myItemList={myItemList} />
      ) : null}
    </div>
  );
};

export default VisualSection;
