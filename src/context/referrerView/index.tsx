"use client";
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { PageContext } from "@/context/page";
import { useStore } from "@/store";

// Which edition and location the referrers area shows. Referrers always see
// the edition in course and their own location. Admins can pick both to see
// the area as that location's referrer did in that edition: read-only, and
// the backend only honors these params for admins on reads.
type ReferrerView = {
  isAdmin: boolean;
  mathtradeId: number | null;
  setMathtradeId: (id: number | null) => void;
  // The chosen location, or the user's own (undefined for an admin)
  viewLocationId: number | undefined;
  setLocationId: (id: number | null) => void;
  // Same, falling back to the event location (1), as the area always did
  localLocation: number;
  locationName: string;
  readOnly: boolean;
  params: { mathtrade?: number; as_location?: number };
};

export const ReferrerViewContext = createContext<ReferrerView>({
  isAdmin: false,
  mathtradeId: null,
  setMathtradeId: () => {},
  viewLocationId: undefined,
  setLocationId: () => {},
  localLocation: 1,
  locationName: "",
  readOnly: false,
  params: {},
});

export const useReferrerView = () => useContext(ReferrerViewContext);

export const ReferrerViewProvider = ({ children }: { children: ReactNode }) => {
  const { referrer } = useContext(PageContext);
  const isAdmin = useStore((state) => Boolean(state.data?.user?.math_admin));
  const storedMathtradeId = useStore(
    (state) => state.data?.mathtrade?.id ?? null,
  );
  const locations = useStore((state) => state.locations);

  const [chosenMathtradeId, setMathtradeId] = useState<number | null>(null);
  const [chosenLocationId, setLocationId] = useState<number | null>(null);

  const ownLocationId: number | undefined = referrer?.id;
  const mathtradeId = (isAdmin && chosenMathtradeId) || storedMathtradeId;
  const viewLocationId = (isAdmin && chosenLocationId) || ownLocationId;
  const localLocation = viewLocationId || 1;

  const otherEdition = mathtradeId !== storedMathtradeId;
  const otherLocation = localLocation !== (ownLocationId || 1);

  const params = useMemo(() => {
    const next: ReferrerView["params"] = {};
    if (otherEdition && mathtradeId) next.mathtrade = mathtradeId;
    if (otherLocation) next.as_location = localLocation;
    return next;
  }, [otherEdition, otherLocation, mathtradeId, localLocation]);

  const locationName = useMemo(() => {
    const list = Array.isArray(locations) ? locations : [];
    return (
      list.find((loc: any) => loc.id === viewLocationId)?.name ||
      (viewLocationId === ownLocationId ? referrer?.name : "") ||
      ""
    );
  }, [locations, viewLocationId, ownLocationId, referrer]);

  const value = useMemo(
    () => ({
      isAdmin,
      mathtradeId,
      setMathtradeId,
      viewLocationId,
      setLocationId,
      localLocation,
      locationName,
      readOnly: isAdmin && (otherEdition || otherLocation),
      params,
    }),
    [
      isAdmin,
      mathtradeId,
      viewLocationId,
      localLocation,
      locationName,
      otherEdition,
      otherLocation,
      params,
    ],
  );

  return (
    <ReferrerViewContext.Provider value={value}>
      {children}
    </ReferrerViewContext.Provider>
  );
};
