"use client";
import { useEffect } from "react";
import { initConsoleBuffer } from "@/utils/consoleBuffer";
import { initNetworkBuffer } from "@/utils/networkBuffer";

const ConsoleBufferInit = () => {
  useEffect(() => {
    initConsoleBuffer();
    initNetworkBuffer();
  }, []);

  return null;
};

export default ConsoleBufferInit;
