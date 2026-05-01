import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.contact.title} | MEC`, description: dict.contact.subtitle };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "linear-gradient(135deg, #163029 0%, #1E4D3F 100%)", textAlign: "center" }}>
        <div style={{ padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1rem" }}>{dict.contact.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>{dict.contact.subtitle}</p>
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem" }}>
          {/* Contact Form */}
          <div className="scroll-animate">
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#163029", marginBottom: "0.5rem" }}>{dict.contact.sendMessage}</h2>
            <div style={{ width: "50px", height: "4px", background: "linear-gradient(90deg, #E9501C, #F28B2D)", borderRadius: "2px", marginBottom: "2rem" }} />
            <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <input type="text" className="form-input" placeholder={dict.contact.form.name} required />
              <input type="email" className="form-input" placeholder={dict.contact.form.email} required />
              <input type="text" className="form-input" placeholder={dict.contact.form.subject} />
              <textarea className="form-input form-textarea" placeholder={dict.contact.form.message} required />
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                {dict.contact.form.submit} →
              </button>
            </form>
          </div>

          {/* Contact Info & Branches */}
          <div className="scroll-animate">
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#163029", marginBottom: "0.5rem" }}>{dict.contact.branches}</h2>
            <div style={{ width: "50px", height: "4px", background: "linear-gradient(90deg, #E9501C, #F28B2D)", borderRadius: "2px", marginBottom: "2rem" }} />

            {/* Phone & Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", background: "#f9fafb", borderRadius: "12px", border: "1px solid #f3f4f6" }}>
                <Mail size={24} style={{ color: "#E9501C", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{dict.contact.email}</div>
                  <a href={`mailto:${dict.footer.emailAddress}`} style={{ color: "#163029", fontWeight: 600, textDecoration: "none" }}>{dict.footer.emailAddress}</a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", background: "#f9fafb", borderRadius: "12px", border: "1px solid #f3f4f6" }}>
                <Phone size={24} style={{ color: "#E9501C", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{dict.contact.phone}</div>
                  <a href={`tel:${dict.footer.phoneNumber}`} style={{ color: "#163029", fontWeight: 600, textDecoration: "none", direction: "ltr", display: "inline-block" }}>{dict.footer.phoneNumber}</a>
                </div>
              </div>
            </div>

            {/* Branch Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {dict.contact.locations.map((loc: any, i: number) => (
                <div key={i} style={{ padding: "1.25rem 1.5rem", background: "#ffffff", borderRadius: "16px", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "box-shadow 0.3s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <MapPin size={20} style={{ color: "#E9501C", flexShrink: 0 }} />
                    <h3 style={{ fontWeight: 700, color: "#163029", fontSize: "1rem" }}>{loc.city}</h3>
                    <span style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem", background: "rgba(233,80,28,0.1)", color: "#E9501C", borderRadius: "50px", fontWeight: 600 }}>{loc.label}</span>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6, paddingLeft: lang === "ar" ? "0" : "1.7rem", paddingRight: lang === "ar" ? "1.7rem" : "0" }}>{loc.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
