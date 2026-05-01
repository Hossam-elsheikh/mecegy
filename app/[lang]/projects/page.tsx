import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { ProjectsClient } from "@/components/ProjectsClient";
import type { Metadata } from "next";

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
      <section
        style={{
          paddingTop: "8rem",
          paddingBottom: "4rem",
          background: "linear-gradient(135deg, #163029 0%, #1E4D3F 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(242,139,45,0.08)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1rem" }}>
            {dict.projects.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            {dict.projects.subtitle}
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <ProjectsClient dict={dict} lang={lang} />
        </div>
      </section>
    </>
  );
}
