"use client";
import { useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import WantGroupLabelUI from "./ui";

const WantGroupLabel = ({ rootRef = null, wantGroup = null }) => {
  const targetRef = useRef(null);
  const visible = useIntersectionObserver(rootRef, targetRef);

  return (
    <div className="h-8 w-52 sm:w-80 lg:w-[32rem]" ref={targetRef}>
      {visible ? <WantGroupLabelUI wantGroup={wantGroup} /> : null}
    </div>
  );
};

export default WantGroupLabel;
