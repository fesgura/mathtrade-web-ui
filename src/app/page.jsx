import { redirect } from "next/navigation";
import { PUBLIC_ROUTES } from "@/config/routes";

export default function HomePage() {
  redirect(PUBLIC_ROUTES.DEFAULT.path);
}
