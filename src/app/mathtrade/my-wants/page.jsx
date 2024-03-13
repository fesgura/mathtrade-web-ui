"use client";
import MyWantsUI from "./ui";
import { MyWantsContextProvider } from "@/context/myWants/all";

export default function MyWants() {
  return (
    <MyWantsContextProvider>
      <MyWantsUI />
    </MyWantsContextProvider>
  );
}
