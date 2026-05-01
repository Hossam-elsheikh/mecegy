import { getDictionary, hasLocale, locales } from "../../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Hospital, Home, Construction, FolderOpen, MapPin, HardHat, Compass, Wrench, Zap, TreePine } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const projectImages: Record<string, string> = {
  "merit-university": "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=1200&q=80",
  "assiut-university": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  "lifer-medical-park": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
  "3i-pharma": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&q=80",
  "crown-key": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  "heraa-projects": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  "manqabad-bridge": "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&q=80",
};

const categoryIcons: Record<string, LucideIcon> = {
  educational: GraduationCap,
  medical: Hospital,
  residential: Home,
  infrastructure: Construction,
};

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    const dict = await getDictionary(lang);
    for (const project of dict.projects.items) {
      params.push({ lang, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const project = dict.projects.items.find((p: any) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | MEC`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const project = dict.projects.items.find((p: any) => p.slug === slug);
  if (!project) notFound();

  const heroImage = projectImages[slug] || projectImages["merit-university"];
  const categoryLabel =
    dict.projects.categories[project.category as keyof typeof dict.projects.categories];

  return (
    <>
      {/* Hero Banner */}
      <section className="project-detail-hero">
        <Image
          src={heroImage}
          alt={project.title}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="project-detail-hero-overlay" />
        <div className="project-detail-hero-content">
          <Link
            href={`/${lang}/projects`}
            className="project-back-link"
          >
            {lang === "ar" ? "→" : "←"} {dict.projects.backToProjects}
          </Link>
          
          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-subtitle">{project.description}</p>
          {project.location && (
            <div className="project-location-tag">
              <MapPin size={16} style={{ flexShrink: 0 }} /> {dict.projects.location}: {project.location}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          {/* Full Description */}
          <div className="scroll-animate project-detail-section">
            <div className="section-divider" style={{ margin: "0 0 1.5rem" }} />
            <h2 className="project-detail-section-title">{dict.projects.projectDetails}</h2>
            <p className="project-detail-text">{project.fullDescription}</p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
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
              {lang === "ar" ? "→" : "←"} {dict.projects.backToProjects}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
