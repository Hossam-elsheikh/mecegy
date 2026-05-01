import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.news.title} | MEC`, description: dict.news.subtitle };
}

const newsImages = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
];

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  // TODO: Replace with actual external API fetch
  // Example: const response = await fetch('https://api.example.com/news?lang=' + lang);
  // const externalNews = await response.json();
  const newsItems = dict.news.items; 

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "linear-gradient(135deg, #163029 0%, #1E4D3F 100%)", textAlign: "center" }}>
        <div style={{ padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1rem" }}>{dict.news.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>{dict.news.subtitle}</p>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
            {newsItems.map((article: any, i: number) => (
              <Link key={i} href={`/${lang}/news/${article.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
                <article className="news-card">
                  <div className="news-card-image" style={{ position: "relative" }}>
                    <Image src={newsImages[i % newsImages.length]} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "1rem", left: lang === "ar" ? "auto" : "1rem", right: lang === "ar" ? "1rem" : "auto", background: "rgba(233,80,28,0.9)", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "50px", fontSize: "0.75rem", fontWeight: 600 }}>{article.date}</div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#163029", marginBottom: "0.5rem", lineHeight: 1.4 }}>{article.title}</h3>
                    <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6, marginTop: "0.5rem" }}>{article.excerpt}</p>
                    <span style={{ display: "inline-block", marginTop: "1rem", color: "#E9501C", fontWeight: 600, fontSize: "0.9rem" }}>{dict.news.readMore} {lang === "ar" ? "←" : "→"}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
