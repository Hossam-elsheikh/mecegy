import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Landmark, ClipboardList, HardHat, CircleCheck } from "lucide-react";

const serviceIcons = [Landmark, ClipboardList, HardHat];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.services.title} | MEC`,
    description: dict.services.subtitle,
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const services = [
    {
      ...dict.services.architecture,
      iconIndex: 0,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    },
    {
      ...dict.services.projectManagement,
      iconIndex: 1,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    },
    {
      ...dict.services.constructionManagement,
      iconIndex: 2,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    },
  ];

  return (
    <>
      {/* Page Header */}
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
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(233, 80, 28, 0.08)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1rem" }}>
            {dict.services.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            {dict.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {services.map((service, i) => (
            <div
              key={i}
              className="scroll-animate"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "3rem",
                alignItems: "center",
                marginBottom: i < services.length - 1 ? "5rem" : "0",
                direction: i % 2 === 1 && lang !== "ar" ? "rtl" : i % 2 === 0 && lang === "ar" ? "rtl" : "ltr",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
                  direction: "ltr",
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(22,48,41,0.4), transparent)",
                  }}
                />
              </div>

              <div style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, rgba(233,80,28,0.1), rgba(242,139,45,0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  color: "#E9501C",
                  }}
                >
                  {(() => { const Icon = serviceIcons[service.iconIndex]; return <Icon size={28} />; })()}
                </div>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#163029", marginBottom: "1rem" }}>
                  {service.title}
                </h2>
                <p style={{ color: "#6b7280", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "1rem" }}>
                  {service.description}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {service.items.map((item: string, j: number) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        fontSize: "0.95rem",
                        color: "#374151",
                        padding: "0.75rem 1rem",
                        background: "#f9fafb",
                        borderRadius: "12px",
                        border: "1px solid #f3f4f6",
                      }}
                    >
                      <CircleCheck size={18} style={{ color: "#E9501C", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
