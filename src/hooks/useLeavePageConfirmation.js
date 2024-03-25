"use client";
import SingletonRouter, { Router } from "next/router";
import { useRouter,usePathname } from 'next/navigation'
import { useEffect } from "react";

const defaultConfirmationDialog = async (msg) => window.confirm(msg);

export const useLeavePageConfirmation = (
  shouldPreventLeaving,
  message = "Changes you made may not be saved.",
  confirmationDialog = defaultConfirmationDialog
) => {
  
  const router = usePathname()






};
