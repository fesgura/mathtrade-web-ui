"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { redirect } from "next/navigation";
import { isExpiredDate } from "@/utils";
import { signOutApi } from "@/hooks/useFetch/constants/api";
import { PRIVATE_ROUTES } from "@/config/routes";
import LoadingBalls from "@/components/loading/balls";

export default function PublicEnvironment({ children }) {
  const store = useStore((state) => state.data);
  const clearStore = useStore((state) => state.clearStore);

  const [enabledRender, setEnabledRender] = useState(false);

  useEffect(() => {
    const loggedToPrivate =
      store.auth.token && !isExpiredDate(store.auth.expires);
    if (loggedToPrivate) {
      // Go to Private
      redirect(PRIVATE_ROUTES.DEFAULT.path);
    } else {
      // Keep Public
      signOutApi();
      setEnabledRender(true);
    }
  }, [store]);

  useEffect(() => {
    // Reset store
    if (enabledRender) clearStore();
  }, [enabledRender, clearStore]);

  return enabledRender ? (
    children
  ) : (
    <div className="h-72 relative">
      <LoadingBalls />
    </div>
  );
}
