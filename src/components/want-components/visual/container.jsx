import { useRef, useContext, useState, useEffect } from "react";
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

  const [styleRef, setStyleRef] = useState(null);
  const [visibleSec, setVisibleSec] = useState(false);

  useEffect(() => {
    if (visible) {
      setStyleRef(null);
      setVisibleSec(true);
    } else {
      const { height } = targetRef.current.getBoundingClientRect();
      setStyleRef({ height });
      setVisibleSec(false);
    }
  }, [visible]);

  return (
    <div className="visual-section-want mb-4" ref={targetRef} style={styleRef}>
      {visibleSec ? (
        <VisualSectionUI wantGroup={wantGroup} myItemList={myItemList} />
      ) : null}
    </div>
  );
};

export default VisualSectionContainer;
