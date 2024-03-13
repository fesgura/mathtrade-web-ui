import { useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import WantGroupLabelUI from "./ui";

const WantGroupLabel = ({ rootRef, wantGroup }) => {
  const targetRef = useRef(null);
  const visible = useIntersectionObserver(rootRef, targetRef);

  return (
    <div className="h-8 w-64" ref={targetRef}>
      {visible ? <WantGroupLabelUI wantGroup={wantGroup} /> : null}
    </div>
  );
};

export default WantGroupLabel;
