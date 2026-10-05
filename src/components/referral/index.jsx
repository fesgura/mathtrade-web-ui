import Icon from "../icon";
import I18N from "@/i18n";
import { useStore } from "@/store";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { formatDateString } from "@/utils/dateUtils";

const selectLocationById = (locations, id) => {
  const item = locations ? locations.filter((loc) => loc.id === id) : [];
  return item[0] || null;
};
//
// floatingButton (home): the section goes at the bottom of the page, and a
// floating "Ver representante" button scrolls down to it smoothly; the button
// sinks and fades into the section as it comes into view.
const Referral = ({ floatingButton = false }) => {
  const { membership, mathtrade } = useStore((state) => state.data);
  const locations = useStore((state) => state.locations);

  const meetingDay = useMemo(() => {
    return formatDateString(mathtrade?.meeting_date || null);
  }, [mathtrade]);

  const currentLocation = useMemo(() => {
    if (locations && locations.length && membership?.location) {
      return selectLocationById(locations, membership?.location);
    }
    return null;
  }, [membership, locations]);

  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const hasReferral = !!(currentLocation && currentLocation.referral);

  useEffect(() => {
    if (!floatingButton || !hasReferral || !sectionRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [floatingButton, hasReferral]);

  const goToSection = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlight(true);
    setTimeout(() => setHighlight(false), 1600);
  }, []);

  return hasReferral ? (
    <div
      ref={sectionRef}
      id="representante"
      className={clsx(
        "text-center mb-4 rounded-xl transition-shadow duration-700",
        { "shadow-[0_0_0_4px_rgba(14,165,233,0.35)]": highlight }
      )}
    >
      {floatingButton ? (
        <button
          type="button"
          onClick={goToSection}
          aria-hidden={inView}
          tabIndex={inView ? -1 : 0}
          className={clsx(
            "fixed z-nav left-1/2 -translate-x-1/2 bottom-[calc(var(--mt-tabbar-h)+0.75rem)] lg:bottom-6",
            "inline-flex items-center gap-2 rounded-full bg-primary text-white shadow-xl px-5 py-2 text-sm font-semibold",
            "transition-all duration-500 ease-out motion-reduce:transition-none",
            inView
              ? "opacity-0 translate-y-10 scale-75 pointer-events-none"
              : "opacity-100 translate-y-0 scale-100 hover:opacity-90"
          )}
        >
          <Icon type="user" />
          <I18N id="referral.floating" />
          <span aria-hidden="true">↓</span>
        </button>
      ) : null}
      {currentLocation.mandatory_attendance ? (
        <p className="mb-4 description">
          <I18N
            id="myData.help.AMBA"
            values={[meetingDay.day, meetingDay.hour]}
          />
          {/* The edition's venue (admin panel); nothing until it's set. */}
          {mathtrade?.venue_name ? (
            <>
              <br />
              <a
                href={mathtrade.venue_map_url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="in-body"
              >
                {mathtrade.venue_name}
                {mathtrade.venue_address ? (
                  <>
                    <br />
                    {mathtrade.venue_address}
                  </>
                ) : null}
                {mathtrade.venue_map_url ? (
                  <Icon type="external-link" className="ml-1" />
                ) : null}
              </a>
            </>
          ) : null}
          <br />
          <br />
          <I18N
            id="myData.help.AMBA2"
            values={[
              `${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`,
            ]}
          />
        </p>
      ) : (
        <p className="mb-4">
          <I18N id="myData.help.noAMBA1" values={[currentLocation?.name]} />
          {currentLocation?.referral &&
          currentLocation?.referral?.first_name ? (
            <I18N
              id="myData.help.noAMBA2"
              values={[
                `${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`,
                currentLocation?.name,
              ]}
            />
          ) : null}
        </p>
      )}

      {currentLocation?.referral && currentLocation?.referral?.first_name ? (
        <div
          className="bg-white  shadow-md rounded-lg  mb-4 p-4 max-w-xl mx-auto"
          //style={{ maxWidth: 500, margin: "0 auto 30px" }}
        >
          <div className="description">
            <h3 className="font-bold text-xl mb-3">{`${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`}</h3>

            <div className="referal-items">
              {currentLocation?.referral?.telegram ? (
                <div className="referal-item mb-2">
                  <Icon type="telegram" className="mr-2" />
                  <b>Telegram:</b>{" "}
                  <a
                    href={`https://t.me/${currentLocation?.referral?.telegram}`}
                    target="_blank"
                  >
                    {currentLocation?.referral?.telegram}
                  </a>
                </div>
              ) : null}
              {currentLocation?.referral?.whatsapp ? (
                <div className="referal-item mb-2">
                  <Icon type="whatsapp" className="mr-2" />
                  <b>Whatsapp:</b>{" "}
                  <a
                    href={`https://wa.me/${currentLocation?.referral?.whatsapp}`}
                    target="_blank"
                  >
                    {currentLocation?.referral?.whatsapp}
                  </a>
                </div>
              ) : null}
              {currentLocation?.referral?.email ? (
                <div className="referal-item">
                  <Icon type="envelope" className="mr-2" />
                  <b>Email:</b>{" "}
                  <a
                    href={"mailto:" + currentLocation?.referral?.email}
                    target="_blank"
                  >
                    {currentLocation?.referral?.email}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};
export default Referral;
