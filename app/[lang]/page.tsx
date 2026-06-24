export const dynamic = 'force-dynamic';

import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import Image from "next/image";
import Link from "next/link";
import { Landmark, ClipboardList, HardHat } from "lucide-react";
import MarqueeStrip from "@/components/MarqueeStrip";
import TestimonialSpotlight from "@/components/TestimonialSpotlight";
import { createAdminClient } from "@/lib/supabase/admin";

const fallbackImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const supabase = createAdminClient();
  const [dict, { data: projectRows }, { data: newsRows }] = await Promise.all([
    getDictionary(lang),
    supabase.from("projects").select("slug, category, image_url, title_en, title_ar, description_en, description_ar").eq("published", true).order("created_at", { ascending: false }).limit(4),
    supabase.from("news").select("slug, date, image_url, title_en, title_ar, excerpt_en, excerpt_ar").eq("published", true).order("date", { ascending: false }).limit(4),
  ]);

  const isRTL = lang === "ar";
  const isAr = isRTL;

  const featuredProjects = (projectRows ?? []).map((p) => ({
    slug: p.slug, category: p.category, image: p.image_url,
    title: isAr ? p.title_ar : p.title_en,
    description: isAr ? p.description_ar : p.description_en,
  }));

  const latestNews = (newsRows ?? []).map((n) => ({
    slug: n.slug, date: n.date, image: n.image_url,
    title: isAr ? n.title_ar : n.title_en,
    excerpt: isAr ? n.excerpt_ar : n.excerpt_en,
  }));

  const services = [
    { ...dict.services.architecture, Icon: Landmark, num: "01", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80" },
    { ...dict.services.projectManagement, Icon: ClipboardList, num: "02", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
    { ...dict.services.constructionManagement, Icon: HardHat, num: "03", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" },
  ];

  const processSteps = [
    {
      num: "01",
      en: "Consultation",
      ar: "الاستشارة",
      descEn: "Deep discovery sessions to understand your vision, site constraints, and project goals.",
      descAr: "جلسات استكشافية معمّقة لفهم رؤيتك وقيود الموقع وأهداف المشروع.",
    },
    {
      num: "02",
      en: "Design & Planning",
      ar: "التصميم والتخطيط",
      descEn: "Detailed architectural and structural designs with full feasibility analysis.",
      descAr: "تصاميم معمارية وإنشائية مفصّلة مع تحليل جدوى شامل.",
    },
    {
      num: "03",
      en: "Engineering & Build",
      ar: "الهندسة والتنفيذ",
      descEn: "Precise on-site execution with rigorous quality control and contractor coordination.",
      descAr: "تنفيذ دقيق في الموقع مع ضبط جودة صارم وتنسيق مع المقاولين.",
    },
    {
      num: "04",
      en: "Handover",
      ar: "التسليم",
      descEn: "Final inspections and a seamless handover that exceeds your expectations.",
      descAr: "فحص نهائي دقيق وتسليم سلس يتجاوز توقعاتك.",
    },
  ];

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <HeroCarousel slides={dict.hero.slides} lang={lang} />

      {/* ═══════ MARQUEE STATS ═══════ */}
      <MarqueeStrip
        stats={[
          { count: dict.stats.yearsCount, label: dict.stats.years, suffix: "+" },
          { count: dict.stats.projectsCount, label: dict.stats.projects, suffix: "+" },
          { count: dict.stats.clientsCount, label: dict.stats.clients, suffix: "+" },
          { count: dict.stats.engineersCount, label: dict.stats.engineers, suffix: "+" },
        ]}
      />

      {/* ═══════ ABOUT / WHY MEC ═══════ */}
      <section className="about-split">
        <div className="about-split-inner">
          {/* Left — copy */}
          <div className="scroll-animate-left">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <span className="section-label">{isAr ? "من نحن" : "About MEC"}</span>
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, rgba(233,80,28,0.4), transparent)" }} />
            </div>
            <h2 className="about-heading">
              {isAr ? (
                <><span>هندسة استثنائية</span><br />منذ عام ٢٠٠٨</>
              ) : (
                <>Engineering <span>Excellence</span><br />Since 2008</>
              )}
            </h2>
            <p className="about-body">
              {isAr
                ? "نحن مجموعة المشاورين للشرق الأوسط، شركة هندسية متكاملة الخدمات تتخصص في الهندسة المعمارية وإدارة المشاريع والإشراف على البناء. نحوّل رؤى عملائنا إلى واقع ملموس بأعلى معايير الجودة والاحترافية."
                : "Middle East Consultants is a full-service engineering firm specializing in architecture, project management, and construction supervision. We transform client visions into tangible realities with the highest standards of quality and professionalism."}
            </p>
            <div className="about-stats-row stagger-children">
              {[
                { num: `${dict.stats.yearsCount}+`, label: dict.stats.years },
                { num: `${dict.stats.projectsCount}+`, label: dict.stats.projects },
                { num: `${dict.stats.clientsCount}+`, label: dict.stats.clients },
                { num: `${dict.stats.engineersCount}+`, label: dict.stats.engineers },
              ].map((s, i) => (
                <div className="about-stat-pill" key={i}>
                  <span className="about-stat-num">{s.num}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="about-img-frame scroll-animate-right">
            <div className="about-img-accent" />
            <div className="about-img-wrap">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt={isAr ? "فريق المهندسين" : "Engineering team at work"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="about-img-badge">
              <span className="about-img-badge-num">{dict.stats.yearsCount}+</span>
              <span className="about-img-badge-label">{isAr ? "سنة\nخبرة" : "Years\nof Trust"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES — Asymmetric Mosaic ═══════ */}
      <section
        id="services"
        style={{
          padding: "7rem 1.5rem",
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span className="section-watermark">{isAr ? "خدماتنا" : "SERVICES"}</span>
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            className="scroll-animate"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <span className="section-label">
                {isRTL ? "ما نقدمه" : "What We Do"}
              </span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  color: "#163029",
                  lineHeight: 1.1,
                  marginTop: "0.5rem",
                }}
              >
                {dict.services.title}
              </h2>
            </div>
            <Link
              href={`/${lang}/services`}
              className="btn-outline"
              style={{ borderRadius: 0, marginBottom: "0.25rem" }}
            >
              {dict.services.learnMore} {isRTL ? "←" : "→"}
            </Link>
          </div>

          <div className="stagger-children mosaic-grid">
            {services.map((svc, i) => {
              const Icon = svc.Icon;
              return (
                <Link
                  key={i}
                  href={`/${lang}/services`}
                  className={`mosaic-card mosaic-card-${i + 1}`}
                  style={{ backgroundImage: `url(${svc.image})` }}
                >
                  <div className="mosaic-card-overlay" />
                  <div className="mosaic-card-content">
                    <span className="mosaic-card-num">{svc.num}</span>
                    <div className="mosaic-card-icon">
                      <Icon size={22} />
                    </div>
                    <h3 className="mosaic-card-title">{svc.title}</h3>
                    <p className="mosaic-card-desc">{svc.description}</p>
                    <ul className="mosaic-card-tags">
                      {svc.items.map((item: string, j: number) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS — How We Work ═══════ */}
      <section className="process-section">
        <div className="process-inner">
          <div className="process-header scroll-animate">
            <span className="section-label">{isAr ? "كيف نعمل" : "Our Approach"}</span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#163029",
                lineHeight: 1.1,
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              {isAr ? "من الفكرة إلى التسليم" : "From Concept to Completion"}
            </h2>
          </div>
          <div className="process-steps stagger-children">
            {processSteps.map((step, i) => (
              <div className="process-step" key={i}>
                <div className="process-num-wrap">{step.num}</div>
                <h3 className="process-step-title">{isAr ? step.ar : step.en}</h3>
                <p className="process-step-desc">{isAr ? step.descAr : step.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROJECTS — Magazine Layout ═══════ */}
      <section
        id="projects"
        style={{
          padding: "8rem 0 6rem",
          background: "#0e1f1a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Section header */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            marginBottom: "3rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div className="scroll-animate">
            <span className="section-label" style={{ color: "#F28B2D" }}>
              {isRTL ? "أعمالنا" : "Portfolio"}
            </span>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                marginTop: "0.5rem",
              }}
            >
              {dict.projects.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/projects`}
            className="btn-ghost"
            style={{ marginBottom: "0.25rem" }}
          >
            {dict.projects.viewAll} {isRTL ? "←" : "→"}
          </Link>
        </div>

        {/* Magazine grid */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="projects-magazine">
            {/* Large featured card */}
            {featuredProjects[0] && (
              <Link
                href={`/${lang}/projects/${featuredProjects[0].slug}`}
                className="projects-mag-main"
              >
                <Image
                  src={featuredProjects[0].image || fallbackImage}
                  alt={featuredProjects[0].title || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="project-card-overlay" />
                <div className="projects-mag-content">
                  <span className="project-card-cat">
                    {dict.projects.categories[featuredProjects[0].category as keyof typeof dict.projects.categories]}
                  </span>
                  <h3 className="projects-mag-title">{featuredProjects[0].title}</h3>
                  <p className="projects-mag-desc">{featuredProjects[0].description}</p>
                </div>
              </Link>
            )}
            {/* Two stacked side cards */}
            <div className="projects-mag-side">
              {featuredProjects.slice(1, 3).map((project, i) => (
                <Link
                  key={i}
                  href={`/${lang}/projects/${project.slug}`}
                  className="projects-mag-small"
                >
                  <Image
                    src={project.image || fallbackImage}
                    alt={project.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="project-card-overlay" />
                  <div className="projects-mag-content">
                    <span className="project-card-cat">
                      {dict.projects.categories[project.category as keyof typeof dict.projects.categories]}
                    </span>
                    <h3 className="projects-mag-side-title">{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Banner card (4th project) */}
          {featuredProjects[3] && (
            <Link
              href={`/${lang}/projects/${featuredProjects[3].slug}`}
              className="projects-mag-banner"
            >
              <Image
                src={featuredProjects[3].image || fallbackImage}
                alt={featuredProjects[3].title || ""}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
              <div className="project-card-overlay" />
              <div className="projects-mag-content projects-mag-content-row">
                <div>
                  <span className="project-card-cat">
                    {dict.projects.categories[featuredProjects[3].category as keyof typeof dict.projects.categories]}
                  </span>
                  <h3 className="projects-mag-side-title" style={{ marginTop: "0.4rem" }}>{featuredProjects[3].title}</h3>
                </div>
                <p className="projects-mag-banner-desc">{featuredProjects[3].description}</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ═══════ TESTIMONIALS — Spotlight ═══════ */}
      <TestimonialSpotlight testimonials={dict.testimonials} lang={lang} />

      {/* ═══════ NEWS — Card Grid ═══════ */}
      <section id="news" style={{ padding: "8rem 1.5rem", background: "#fff", position: "relative" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            className="scroll-animate"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "3.5rem",
            }}
          >
            <div>
              <span className="section-label">
                {isRTL ? "آخر الأخبار" : "Latest Updates"}
              </span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  color: "#163029",
                  lineHeight: 1.1,
                  marginTop: "0.5rem",
                }}
              >
                {dict.news.title}
              </h2>
            </div>
            <Link
              href={`/${lang}/news`}
              className="btn-outline"
              style={{ borderRadius: 0, marginBottom: "0.25rem" }}
            >
              {isRTL ? "كل الأخبار" : "All News"} {isRTL ? "←" : "→"}
            </Link>
          </div>

          <div className="news-cards-grid stagger-children">
            {latestNews.map((article, i) => (
              <Link
                key={i}
                href={`/${lang}/news/${article.slug}`}
                className="news-img-card"
              >
                <div className="news-img-card-img">
                  <Image
                    src={article.image || fallbackImage}
                    alt={article.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="news-img-card-body">
                  <span className="news-img-card-date">{article.date}</span>
                  <h3 className="news-img-card-title">{article.title}</h3>
                  <p className="news-img-card-excerpt">{article.excerpt}</p>
                  <span className="news-img-card-arrow">
                    {isRTL ? "← اقرأ المزيد" : "Read more →"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA — Diagonal ═══════ */}
      <section className="cta-diagonal">
        <div className="cta-dot-pattern" />
        <div className="cta-diagonal-inner scroll-animate">
          <span
            className="section-label"
            style={{ color: "#F28B2D" }}
          >
            {isRTL ? "ابدأ مشروعك" : "Start Your Project"}
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginTop: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {isRTL ? "هل لديك مشروع في بالك؟" : "Have a Project in Mind?"}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "550px",
              margin: "0 auto 2.5rem",
            }}
          >
            {isRTL
              ? "دعنا نساعدك في تحويل رؤيتك إلى واقع. تواصل مع فريقنا اليوم."
              : "Let us help you turn your vision into reality. Get in touch with our team today."}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={`/${lang}/contact`}
              className="btn-primary"
              style={{ borderRadius: 0 }}
            >
              {dict.contact.getInTouch} →
            </Link>
            <Link href={`/${lang}/join-us`} className="btn-ghost">
              {dict.nav.joinUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
