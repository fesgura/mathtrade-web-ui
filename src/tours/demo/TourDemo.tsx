"use client";
import { useEffect, useRef, type ReactNode } from "react";
import I18N from "@/i18n";

/**
 * An example card for the guided tutorial, shown only while a tour runs on an
 * empty list (useTourDemo). Marked "Ejemplo", and inert: it can't be
 * clicked or focused, so nothing in it calls the API. useTour finds it by
 * data-tour-demo and adds a "this is an example" line to its steps.
 */
const TourDemo = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  // React 18 has no `inert` prop: set the attribute directly.
  useEffect(() => {
    ref.current?.setAttribute("inert", "");
  }, []);
  return (
    <div
      ref={ref}
      data-tour-demo=""
      className={className ? `tour-demo ${className}` : "tour-demo"}
      aria-hidden="true"
    >
      <span className="tour-demo-badge">
        <I18N id="tour.demoBadge" />
      </span>
      {children}
    </div>
  );
};

export default TourDemo;
