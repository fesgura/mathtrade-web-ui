"use client";
import clsx from "clsx";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import useTimeline, { Venue } from "@/hooks/useTimeline";

const DOT_COLOR: Record<number, string> = {
  1: "bg-sky-500",
  2: "bg-want",
  3: "bg-teal-600",
  4: "bg-orange-600",
};

const VenueCard = ({ venue }: { venue: Venue }) => {
  const { name, address, url } = venue;
  const content = (
    <>
      <div className="text-xl">
        <Icon type="map" />
      </div>
      <div className="text-xs pr-1">
        <h5 className="font-bold">{name}</h5>
        {address ? <p>{address}</p> : null}
      </div>
    </>
  );
  const className =
    "mt-1 flex gap-2 bg-primary/10 border border-primary text-sky-900 p-2 rounded-lg w-fit";
  // Linked to the map only when the edition has a map link.
  return url ? (
    <a
      href={url}
      rel="noreferrer nofollow"
      target="_blank"
      className={`${className} hover:opacity-80 transition-opacity`}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

// The edition's calendar as a vertical list: past stages muted, the next one
// highlighted. Used on the home and in the sidebar's calendar panel.
const Calendar = ({ compact = false }: { compact?: boolean }) => {
  const { milestones } = useTimeline();

  if (!milestones.length) return null;

  return (
    <ol>
      {milestones.map(({ key, title, titleValues, color, venue, date, state }, i) => (
        <li
          key={key}
          className={clsx("relative pl-7", compact ? "pb-3" : "pb-5", {
            "opacity-50": state === "past",
          })}
        >
          {/* The line runs from this dot to the next one, so it ends at
              the last dot instead of running on past the last text. */}
          {i < milestones.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-5 -bottom-1 w-0.5 bg-gray-200"
            />
          ) : null}
          <span
            aria-hidden="true"
            className={clsx(
              "absolute left-0 top-1 w-4 h-4 rounded-full ring-4 ring-white",
              DOT_COLOR[color] || "bg-gray-400"
            )}
          />
          <div className="text-xs font-semibold text-gray-600 flex flex-wrap items-center gap-x-2">
            <span>
              {date.weekday} {date.dayMonth} · {date.time} hs
            </span>
            {state === "next" ? (
              <span className="rounded-full bg-primary text-white px-2 py-0.5 text-[10px] uppercase tracking-wide">
                <I18N id="calendar.next" />
              </span>
            ) : null}
          </div>
          <div
            className={clsx(compact ? "text-xs" : "text-sm", {
              "font-semibold text-gray-900": state === "next",
            })}
          >
            <I18N id={title} values={titleValues} />
          </div>
          {venue ? <VenueCard venue={venue} /> : null}
        </li>
      ))}
    </ol>
  );
};

export default Calendar;
