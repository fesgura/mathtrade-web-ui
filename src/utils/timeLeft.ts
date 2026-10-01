import { getI18Ntext } from "@/i18n";

const HOUR_MS = 1000 * 60 * 60;
const DAY_MS = HOUR_MS * 24;

export const msLeftUntil = (isoDate: string) =>
  Math.max(0, new Date(isoDate).getTime() - Date.now());

// Calendar days in Argentina's time, like people count them: from Thursday
// noon to Saturday noon is "2 días" (whole days, rounded down, said "1 día").
// Under a day left, hours.
const AR_DAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Argentina/Buenos_Aires",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const calendarDaysUntil = (msLeft: number) => {
  const now = Date.now();
  const today = Date.parse(AR_DAY.format(now));
  const target = Date.parse(AR_DAY.format(now + msLeft));
  return Math.round((target - today) / DAY_MS);
};

export const timeLeftLabel = (msLeft: number) => {
  if (msLeft <= 0) return getI18Ntext("menu.stage.today");
  if (msLeft < DAY_MS) {
    const hours = Math.ceil(msLeft / HOUR_MS);
    return hours === 1
      ? getI18Ntext("menu.stage.1hour")
      : getI18Ntext("menu.stage.hours", [hours]);
  }
  const days = Math.max(1, calendarDaysUntil(msLeft));
  return days === 1
    ? getI18Ntext("menu.stage.1day")
    : getI18Ntext("menu.stage.days", [days]);
};
