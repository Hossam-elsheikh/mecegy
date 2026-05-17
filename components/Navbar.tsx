"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavbarProps {
  dict: Record<string, any>;
  lang: string;
}

export function Navbar({ dict, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/news`, label: dict.nav.news },
    { href: `/${lang}/contact`, label: dict.nav.contact },
    { href: `/${lang}/join-us`, label: dict.nav.joinUs },
    { href: `/${lang}/team`, label: dict.nav.ourTeam },
  ];

  const otherLang = lang === "en" ? "ar" : "en";
  const switchPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  const showSolid = scrolled || !isHome;

  return (
    <>
      <nav className={`navbar ${menuOpen ? "navbar-menu-open" : (showSolid ? "navbar-solid" : "navbar-transparent")}`}>
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0.875rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          {/* Logo */}
          <Link href={`/${lang}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <Image
              src="/logo.svg"
              alt="MEC Logo"
              width={140}
              height={60}
              className="nav-logo"
              style={{
                filter: (showSolid && !menuOpen) ? "none" : "brightness(0) invert(1)",
                transition: "filter 0.3s ease",
              }}
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== `/${lang}` && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  style={{
                    color: isActive ? "#E9501C" : (showSolid ? "#1f2937" : "#ffffff"),
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Action Group (Lang switcher + Hamburger) */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", boxSizing: "border-box" }}>
            {/* Language Switcher - Shows only unselected language */}
            {!menuOpen && (
              <Link
                href={switchPath}
                className="lang-switch-btn"
                style={{
                  color: showSolid ? "#1f2937" : "#ffffff",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "8px",
                  borderColor: showSolid ? "rgba(31, 41, 55, 0.15)" : "rgba(255, 255, 255, 0.3)",
                  backgroundColor: showSolid ? "rgba(31, 41, 55, 0.03)" : "rgba(255, 255, 255, 0.08)",
                  transition: "all 0.3s ease",
                  display: "inline-block"
                }}
              >
                {lang === "en" ? "عربي" : "EN"}
              </Link>
            )}

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {/* Replaced redundant X button with hamburger state management */}

        {/* Removed logo from mobile menu per user request */}

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: "1.3rem" }}
          >
            {link.label}
          </Link>
        ))}

        <div className="mobile-lang-switcher" style={{ marginTop: "1rem" }}>
          <Link
            href={switchPath}
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "1.1rem",
              textDecoration: "none",
              padding: "0.5rem 1.5rem",
              borderRadius: "30px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
          >
            {lang === "en" ? "العربية" : "English"}
          </Link>
        </div>
      </div>
    </>
  );
}
