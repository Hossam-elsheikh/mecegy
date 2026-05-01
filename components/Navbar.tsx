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
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0.875rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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

            {/* Language Switcher */}
            <div className="lang-switcher">
              <Link
                href={lang === "en" ? pathname : switchPath}
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                style={{ color: lang === "en" ? "#fff" : (showSolid ? "#1f2937" : "#fff") }}
              >
                EN
              </Link>
              <Link
                href={lang === "ar" ? pathname : switchPath}
                className={`lang-btn ${lang === "ar" ? "active" : ""}`}
                style={{ color: lang === "ar" ? "#fff" : (showSolid ? "#1f2937" : "#fff") }}
              >
                عربي
              </Link>
            </div>
          </div>

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
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {/* Replaced redundant X button with hamburger state management */}

        <Image
          src="/logo.svg"
          alt="MEC Logo"
          width={160}
          height={68}
          style={{ height: "52px", width: "auto", filter: "brightness(0) invert(1)", marginBottom: "1rem" }}
          unoptimized
        />

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

        <div className="lang-switcher" style={{ marginTop: "1rem" }}>
          <Link
            href={lang === "en" ? pathname : switchPath}
            className={`lang-btn ${lang === "en" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
            style={{ color: lang === "en" ? "#fff" : "#fff" }}
          >
            English
          </Link>
          <Link
            href={lang === "ar" ? pathname : switchPath}
            className={`lang-btn ${lang === "ar" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
            style={{ color: lang === "ar" ? "#fff" : "#fff" }}
          >
            العربية
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 1025px) {
          .hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
