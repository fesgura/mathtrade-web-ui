"use client";
import { useMemo } from "react";
import { useStore } from "@/store";
import { getI18Ntext } from "@/i18n";

export type SolidarioVariant = "amba" | "noAmba" | "unknown";

const selectLocationById = (locations: any[] | null, id: unknown) => {
  if (!locations?.length || id == null) return null;
  return locations.find((loc) => loc.id === id) || null;
};

/**
 * AMBA vs not for MT solidario copy.
 * Same signal the rest of the app uses: location.mandatory_attendance
 * (see referral / Mis datos). Membership city first, then account city.
 * Anonymous / missing city → "unknown" (llevar o mandar).
 */
const useSolidarioVerb = (): { variant: SolidarioVariant; verb: string } => {
  const membership = useStore((state) => state.data.membership);
  const user = useStore((state) => state.data.user);
  const locations = useStore((state) => state.locations);

  return useMemo(() => {
    const locationId = membership?.location ?? user?.location ?? null;
    const location = selectLocationById(locations, locationId);

    let variant: SolidarioVariant = "unknown";
    if (location && typeof location.mandatory_attendance === "boolean") {
      variant = location.mandatory_attendance ? "amba" : "noAmba";
    }

    return {
      variant,
      verb: getI18Ntext(`mtSolidario.verb.${variant}`),
    };
  }, [membership, user, locations]);
};

export default useSolidarioVerb;
