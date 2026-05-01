import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import Image from "next/image";
import Link from "next/link";
import { Landmark, ClipboardList, HardHat } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const projectImages = [
  "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
];

const newsImages = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* ============ HERO ============ */}
      <HeroCarousel slides={dict.hero.slides} lang={lang} />

      {/* ============ STATS ============ */}
      <section className="counter-section" style={{ padding: "4rem 1.5rem" }}>
        <div
          className="scroll-animate"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {[
            { count: dict.stats.yearsCount, label: dict.stats.years, suffix: "+" },
            { count: dict.stats.projectsCount, label: dict.stats.projects, suffix: "+" },
            { count: dict.stats.clientsCount, label: dict.stats.clients, suffix: "+" },
            { count: dict.stats.engineersCount, label: dict.stats.engineers, suffix: "+" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  color: "#F28B2D",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                <AnimatedCounter end={parseInt(stat.count, 10)} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section
        id="services"
        style={{
          padding: "6rem 1.5rem",
          background: "#f9fafb",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="scroll-animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-divider" />
            <h2 className="section-title">{dict.services.title}</h2>
            <p className="section-subtitle">{dict.services.subtitle}</p>
          </div>

          <div
            className="stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Architecture */}
            <div className="service-card">
              <div className="service-icon"><Landmark size={28} /></div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#163029", marginBottom: "0.75rem" }}>
                {dict.services.architecture.title}
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1rem" }}>
                {dict.services.architecture.description}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {dict.services.architecture.items.map((item: string, i: number) => (
                  <li key={i} style={{ fontSize: "0.9rem", color: "#4b5563", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#E9501C", fontSize: "0.7rem" }}>●</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Management */}
            <div className="service-card">
              <div className="service-icon"><ClipboardList size={28} /></div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#163029", marginBottom: "0.75rem" }}>
                {dict.services.projectManagement.title}
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1rem" }}>
                {dict.services.projectManagement.description}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {dict.services.projectManagement.items.map((item: string, i: number) => (
                  <li key={i} style={{ fontSize: "0.9rem", color: "#4b5563", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#E9501C", fontSize: "0.7rem" }}>●</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Construction Management */}
            <div className="service-card">
              <div className="service-icon"><HardHat size={28} /></div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#163029", marginBottom: "0.75rem" }}>
                {dict.services.constructionManagement.title}
              </h3>
              <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1rem" }}>
                {dict.services.constructionManagement.description}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {dict.services.constructionManagement.items.map((item: string, i: number) => (
                  <li key={i} style={{ fontSize: "0.9rem", color: "#4b5563", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#E9501C", fontSize: "0.7rem" }}>●</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="scroll-animate" style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href={`/${lang}/services`} className="btn-outline">
              {dict.services.learnMore} {lang === "ar" ? "←" : "→"}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="scroll-animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-divider" />
            <h2 className="section-title">{dict.projects.title}</h2>
            <p className="section-subtitle">{dict.projects.subtitle}</p>
          </div>

          <div
            className="stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {dict.projects.items.slice(0, 6).map((project: any, i: number) => (
              <Link
                key={i}
                href={`/${lang}/projects/${project.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="project-card" style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3" }}>
                  <Image
                    src={projectImages[i % projectImages.length]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="project-card-overlay" />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "1.5rem",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        background: "rgba(233, 80, 28, 0.9)",
                        color: "#fff",
                        borderRadius: "50px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {dict.projects.categories[project.category as keyof typeof dict.projects.categories]}
                    </span>
                    <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                      {project.title}
                    </h3>
                    <p className="card-description" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", lineHeight: 1.5, marginTop: "0.5rem" }}>
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="scroll-animate" style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href={`/${lang}/projects`} className="btn-outline">
              {dict.projects.viewAll} {lang === "ar" ? "←" : "→"}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section
        id="testimonials"
        style={{
          padding: "6rem 1.5rem",
          background: "#f9fafb",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="scroll-animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-divider" />
            <h2 className="section-title">{dict.testimonials.title}</h2>
            <p className="section-subtitle">{dict.testimonials.subtitle}</p>
          </div>

          <div
            className="stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {dict.testimonials.items.map((testimonial: any, i: number) => (
              <div key={i} className="testimonial-card">
                <div className="quote-mark">&ldquo;</div>
                <p
                  style={{
                    color: "#4b5563",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                    marginBottom: "1.5rem",
                    marginTop: "2rem",
                    fontStyle: "italic",
                  }}
                >
                  {testimonial.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #E9501C, #F28B2D)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#163029", fontSize: "0.95rem" }}>
                      {testimonial.name}
                    </div>
                    <div style={{ color: "#E9501C", fontSize: "0.85rem", fontWeight: 500 }}>
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWS PREVIEW ============ */}
      <section id="news" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="scroll-animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-divider" />
            <h2 className="section-title">{dict.news.title}</h2>
            <p className="section-subtitle">{dict.news.subtitle}</p>
          </div>

          <div
            className="stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {dict.news.items.map((article: any, i: number) => (
              <Link
                key={i}
                href={`/${lang}/news/${article.slug}`}
                style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
              >
                <article className="news-card">
                  <div className="news-card-image" style={{ position: "relative" }}>
                    <Image
                      src={newsImages[i % newsImages.length]}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: lang === "ar" ? "auto" : "1rem",
                        right: lang === "ar" ? "1rem" : "auto",
                        background: "rgba(233, 80, 28, 0.9)",
                        color: "#fff",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "50px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {article.date}
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#163029",
                        marginBottom: "0.5rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title}
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6, marginTop: "0.5rem" }}>
                      {article.excerpt}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "1rem",
                        color: "#E9501C",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {dict.news.readMore} {lang === "ar" ? "←" : "→"}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section
        className="scroll-animate"
        style={{
          padding: "6rem 1.5rem",
          background: "linear-gradient(135deg, #163029 0%, #1E4D3F 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(233, 80, 28, 0.1)",
          }}
        />
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            {lang === "ar"
              ? "هل لديك مشروع في بالك؟"
              : "Have a Project in Mind?"}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            {lang === "ar"
              ? "دعنا نساعدك في تحويل رؤيتك إلى واقع. تواصل مع فريقنا اليوم."
              : "Let us help you turn your vision into reality. Get in touch with our team today."}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${lang}/contact`} className="btn-primary">
              {dict.contact.getInTouch} →
            </Link>
            <Link href={`/${lang}/join-us`} className="btn-secondary">
              {dict.nav.joinUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
