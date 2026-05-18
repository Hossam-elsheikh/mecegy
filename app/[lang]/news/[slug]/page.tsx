import { getDictionary, hasLocale, locales } from "../../dictionaries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// Inline LinkedIn Icon to bypass brand icon limits in lucide-react
const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    style={{ width: `${size}px`, height: `${size}px`, display: "inline-block" }}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    const dict = await getDictionary(lang);
    for (const article of dict.news.items) {
      params.push({ lang, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const article = dict.news.items.find((a: any) => a.slug === slug);
  return { title: article ? `${article.title} | MEC` : "News | MEC", description: article?.excerpt || "" };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const article = dict.news.items.find((a: any) => a.slug === slug);
  if (!article) notFound();

  // Split content by newline to display separate paragraphs cleanly
  const paragraphs = article.content.split("\n\n");

  return (
    <>
      <section style={{ paddingTop: "6rem", background: "#ffffff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <Link href={`/${lang}/news`} style={{ color: "#E9501C", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            ← {lang === "ar" ? "العودة للأخبار" : "Back to News"}
          </Link>
          <span style={{ display: "block", color: "#E9501C", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.75rem" }}>{article.date}</span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#163029", lineHeight: 1.3, marginBottom: "1.5rem" }}>{article.title}</h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2rem" }}>{article.excerpt}</p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "20px", overflow: "hidden", marginBottom: "2.5rem", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
          <Image 
            src={article.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"} 
            alt={article.title} 
            fill 
            sizes="900px" 
            style={{ objectFit: "cover" }} 
            priority
          />
        </div>
      </div>

      <section style={{ paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ color: "#374151", fontSize: "1.05rem", lineHeight: 2 }}>
            {paragraphs.map((para: string, idx: number) => (
              <p key={idx} style={{ marginBottom: "1.5rem", whiteSpace: "pre-line" }}>{para}</p>
            ))}
          </div>

          {article.linkedin && (
            <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", borderTop: "1px solid #e5e7eb", paddingTop: "2.5rem" }}>
              <a
                href={article.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-btn"
              >
                <LinkedinIcon size={20} />
                {dict.news.interactLinkedin}
              </a>
            </div>
          )}

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
            <Link href={`/${lang}/news`} className="btn-outline">{lang === "ar" ? "العودة للأخبار" : "Back to News"} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
