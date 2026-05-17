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

const titleDefault = "Nova";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: titleDefault,
    template: "%s · Nova",
  },
  description:
    "Из хаоса мыслей — один следующий шаг. Для прокрастинации, СДВГ и креаторов: заметки, идеи, поддержка.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Nova",
    title: titleDefault,
    description:
      "Заметки без трения, идеи из твоего контекста и чат, когда нужно разобрать мысль.",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description:
      "Один понятный шаг вместо бесконечных списков. Nova для заметок, привычек и идей.",
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
