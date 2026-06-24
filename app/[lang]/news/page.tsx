import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { createAdminClient } from "@/lib/supabase/admin";

// Inline LinkedIn Icon to bypass brand icon limits in lucide-react
const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    style={{ width: `${size}px`, height: `${size}px`, display: "inline-block" }}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.news.title} | MEC`, description: dict.news.subtitle };
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, supabase] = [await getDictionary(lang), createAdminClient()];

  const { data: rows } = await supabase
    .from("news")
    .select("slug, date, image_url, linkedin_url, title_en, title_ar, excerpt_en, excerpt_ar")
    .eq("published", true)
    .order("date", { ascending: false });

  const isAr = lang === "ar";
  const newsItems = (rows ?? []).map((n) => ({
    slug:     n.slug,
    date:     n.date,
    image:    n.image_url,
    linkedin: n.linkedin_url,
    title:    isAr ? n.title_ar   : n.title_en,
    excerpt:  isAr ? n.excerpt_ar : n.excerpt_en,
  }));

  return (
    <>
      <PageHero
        label={isAr ? "آخر الأخبار" : "Latest Updates"}
        title={dict.news.title}
        subtitle={dict.news.subtitle}
      />

      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
            {newsItems.map((article, i) => (
              <article key={i} className="news-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div className="news-card-image" style={{ position: "relative", height: "200px", width: "100%" }}>
                  <Image
                    src={article.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: "1rem", left: isAr ? "auto" : "1rem", right: isAr ? "1rem" : "auto", background: "rgba(233,80,28,0.9)", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "50px", fontSize: "0.75rem", fontWeight: 600 }}>{article.date}</div>
                </div>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#163029", marginBottom: "0.5rem", lineHeight: 1.4 }}>{article.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6, marginTop: "0.5rem", flexGrow: 1 }}>{article.excerpt}</p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem", borderTop: "1px solid #f3f4f6", paddingTop: "1rem" }}>
                    <Link href={`/${lang}/news/${article.slug}`} className="stretched-link" style={{ color: "#E9501C", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                      {dict.news.readMore} {isAr ? "←" : "→"}
                    </Link>
                    {article.linkedin && (
                      <a
                        href={article.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-card-btn"
                        style={{ position: "relative", zIndex: 2 }}
                      >
                        <LinkedinIcon size={12} />
                        {dict.news.interactLinkedin}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
