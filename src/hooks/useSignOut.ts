import { useStore } from "@/store";
import { useCallback, useContext } from "react";
import type { StoreState } from "@/store/types";
import { signOutApi } from "./useFetch/constants/api";
import { removeCookie } from "@/utils/cookies";
import { COOKIE_AUTH_TOKEN } from "@/config/apiConfig";
import { useRouter } from "next/navigation";
import { PUBLIC_ROUTES } from "@/config/routes";
import { PrivateEnvironmentContext } from "@/environments/private";

const useSignOut = () => {
  const { setEnableRenderPrivateEnvironment } = useContext(
    PrivateEnvironmentContext
  );
  const clearStore = useStore((state: StoreState) => state.clearStore);
  const router = useRouter();

  return useCallback(() => {
    setEnableRenderPrivateEnvironment();
    signOutApi();
    removeCookie(COOKIE_AUTH_TOKEN);
    router.push(PUBLIC_ROUTES.DEFAULT.path);
  }, [setEnableRenderPrivateEnvironment, router]);
};
export default useSignOut;
