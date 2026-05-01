import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollAnimationProvider } from "@/components/ScrollAnimation";
import { BackToTop } from "@/components/BackToTop";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "ar" ? "ar_EG" : "en_US",
      type: "website",
      siteName: "Middle East Consultants",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const isRTL = lang === "ar";
  const fontClass = isRTL ? cairo.variable : inter.variable;

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${fontClass} min-h-screen flex flex-col antialiased`}
        style={{ fontFamily: isRTL ? "var(--font-cairo), system-ui, sans-serif" : "var(--font-inter), system-ui, sans-serif" }}
      >
        <ScrollAnimationProvider>
          <Navbar dict={dict} lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer dict={dict} lang={lang} />
          <BackToTop />
        </ScrollAnimationProvider>
      </body>
    </html>
  );
}
