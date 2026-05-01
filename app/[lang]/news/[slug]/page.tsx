import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const newsImages = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
];

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
  const articleIndex = dict.news.items.findIndex((a: any) => a.slug === slug);
  const article = dict.news.items[articleIndex];
  if (!article) notFound();

  const dummyContent = lang === "ar"
    ? "هذا المحتوى هو نص تجريبي سيتم استبداله بالمحتوى الفعلي من واجهة برمجة التطبيقات الخارجية. يمثل هذا النص مكان المقال الكامل الذي سيتم تحميله ديناميكياً من مصدر البيانات الخارجي. سيتضمن المقال الفعلي تفاصيل شاملة حول الحدث أو الخبر مع صور إضافية ومعلومات مفصلة."
    : "This is placeholder content that will be replaced with actual content from the external API. This text represents where the full article body will be dynamically loaded from the external data source. The actual article will include comprehensive details about the event or news with additional images and detailed information.";

  return (
    <>
      <section style={{ paddingTop: "6rem", background: "#ffffff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <Link href={`/${lang}/news`} style={{ color: "#E9501C", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            ← {dict.common.backToHome}
          </Link>
          <span style={{ display: "block", color: "#E9501C", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.75rem" }}>{article.date}</span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#163029", lineHeight: 1.3, marginBottom: "1.5rem" }}>{article.title}</h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2rem" }}>{article.excerpt}</p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "20px", overflow: "hidden", marginBottom: "2.5rem" }}>
          <Image src={newsImages[articleIndex % newsImages.length]} alt={article.title} fill sizes="900px" style={{ objectFit: "cover" }} />
        </div>
      </div>

      <section style={{ paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ color: "#374151", fontSize: "1.05rem", lineHeight: 2 }}>
            <p style={{ marginBottom: "1.5rem" }}>{dummyContent}</p>
            <p style={{ marginBottom: "1.5rem" }}>{dummyContent}</p>
            <p>{dummyContent}</p>
          </div>
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
            <Link href={`/${lang}/news`} className="btn-outline">{lang === "ar" ? "العودة للأخبار" : "Back to News"} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
