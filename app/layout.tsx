import type { Metadata, Viewport } from "next";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Providers from "@/components/Providers";

const description =
  "Albert Quaye builds web and mobile products in Accra: Raute, Crestline Kits, ShiftMed and more. Plus writing on Black history and freedom.";

export const metadata: Metadata = {
  title: {
    default: "Albert Quaye — Frontend & mobile engineer",
    template: "%s — Albert Quaye",
  },
  description,
  openGraph: {
    title: "Albert Quaye — Frontend & mobile engineer",
    description,
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@_Jaytee03" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
