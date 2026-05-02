import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { IdeaBloomFAB } from "@/components/ideas/IdeaBloomFAB";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getMetadataBase } from "@/lib/site";

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const titleDefault = "Nova Muse";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: titleDefault,
    template: "%s · Nova Muse",
  },
  description:
    "Веб-приложение для заметок, просмотра тем и генерации идей.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Nova Muse",
    title: titleDefault,
    description:
      "Заметки, реакции, галерея тем и генерация идей в одном интерфейсе.",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description:
      "Продукт для работы с заметками и идеями.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={sans.variable}>
      <body className={`${sans.className} min-h-screen antialiased`}>
        <div className="flex min-h-screen flex-col md:pl-16">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <IdeaBloomFAB />
      </body>
    </html>
  );
}
