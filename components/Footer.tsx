import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  dict: Record<string, any>;
  lang: string;
}

export function Footer({ dict, lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/news`, label: dict.nav.news },
    { href: `/${lang}/contact`, label: dict.nav.contact },
    { href: `/${lang}/join-us`, label: dict.nav.joinUs },
    { href: `/${lang}/team`, label: dict.nav.ourTeam },
  ];

  return (
    <footer className="footer">
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.5rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* About Column */}
          <div>
            <Image
              src="/logo.svg"
              alt="MEC Logo"
              width={160}
              height={68}
              style={{
                height: "52px",
                width: "auto",
                filter: "brightness(0) invert(1)",
                marginBottom: "1.25rem",
              }}
              unoptimized
            />
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.9rem",
                lineHeight: "1.7",
                maxWidth: "300px",
              }}
            >
              {dict.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1.25rem",
                color: "#F28B2D",
              }}
            >
              {dict.footer.quickLinks}
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.9rem" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1.25rem",
                color: "#F28B2D",
              }}
            >
              {dict.footer.contactInfo}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <Mail size={18} style={{ color: "#E9501C", flexShrink: 0 }} />
                <a href={`mailto:${dict.footer.emailAddress}`} style={{ fontSize: "0.9rem" }}>
                  {dict.footer.emailAddress}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <Phone size={18} style={{ color: "#E9501C", flexShrink: 0 }} />
                <a href={`tel:${dict.footer.phoneNumber}`} style={{ fontSize: "0.9rem", direction: "ltr" }}>
                  {dict.footer.phoneNumber}
                </a>
              </div>
              {dict.contact.locations.map((loc: any, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <MapPin size={18} style={{ color: "#E9501C", flexShrink: 0 }} />
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                    <strong style={{ color: "rgba(255,255,255,0.9)" }}>{loc.city}</strong>
                    <br />
                    {loc.address}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1.25rem",
                color: "#F28B2D",
              }}
            >
              {dict.footer.externalLinks}
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {dict.footer.external.map((link: any, i: number) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
            © {currentYear} Middle East Consultants (MEC). {dict.footer.rights}.
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {["facebook", "linkedin", "instagram", "twitter"].map((social) => (
              <a
                key={social}
                href="#"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  transition: "background 0.3s ease",
                }}
                aria-label={social}
              >
                {social === "facebook" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>}
                {social === "linkedin" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
                {social === "instagram" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>}
                {social === "twitter" && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
