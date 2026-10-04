"use client";
import { useState } from "react";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import Wrapper from "@/components/wrapper";
import useSolidarioVerb from "@/hooks/useSolidarioVerb";

/* Site-wide MT solidario notice: bring/send games for Hospital Garrahan.
 * Celeste (sky) — informational, not an urgent red Adv*. Verb from city:
 * AMBA = llevar, outside = mandar, unknown = llevar o mandar. */
const AdvSolidario = () => {
  const [showAdvice, setShowAdvice] = useState(true);
  const { verb } = useSolidarioVerb();

  if (!showAdvice) return null;

  return (
    <Wrapper className="mt-main">
      <div className="relative w-full max-w-full min-w-0 text-center text-sm sm:text-base leading-snug break-words p-2 pr-8 shadow-main rounded-main border border-sky-300 bg-sky-100 text-sky-950">
        <I18N id="mtSolidario.banner" values={[verb]} />
        <button
          type="button"
          className="absolute top-1 right-1 w-6 h-6"
          onClick={() => setShowAdvice(false)}
          aria-label="Cerrar"
        >
          <Icon />
        </button>
      </div>
    </Wrapper>
  );
};

export default AdvSolidario;
