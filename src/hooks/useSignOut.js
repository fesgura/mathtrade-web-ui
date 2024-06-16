import { useStore } from "@/store";
import { useCallback } from "react";
import { signOutApi } from "./useFetch/constants/api";
import { removeCookie } from "@/utils/cookies";
import { COOKIE_AUTH_TOKEN } from "@/config/apiConfig";
import { useRouter } from "next/navigation";
import { PRIVATE_ROUTES } from "@/config/routes";

const useSignOut = () => {
  const clearStore = useStore((state) => state.clearStore);
  const router = useRouter();

  return useCallback(() => {
    signOutApi();
    clearStore();
    removeCookie(COOKIE_AUTH_TOKEN);
    router.push(PRIVATE_ROUTES.DEFAULT.path);
  }, [clearStore, router]);
};
export default useSignOut;
