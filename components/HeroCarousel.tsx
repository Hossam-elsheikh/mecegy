"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Slide {
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  lang: string;
}

const heroImages = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
];

export function HeroCarousel({ slides, lang }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isRTL = lang === "ar";

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 1200);
    },
    [isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, slides.length, goToSlide]);

  return (
    <section className="hero-v2" id="hero">
      {/* Background layers */}
      {slides.map((_, index) => (
        <div
          key={index}
          className={`hero-v2-bg ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${heroImages[index % heroImages.length]})` }}
        />
      ))}
      <div className="hero-v2-overlay" />

      {/* Decorative elements */}
      <div className="hero-v2-grid-lines" />
      <div className="hero-v2-accent-line" />
      <div className="hero-v2-floating-badge">
        <span className="hero-v2-badge-num">24</span>
        <span className="hero-v2-badge-label">{lang === "ar" ? "سنة خبرة" : "Years of\nExcellence"}</span>
      </div>

      {/* Content — left aligned, massive type */}
      <div className="hero-v2-content">
        <div style={{ position: "relative" }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="hero-v2-text-wrap"
              style={{
                opacity: index === current ? 1 : 0,
                transform: index === current ? "none" : "translateY(40px)",
                pointerEvents: index === current ? "auto" : "none",
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                position: index === 0 ? "relative" : "absolute",
                bottom: index === 0 ? undefined : 0,
                left: index === 0 ? undefined : 0,
                right: index === 0 ? undefined : 0,
              }}
            >
              <p className="hero-v2-subtitle">{slide.subtitle}</p>
              <h1 className="hero-v2-title">{slide.title}</h1>
              <div className="hero-v2-cta">
                <Link href={`/${lang}/services`} className="btn-primary">
                  {lang === "ar" ? "خدماتنا" : "Explore Services"} →
                </Link>
                <Link href={`/${lang}/contact`} className="btn-ghost">
                  {lang === "ar" ? "تواصل معنا" : "Get in Touch"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical slide indicator */}
      <div className="hero-v2-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-v2-ind ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
        <span className="hero-v2-counter">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
