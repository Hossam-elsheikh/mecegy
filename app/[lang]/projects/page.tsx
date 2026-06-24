import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { ProjectsClient } from "@/components/ProjectsClient";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { createAdminClient } from "@/lib/supabase/admin";

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

  const [dict, supabase] = [await getDictionary(lang), createAdminClient()];

  const { data: rows } = await supabase
    .from("projects")
    .select("slug, category, image_url, title_en, title_ar, description_en, description_ar")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const projects = (rows ?? []).map((p) => ({
    slug: p.slug,
    category: p.category,
    image: p.image_url,
    title: lang === "ar" ? p.title_ar : p.title_en,
    description: lang === "ar" ? p.description_ar : p.description_en,
  }));

  return (
    <>
      <PageHero
        label={lang === "ar" ? "أعمالنا" : "Portfolio"}
        title={dict.projects.title}
        subtitle={dict.projects.subtitle}
      />

      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <ProjectsClient
            projects={projects}
            categories={dict.projects.categories}
            ui={{ viewProject: dict.projects.viewProject }}
            lang={lang}
          />
        </div>
      </section>
    </>
  );
}
