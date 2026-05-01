import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import TeamCarousel from "../../../components/TeamCarousel";
import { Palette, HardHat, BarChart3, Briefcase, FolderOpen } from "lucide-react";

const deptIconMap: Record<string, any> = { design: Palette, supervision: HardHat, management: BarChart3, admin: Briefcase };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.team.title} | MEC`, description: dict.team.subtitle };
}



export default async function TeamPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero Banner */}
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "linear-gradient(135deg, #163029 0%, #1E4D3F 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(233,80,28,0.08)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1rem" }}>{dict.team.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>{dict.team.subtitle}</p>
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Board of Directors Title */}
          <div className="scroll-animate" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-divider" />
            <h2 className="section-title">{dict.team.boardTitle}</h2>
            <p className="section-subtitle">{dict.team.boardDescription}</p>
          </div>

          {/* Distinguished Leaders */}
          <div className="stagger-children team-leaders-grid">
            {dict.team.leaders.map((leader: any, i: number) => (
              <div className="leader-card" key={i}>
                <div className="leader-image-wrapper">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={160}
                    height={160}
                    style={{ objectFit: "cover" }}
                    priority={i === 0}
                  />
                </div>
                <div className="leader-info">
                  <h3 className="leader-name">{leader.name}</h3>
                  <span className="leader-role">{leader.role}</span>
                  <ul className="leader-credentials">
                    {leader.description.map((item: string, j: number) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Other Team Members Carousel */}
          <div className="scroll-animate" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-divider" />
            <h2 className="section-title">{dict.team.otherMembersTitle}</h2>
          </div>

          <TeamCarousel members={dict.team.otherMembers} lang={lang} />

          {/* Departments */}
          <div className="scroll-animate" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-divider" />
            <h2 className="section-title">{dict.team.departmentsTitle}</h2>
          </div>

          <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }}>
            {dict.team.departments.map((dept: any, i: number) => (
              <div key={i} style={{ padding: "2rem", background: "#ffffff", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)", textAlign: "center", transition: "transform 0.3s ease" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(233,80,28,0.1), rgba(242,139,45,0.1))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 1rem" }}>
                  {(() => { const Icon = deptIconMap[dept.icon] || FolderOpen; return <Icon size={28} style={{ color: "#E9501C" }} />; })()}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#163029" }}>{dept.name}</h3>
              </div>
            ))}
          </div>

          {/* Vision */}
          <div className="scroll-animate" style={{ background: "linear-gradient(135deg, #163029, #1E4D3F)", borderRadius: "24px", padding: "3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(233,80,28,0.1)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#F28B2D", marginBottom: "1rem" }}>{dict.team.vision}</h2>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.2rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>{dict.team.visionText}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
