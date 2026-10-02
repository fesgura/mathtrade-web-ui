import { formatDateString } from "@/utils/dateUtils";

// "19/10 a las 23:59" for the receipt deadline the backend sends
// (membership.contribution.upload_until), or "" when there's none.
export const contributionDeadline = (uploadUntil) => {
  if (!uploadUntil) return "";
  const { dateObj, hour } = formatDateString(uploadUntil);
  return `${dateObj.day}/${dateObj.month} a las ${hour}`;
};
