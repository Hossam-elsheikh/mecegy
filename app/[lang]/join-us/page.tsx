import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HardHat, Landmark, Zap, Settings, CircleCheck, FileUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const positionIcons: LucideIcon[] = [HardHat, Landmark, Zap, Settings];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.joinUs.title} | MEC`, description: dict.joinUs.subtitle };
}

export default async function JoinUsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "linear-gradient(135deg, #163029 0%, #1E4D3F 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(242,139,45,0.08)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1rem" }}>{dict.joinUs.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>{dict.joinUs.subtitle}</p>
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
          {/* Positions */}
          <div className="scroll-animate">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#163029", marginBottom: "0.5rem" }}>{dict.joinUs.positions}</h2>
            <div style={{ width: "50px", height: "4px", background: "linear-gradient(90deg, #E9501C, #F28B2D)", borderRadius: "2px", marginBottom: "2rem" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {dict.joinUs.positionsList.map((pos: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem", background: "#f9fafb", borderRadius: "16px", border: "1px solid #f3f4f6", transition: "all 0.3s ease" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, rgba(233,80,28,0.1), rgba(242,139,45,0.1))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                    {(() => { const Icon = positionIcons[i % 4]; return <Icon size={22} style={{ color: "#E9501C" }} />; })()}
                  </div>
                  <span style={{ fontWeight: 600, color: "#163029", fontSize: "1rem" }}>{pos}</span>
                </div>
              ))}
            </div>

            {/* Why Join Us */}
            <div style={{ marginTop: "2.5rem", padding: "2rem", background: "linear-gradient(135deg, #163029, #1E4D3F)", borderRadius: "20px", color: "#fff" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem", color: "#F28B2D" }}>
                {lang === "ar" ? "لماذا تنضم إلينا؟" : "Why Join MEC?"}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {(lang === "ar"
                  ? ["بيئة عمل مهنية ومحفزة", "فرص للتطور والنمو المهني", "مشاريع متنوعة وملهمة", "فريق من أفضل المهندسين"]
                  : ["Professional & inspiring work environment", "Growth & career development opportunities", "Diverse & challenging projects", "Team of top engineering talent"]
                ).map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)" }}>
                    <CircleCheck size={16} style={{ color: "#F28B2D", flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="scroll-animate">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#163029", marginBottom: "0.5rem" }}>
              {lang === "ar" ? "تقديم الطلب" : "Apply Now"}
            </h2>
            <div style={{ width: "50px", height: "4px", background: "linear-gradient(90deg, #E9501C, #F28B2D)", borderRadius: "2px", marginBottom: "2rem" }} />
            <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <input type="text" className="form-input" placeholder={dict.joinUs.form.name} required />
              <input type="email" className="form-input" placeholder={dict.joinUs.form.email} required />
              <input type="tel" className="form-input" placeholder={dict.joinUs.form.phone} style={{ direction: "ltr" }} />
              <select className="form-input" style={{ color: "#9ca3af" }} required>
                <option value="">{dict.joinUs.form.position}</option>
                {dict.joinUs.positionsList.map((pos: string, i: number) => (
                  <option key={i} value={pos}>{pos}</option>
                ))}
              </select>
              <textarea className="form-input form-textarea" placeholder={dict.joinUs.form.message} />
              <div style={{ padding: "2rem", border: "2px dashed #e5e7eb", borderRadius: "16px", textAlign: "center", cursor: "pointer", transition: "border-color 0.3s ease" }}>
                <FileUp size={32} style={{ color: "#9ca3af", display: "block", margin: "0 auto 0.5rem" }} />
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>{dict.joinUs.form.cv}</span>
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                {dict.joinUs.form.submit} →
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
