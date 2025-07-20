"use client";
import { useEffect } from "react";
import Router from "next/router";

const defaultConfirmationDialog = async (msg: string) => window.confirm(msg);

export const useLeavePageConfirmation = (
  shouldPreventLeaving: boolean,
  message = "Changes you made may not be saved.",
  confirmationDialog = defaultConfirmationDialog
) => {
  useEffect(() => {
    if (!shouldPreventLeaving) return;

    const handleRouteChangeStart = (url: string) => {
      if (!confirmationDialog(message)) {
        Router.events.emit("routeChangeError");
        throw "Route change aborted by user";
      }
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    window.onbeforeunload = () => message;

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      window.onbeforeunload = null;
    };
  }, [shouldPreventLeaving, message, confirmationDialog]);
};
