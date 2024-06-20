import { useStore } from "@/store";
import { useCallback, useContext } from "react";
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

  const clearStore = useStore((state) => state.clearStore);
  const router = useRouter();

  return useCallback(() => {
    setEnableRenderPrivateEnvironment(false);
    signOutApi();
    clearStore();
    removeCookie(COOKIE_AUTH_TOKEN);
    router.push(PUBLIC_ROUTES.DEFAULT.path);
  }, [setEnableRenderPrivateEnvironment, clearStore, router]);
};
export default useSignOut;
