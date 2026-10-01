"use client";
import Link from "next/link";
import I18N from "@/i18n";
import VideoCta from "@/components/videoCta";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/config/routes";
import { rulebookPDFurl } from "@/config/rulebook";
import { linksToHelp } from "@/config/linksToHelp";

const baseURL = process.env.BASE_URL;
const STEPS = [1, 2, 3, 4, 5];

const linkClass =
  "inline-flex items-center gap-1 rounded-full border border-primary text-primary px-3 py-1 text-sm font-semibold hover:bg-primary hover:text-white transition-colors";

// What a Math Trade is and how it works, with the rules to read. Shown on the
// home and in the login's "¿Qué es el Math Trade?" (without the FAQ link:
// the FAQs need a logged-in user).
const WhatIsMT = ({ showFaqLink = true }: { showFaqLink?: boolean }) => (
  <section className="grid md:grid-cols-2 gap-6 items-start">
    <div className="md:order-2">
      <VideoCta />
    </div>
    <div className="md:order-1">
      <h2 className="font-bold text-2xl mb-3">
        <I18N id="whatIsMT.title" />
      </h2>
      <p className="mb-3">
        <I18N id="whatIsMT.lead" />
      </p>
      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mb-5">
        <I18N id="whatIsMT.example" />
      </p>
      <h3 className="font-bold text-lg mb-2">
        <I18N id="whatIsMT.how" />
      </h3>
      <ol className="mb-5 space-y-2">
        {STEPS.map((n) => (
          <li key={n} className="flex gap-3 text-sm">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              {n}
            </span>
            <span className="pt-0.5">
              <I18N id={`whatIsMT.step.${n}`} />
            </span>
          </li>
        ))}
      </ol>
      <h3 className="font-bold text-sm text-gray-600 mb-2">
        <I18N id="whatIsMT.read" />
      </h3>
      <div className="flex flex-wrap gap-2">
        <a
          href={baseURL + rulebookPDFurl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <I18N id="whatIsMT.link.rulebook" />
        </a>
        <a
          href={PUBLIC_ROUTES.TERMS_CONDITIONS.path}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <I18N id="title.TyC" />
        </a>
        {showFaqLink ? (
          <Link href={PRIVATE_ROUTES.FAQS.path} className={linkClass}>
            <I18N id="menu.Faqs" />
          </Link>
        ) : null}
        <a
          href={linksToHelp.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <I18N id="whatIsMT.link.telegram" />
        </a>
      </div>
    </div>
  </section>
);

export default WhatIsMT;
