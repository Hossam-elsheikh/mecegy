export const dynamic = 'force-dynamic';

import { getDictionary, hasLocale, locales } from "../../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Hospital, Home, Construction, MapPin, HardHat, Compass, Wrench, Zap, TreePine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

const fallbackImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";

const categoryIcons: Record<string, LucideIcon> = {
  educational: GraduationCap,
  medical: Hospital,
  residential: Home,
  infrastructure: Construction,
};

export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data: rows } = await supabase.from("projects").select("slug").eq("published", true);
  const slugs = rows?.map((r) => r.slug) ?? [];
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const supabase = createAdminClient();
  const { data: p } = await supabase
    .from("projects")
    .select("title_en, title_ar, description_en, description_ar")
    .eq("slug", slug)
    .single();
  if (!p) return {};
  return {
    title: `${lang === "ar" ? p.title_ar : p.title_en} | MEC`,
    description: lang === "ar" ? p.description_ar : p.description_en,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, supabase] = [await getDictionary(lang), createAdminClient()];

  const { data: p } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!p) notFound();

  const isAr = lang === "ar";
  const project = {
    title:           isAr ? p.title_ar           : p.title_en,
    description:     isAr ? p.description_ar      : p.description_en,
    fullDescription: isAr ? p.full_description_ar : p.full_description_en,
    features:       (isAr ? p.features_ar         : p.features_en) ?? [],
    mecRole:         isAr ? p.mec_role_ar          : p.mec_role_en,
    category:        p.category,
    location:        p.location,
    image:           p.image_url,
  };

  const heroImage = project.image || fallbackImage;
  const categoryLabel = dict.projects.categories[project.category as keyof typeof dict.projects.categories];

  return (
    <>
      {/* Image Block */}
      <section style={{ padding: "2rem 1.5rem 0", maxWidth: "1100px", margin: "0 auto" }}>
        <Link
          href={`/${lang}/projects`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "#6b7280",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 500,
            marginBottom: "1.5rem",
          }}
        >
          {isAr ? "→" : "←"} {dict.projects.backToProjects}
        </Link>

        {/* Title & meta above image */}
        <div style={{ marginBottom: "1.5rem" }}>
          {categoryLabel && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.9rem",
                background: "rgba(233,80,28,0.12)",
                color: "#E9501C",
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              {categoryLabel}
            </span>
          )}
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#163029",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h1>
          {project.description && (
            <p style={{ color: "#4b5563", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "760px" }}>
              {project.description}
            </p>
          )}
          {project.location && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "0.75rem",
                color: "#6b7280",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              <MapPin size={16} style={{ flexShrink: 0 }} /> {dict.projects.location}: {project.location}
            </div>
          )}
        </div>

        {/* Full-width image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/7",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Image
            src={heroImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Full Description */}
          <div className="scroll-animate project-detail-section">
            <div className="section-divider" style={{ margin: "0 0 1.5rem" }} />
            <h2 className="project-detail-section-title">{dict.projects.projectDetails}</h2>
            <p className="project-detail-text">{project.fullDescription}</p>
          </div>

          {/* Key Features */}
          {project.features.length > 0 && (
            <div className="scroll-animate project-detail-section">
              <div className="section-divider" style={{ margin: "0 0 1.5rem" }} />
              <h2 className="project-detail-section-title">{dict.projects.keyFeatures}</h2>
              <div className="project-features-grid">
                {project.features.map((feature: string, i: number) => (
                  <div className="project-feature-card" key={i}>
                    <div className="project-feature-number">{String(i + 1).padStart(2, "0")}</div>
                    <p className="project-feature-text">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MEC Engineering Role */}
          {project.mecRole && (
            <div className="scroll-animate project-detail-section">
              <div className="section-divider" style={{ margin: "0 0 1.5rem" }} />
              <h2 className="project-detail-section-title">{dict.projects.engineeringRole}</h2>
              <div className="project-mec-role-card">
                <div className="project-mec-role-icon"><HardHat size={36} style={{ color: "#F28B2D" }} /></div>
                <p className="project-mec-role-text">{project.mecRole}</p>
              </div>
            </div>
          )}

          {/* Technical Scope */}
          <div className="scroll-animate project-detail-section">
            <div className="section-divider" style={{ margin: "0 0 1.5rem" }} />
            <h2 className="project-detail-section-title">{dict.projects.technicalScope}</h2>
            <div className="project-technical-grid">
              {dict.projects.technicalScopeItems.map((item: string, i: number) => (
                <div className="project-technical-item" key={i}>
                  <div className="project-technical-icon">
                    {([Compass, Wrench, Zap, TreePine] as LucideIcon[]).map((Icon, idx) => idx === i ? <Icon size={20} style={{ color: "#E9501C" }} /> : null).filter(Boolean)[0] || <Wrench size={20} style={{ color: "#E9501C" }} />}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="scroll-animate" style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href={`/${lang}/projects`} className="btn-outline">
              {isAr ? "→" : "←"} {dict.projects.backToProjects}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
