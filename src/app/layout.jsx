import "./globals.css";
import "@/styles/index.scss";
import localFont from "next/font/local";
import { DOCUMENT_TITLE, DOCUMENT_DESCRIPTION } from "@/config";

//const mainFont = Montserrat({ subsets: ["latin"], weight: ["500", "700"] });

const mainFont = localFont({
  src: [
    {
      path: "./fonts/sfprodisplay-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/sfprodisplay-semibolditalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/sfprodisplay-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: DOCUMENT_TITLE,
  description: DOCUMENT_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={mainFont.className}>{children}</body>
    </html>
  );
}
