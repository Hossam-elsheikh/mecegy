import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { ProjectsClient } from "@/components/ProjectsClient";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.projects.title} | MEC`,
    description: dict.projects.subtitle,
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHero
        label={lang === "ar" ? "أعمالنا" : "Portfolio"}
        title={dict.projects.title}
        subtitle={dict.projects.subtitle}
      />

      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <ProjectsClient dict={dict} lang={lang} />
        </div>
      </section>
    </>
  );
}
