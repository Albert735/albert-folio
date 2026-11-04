import type { Metadata, Viewport } from "next";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Albert Quaye — Frontend & mobile engineer",
  description:
    "From Legon to your lock screen. Albert Quaye builds web and mobile products in Accra: Raute, Crestline Kits, ShiftMed and more.",
  openGraph: {
    title: "Albert Quaye — Frontend & mobile engineer",
    description: "From Legon to your lock screen.",
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@_Jaytee03" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
