import "./globals.css";
import "@/styles/index.scss";
import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DOCUMENT_TITLE, DOCUMENT_DESCRIPTION } from "@/config";
import ConsoleBufferInit from "@/components/consoleBufferInit";
import SentryUser from "@/components/sentryUser";
import DataTooltipRoot from "@/components/tooltip/DataTooltipRoot";

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
  // Without this, Next's automatic fallback while sfprodisplay loads (or if it fails)
  // adjusts metrics against Arial — that's the "Arial feo" flash, not a real second font.
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: DOCUMENT_TITLE,
  description: DOCUMENT_DESCRIPTION,
  icons: {
    icon: [
      {
        type: "image/png",
        sizes: "192x192",
        url: "/favicon/android-icon-192x192.png",
      },
      { type: "image/png", sizes: "32x32", url: "/favicon/favicon-32x32.png" },
      { type: "image/png", sizes: "96x96", url: "/favicon/favicon-96x96.png" },
      { type: "image/png", sizes: "16x16", url: "/favicon/favicon-16x16.png" },
      { type: "image/x-icon", url: "/favicon/favicon.ico" },
    ],
    apple: [
      {
        type: "image/png",
        sizes: "57x57",
        url: "/favicon/apple-icon-57x57.png",
      },
      {
        type: "image/png",
        sizes: "60x60",
        url: "/favicon/apple-icon-60x60.png",
      },
      {
        type: "image/png",
        sizes: "72x72",
        url: "/favicon/apple-icon-72x72.png",
      },
      {
        type: "image/png",
        sizes: "76x76",
        url: "/favicon/apple-icon-76x76.png",
      },
      {
        type: "image/png",
        sizes: "114x114",
        url: "/favicon/apple-icon-114x114.png",
      },
      {
        type: "image/png",
        sizes: "120x120",
        url: "/favicon/apple-icon-120x120.png",
      },
      {
        type: "image/png",
        sizes: "144x144",
        url: "/favicon/apple-icon-144x144.png",
      },
      {
        type: "image/png",
        sizes: "152x152",
        url: "/favicon/apple-icon-152x152.png",
      },
      {
        type: "image/png",
        sizes: "180x180",
        url: "/favicon/apple-icon-180x180.png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={mainFont.className}>
        <ConsoleBufferInit />
        <SentryUser />
        <DataTooltipRoot />
        {children}
      </body>
    </html>
  );
}
