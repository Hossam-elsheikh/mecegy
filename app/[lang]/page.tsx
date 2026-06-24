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

      {/* ═══════ SERVICES — Asymmetric Mosaic ═══════ */}
      <section
        id="services"
        style={{
          padding: "6rem 1.5rem",
          background: "#ffffff",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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

      {/* ═══════ PROJECTS — Horizontal Scroll ═══════ */}
      <section
        id="projects"
        style={{
          padding: "8rem 0",
          background: "#0e1f1a",
          position: "relative",
          overflow: "hidden",
        }}
      >
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

        <div className="projects-staggered" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          {featuredProjects.map((project, i) => (
            <Link
              key={i}
              href={`/${lang}/projects/${project.slug}`}
              className="project-card"
            >
              <Image
                src={project.image || fallbackImage}
                alt={project.title || ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="project-card-overlay" />
              <div className="project-card-content">
                <span className="project-card-cat">
                  {dict.projects.categories[project.category as keyof typeof dict.projects.categories]}
                </span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════ TESTIMONIALS — Spotlight ═══════ */}
      <TestimonialSpotlight testimonials={dict.testimonials} lang={lang} />

      {/* ═══════ NEWS — Editorial Rows ═══════ */}
      <section id="news" style={{ padding: "8rem 1.5rem", position: "relative" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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

          <div className="scroll-animate news-editorial">
            {latestNews.map((article, i) => (
              <Link
                key={i}
                href={`/${lang}/news/${article.slug}`}
                className="news-row"
              >
                <span className="news-row-date">{article.date}</span>
                <div className="news-row-img-wrap">
                  <Image
                    src={article.image || fallbackImage}
                    alt={article.title || ""}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 className="news-row-title">{article.title}</h3>
                  <p className="news-row-excerpt">{article.excerpt}</p>
                </div>
                <span className="news-row-arrow">{isRTL ? "←" : "→"}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA — Diagonal ═══════ */}
      <section className="cta-diagonal">
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
